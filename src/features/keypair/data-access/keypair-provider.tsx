import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toastError } from '@ui'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { storage, WxtStorageItem } from 'wxt/storage'
import { getKeypair, getSolanaInstance, getSolanaKeypair, isValidSolanaKeypair } from './keypair-helpers'
import { AppKeypair, KeypairFormInput } from './keypair-types'

export const defaultKeypairs: AppKeypair[] = []

export interface KeypairProviderContext {
  solanaKeypair?: SolanaKeypair
  keypair: AppKeypair | undefined
  keypairs: AppKeypair[]
  loading: boolean
  addKeypair: (keypair: KeypairFormInput) => Promise<void>
  deleteKeypair: (keypair: AppKeypair) => Promise<void>
  updateKeypair: (keypair: AppKeypair) => Promise<void>
  selectKeypair: (keypair: AppKeypair) => Promise<void>
  generateKeypair: () => Promise<void>
}

const Context = createContext<KeypairProviderContext>({} as KeypairProviderContext)

export function KeypairProvider({ children }: { children: ReactNode }) {
  const storageKey = 'sync:keypairs'
  const items: WxtStorageItem<AppKeypair[], {}> = storage.defineItem<AppKeypair[]>(storageKey, {
    defaultValue: defaultKeypairs,
    version: 1,
  })

  const queryKeypairs = useQuery({ queryKey: [storageKey], queryFn: () => items.getValue() })

  const mutationKeypairAdd = useMutation({
    mutationFn: async (keypair: AppKeypair) => items.setValue([...(await items.getValue()), keypair]),
  })

  const mutationKeypairUpdate = useMutation({
    mutationFn: async (input: KeypairFormInput) => {
      const keypairs = await items.getValue()
      const found = keypairs.find((item) => item.publicKey === input.publicKey)
      if (!found) throw new Error(`Keypair with id ${input.publicKey} not found`)

      return items.setValue([...keypairs.filter((item) => item.publicKey !== input.publicKey), { ...found, ...input }])
    },
  })
  const mutationKeypairDelete = useMutation({
    mutationFn: async (keypair: AppKeypair) => {
      const keypairs = await items.getValue()
      const found = keypairs.find((item) => item.publicKey === keypair.publicKey)
      if (!found) throw new Error(`Keypair with id ${keypair.publicKey} not found`)

      return items.setValue(keypairs.filter((item) => item.publicKey !== keypair.publicKey))
    },
  })
  const mutationKeypairSelect = useMutation({
    mutationFn: async (keypair: AppKeypair) => {
      const keypairs = await items.getValue()
      const found = keypairs.find((item) => item.publicKey === keypair.publicKey)
      if (!found) throw new Error(`Keypair with id ${keypair.publicKey} not found`)

      await items.setValue(
        keypairs.map((item) =>
          item.publicKey === keypair.publicKey ? { ...item, active: true } : { ...item, active: false },
        ),
      )
    },
  })

  const keypairs = useMemo(() => queryKeypairs.data ?? [], [queryKeypairs.data])
  const keypair = useMemo(() => keypairs.find((item) => item.active) ?? keypairs[0], [keypairs])
  const solanaKeypair = useMemo(() => getSolanaKeypair(keypair), [keypair])

  const value: KeypairProviderContext = {
    solanaKeypair,
    keypair,
    keypairs: keypairs.sort((a, b) => (a.name > b.name ? 1 : -1)).map((item) => getSolanaInstance(item)),
    loading: queryKeypairs.isLoading,
    addKeypair: async (input: KeypairFormInput) => {
      if (!input.secretKey) {
        toastError('Invalid secret key')
        return
      }

      const solanaKeypair = isValidSolanaKeypair(input.secretKey)
      if (!solanaKeypair) {
        toastError('Invalid endpoint')
        return
      }

      const active = !keypairs.find((item) => item.active)
      const publicKey = solanaKeypair.publicKey.toString()
      const secretKey = `${Array.from(solanaKeypair.secretKey)}`
      const providedName = input.name.length ? input.name : input.publicKey
      const existing = keypairs.find((item) => item.name === providedName)
      const name = existing ? `${providedName} {${input.publicKey}}` : providedName

      return mutationKeypairAdd.mutateAsync({ name, publicKey, secretKey, active }).then(async () => {
        await queryKeypairs.refetch()
      })
    },
    updateKeypair: async (input: KeypairFormInput) => {
      return mutationKeypairUpdate.mutateAsync(input).then(async () => {
        await queryKeypairs.refetch()
      })
    },
    deleteKeypair: async (keypair: AppKeypair) =>
      mutationKeypairDelete.mutateAsync(keypair).then(async () => {
        await queryKeypairs.refetch()
      }),
    selectKeypair: async (keypair: AppKeypair) =>
      mutationKeypairSelect.mutateAsync(keypair).then(async () => {
        await queryKeypairs.refetch()
      }),
    generateKeypair: async () => {
      const keypair = await getKeypair()
      await mutationKeypairAdd.mutateAsync(keypair)
    },
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useKeypair() {
  return useContext(Context)
}
