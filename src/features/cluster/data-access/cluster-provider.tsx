import { clusterApiUrl, Connection } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toastError } from '@ui'
import { nanoid } from 'nanoid'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { WxtStorageItem } from 'wxt/storage'
import { getClusterUrlParam, getConnection, getNetwork, isValidConnection } from './cluster-helpers'
import { AppCluster, AppClusterNetwork, ClusterFormInput } from './cluster-types'

export const defaultClusters: AppCluster[] = [
  {
    id: 'devnet',
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    network: AppClusterNetwork.Devnet,
  },
  {
    id: 'local',
    name: 'local',
    endpoint: 'http://localhost:8899',
    network: AppClusterNetwork.Custom,
  },
  {
    id: 'mainnet',
    name: 'mainnet',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: AppClusterNetwork.Mainnet,
  },
  {
    id: 'testnet',
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    network: AppClusterNetwork.Testnet,
  },
]

export interface ClusterProviderContext {
  connection: Connection
  clusters: AppCluster[]
  cluster: AppCluster | undefined
  loading: boolean
  addCluster: (cluster: ClusterFormInput) => Promise<void>
  deleteCluster: (cluster: AppCluster) => Promise<void>
  updateCluster: (cluster: AppCluster) => Promise<void>
  selectCluster: (cluster: AppCluster) => Promise<void>
  reset: () => void
  getExplorerUrl(path: string): string
}

const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)

export function ClusterProvider({ children }: { children: ReactNode }) {
  const storageKey = 'sync:clusters'
  const items: WxtStorageItem<AppCluster[], {}> = storage.defineItem<AppCluster[]>(storageKey, {
    defaultValue: defaultClusters,
    version: 1,
  })

  const queryClusters = useQuery({ queryKey: [storageKey], queryFn: () => items.getValue() })

  const mutationClusterAdd = useMutation({
    mutationFn: async (cluster: AppCluster) => items.setValue([...(await items.getValue()), cluster]),
  })

  const mutationClusterUpdate = useMutation({
    mutationFn: async (input: ClusterFormInput) => {
      const clusters = await items.getValue()
      const found = clusters.find((item) => item.id === input.id)
      if (!found) throw new Error(`Cluster with id ${input.id} not found`)

      return items.setValue([...clusters.filter((item) => item.id !== input.id), { ...found, ...input }])
    },
  })
  const mutationClusterDelete = useMutation({
    mutationFn: async (cluster: AppCluster) => {
      const clusters = await items.getValue()
      const found = clusters.find((item) => item.id === cluster.id)
      if (!found) throw new Error(`Cluster with id ${cluster.id} not found`)

      return items.setValue(clusters.filter((item) => item.id !== cluster.id))
    },
  })
  const mutationClusterSelect = useMutation({
    mutationFn: async (cluster: AppCluster) => {
      const clusters = await items.getValue()
      const found = clusters.find((item) => item.id === cluster.id)
      if (!found) throw new Error(`Cluster with id ${cluster.id} not found`)

      await items.setValue(
        clusters.map((item) => (item.id === cluster.id ? { ...item, active: true } : { ...item, active: false })),
      )
    },
  })

  const clusters = useMemo(() => queryClusters.data ?? [], [queryClusters.data])
  const cluster = useMemo(() => clusters.find((item) => item.active) ?? clusters[0], [clusters])
  const connection = useMemo(() => getConnection(cluster), [cluster])
  const value: ClusterProviderContext = {
    connection,
    cluster,
    clusters,
    loading: queryClusters.isLoading,
    addCluster: async (cluster: ClusterFormInput) => {
      const connection = isValidConnection(cluster.endpoint)
      if (!connection) {
        toastError('Invalid endpoint')
        return
      }

      const network = await getNetwork(connection)
      const id = nanoid()
      const active = !clusters.find((item) => item.active)
      const endpoint = connection.rpcEndpoint
      const providedName = cluster.name.length ? cluster.name : network
      const existing = clusters.find((item) => item.name === providedName)
      const name = existing ? `${providedName} {${id}}` : providedName

      return mutationClusterAdd.mutateAsync({ endpoint, name, network, id, active }).then(async () => {
        await queryClusters.refetch()
      })
    },
    updateCluster: async (input: ClusterFormInput) => {
      return mutationClusterUpdate.mutateAsync(input).then(async () => {
        await queryClusters.refetch()
      })
    },
    deleteCluster: async (cluster: AppCluster) =>
      mutationClusterDelete.mutateAsync(cluster).then(async () => {
        await queryClusters.refetch()
      }),
    selectCluster: async (cluster: AppCluster) =>
      mutationClusterSelect.mutateAsync(cluster).then(async () => {
        await queryClusters.refetch()
      }),
    reset: async () => {
      // Delete all clusters
      await items.removeValue()
      // Reset all clusters
      await items.setValue(defaultClusters)
      // Select first cluster
      await mutationClusterSelect.mutateAsync(defaultClusters[0])
      // Refetch clusters
      await queryClusters.refetch()
    },
    getExplorerUrl: (path: string) => `https://solana.fm/${path}${getClusterUrlParam(cluster)}`,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCluster() {
  return useContext(Context)
}
