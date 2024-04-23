import { clusterApiUrl } from '@solana/web3.js'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { createContext, ReactNode, useContext } from 'react'

export interface AppCluster {
  name: string
  endpoint: string
  network?: AppClusterNetwork
  active?: boolean
}

export enum AppClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}

export const defaultClusters: AppCluster[] = [
  { name: 'local', endpoint: 'http://localhost:8899' },
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    network: AppClusterNetwork.Devnet,
  },
  {
    name: 'mainnet',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: AppClusterNetwork.Mainnet,
  },
  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    network: AppClusterNetwork.Testnet,
  },
]

const clusterAtom = atomWithStorage<AppCluster>('solana-cluster', defaultClusters[0], undefined, { getOnInit: true })
const clustersAtom = atomWithStorage<AppCluster[]>('solana-clusters', defaultClusters, undefined, { getOnInit: true })

const activeClustersAtom = atom<AppCluster[]>((get) => {
  const clusters = get(clustersAtom)
  const cluster = get(clusterAtom)
  return clusters.map((item) => ({
    ...item,
    active: item.name === cluster.name,
  }))
})

const activeClusterAtom = atom<AppCluster>((get) => {
  const clusters = get(activeClustersAtom)

  return clusters.find((item) => item.active) || clusters[0]
})

export interface ClusterProviderContext {
  cluster: AppCluster
  clusters: AppCluster[]
  addCluster: (cluster: AppCluster) => void
  deleteCluster: (cluster: AppCluster) => void
  reset: () => void
  setCluster: (cluster: AppCluster) => void
  getExplorerUrl(path: string): string
}

const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)

export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = useAtomValue(activeClusterAtom)
  const clusters = useAtomValue(activeClustersAtom)
  const setCluster = useSetAtom(clusterAtom)
  const setClusters = useSetAtom(clustersAtom)

  const value: ClusterProviderContext = {
    cluster,
    clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
    addCluster: (cluster: AppCluster) => {
      setClusters([...clusters, cluster])
    },
    deleteCluster: (cluster: AppCluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name))
    },
    reset: () => {
      setClusters(defaultClusters)
      setCluster(defaultClusters[0])
    },
    setCluster: (cluster: AppCluster) => setCluster(cluster),
    getExplorerUrl: (path: string) => `https://solana.fm/${path}${getClusterUrlParam(cluster)}`,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCluster() {
  return useContext(Context)
}

function getClusterUrlParam(cluster: AppCluster): string {
  let suffix = ''
  switch (cluster.network) {
    case AppClusterNetwork.Devnet:
      suffix = 'devnet-solana'
      break
    case AppClusterNetwork.Mainnet:
      suffix = 'mainnet-solana'
      break
    case AppClusterNetwork.Testnet:
      suffix = 'testnet-solana'
      break
    default:
      suffix = `localnet-solana&customUrl=${encodeURIComponent(cluster.endpoint)}`
      break
  }

  return suffix.length ? `?cluster=${suffix}` : ''
}
