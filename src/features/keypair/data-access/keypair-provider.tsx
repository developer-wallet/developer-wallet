import { ellipsify } from '@core'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toastError } from '@ui'
import { nanoid } from 'nanoid'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { storage, WxtStorageItem } from 'wxt/storage'
import {
  generateAppKeypair,
  getKeypairFromSecret,
  getSolanaInstance,
  getSolanaKeypair,
  isValidSolanaKeypair,
} from './keypair-helpers'
import { AppKeypair, KeypairFormInput } from './keypair-types'

export interface KeypairProviderContext {
  solanaKeypair?: SolanaKeypair
  keypair: AppKeypair | undefined
  keypairs: AppKeypair[]
  loading: boolean
  addKeypair: (keypair: KeypairFormInput) => Promise<void>
  deleteKeypair: (keypair: AppKeypair) => Promise<void>
  updateKeypair: (keypair: AppKeypair) => Promise<void>
  selectKeypair: (keypair: AppKeypair) => Promise<void>
  importKeypair: () => Promise<void>
  generateKeypair: () => Promise<void>
}

const Context = createContext<KeypairProviderContext>({} as KeypairProviderContext)

export function KeypairProvider({ children }: { children: ReactNode }) {
  const storageKey = 'sync:keypairs'
  const items: WxtStorageItem<AppKeypair[], {}> = storage.defineItem<AppKeypair[]>(storageKey, {
    defaultValue: [],
    version: 1,
  })

  const queryKeypairs = useQuery({ queryKey: [storageKey], queryFn: () => items.getValue() })

  const mutationKeypairAdd = useMutation({
    mutationFn: async (keypair: AppKeypair) => items.setValue([...(await items.getValue()), keypair]),
  })

  async function ensureKeypair(id: string) {
    const keypairs = await items.getValue()
    const found = keypairs.find((item) => item.id === id)
    if (!found) throw new Error(`Keypair with id ${id} not found`)

    return found
  }

  const mutationKeypairUpdate = useMutation({
    mutationFn: async (input: KeypairFormInput) => {
      const found = await ensureKeypair(input.id)

      return items.setValue([...keypairs.filter((item) => item.id !== input.id), { ...found, ...input }])
    },
  })
  const mutationKeypairDelete = useMutation({
    mutationFn: async (input: AppKeypair) => {
      const found = await ensureKeypair(input.id)

      return items.setValue(keypairs.filter((item) => item.id !== found.id))
    },
  })
  const mutationKeypairSelect = useMutation({
    mutationFn: async (input: AppKeypair) => {
      const found = await ensureKeypair(input.id)

      await items.setValue(
        keypairs.map((item) => (item.id === found.id ? { ...item, active: true } : { ...item, active: false })),
      )
    },
  })

  const keypairs = useMemo(() => queryKeypairs.data ?? [], [queryKeypairs.data])
  const keypair = useMemo(() => keypairs.find((item) => item.active) ?? keypairs[0], [keypairs])
  const solanaKeypair = useMemo(() => getSolanaKeypair(keypair), [keypair])

  async function addKeypair(solanaKeypair: SolanaKeypair, name?: string) {
    const active = !keypairs.find((item) => item.active)
    const publicKey = solanaKeypair.publicKey.toString()
    const publicKeyFound = keypairs.find((item) => item.publicKey === publicKey)
    if (publicKeyFound) {
      toastError(`Public key already exists`)
      return
    }

    const publicKeyLabel = ellipsify(publicKey)
    const secretKey = `[${Array.from(solanaKeypair.secretKey)}]`
    const inputName = name?.length ? name : publicKeyLabel
    const nameIndex = keypairs.findIndex((item) => item.name === inputName)
    const actualName = nameIndex !== -1 ? `${inputName} (${nameIndex + 1})` : inputName

    return mutationKeypairAdd
      .mutateAsync({ id: nanoid(), name: actualName, publicKey, secretKey, active })
      .then(() => queryKeypairs.refetch())
  }

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
        toastError('Invalid keypair')
        return
      }
      await addKeypair(solanaKeypair, input.name)
    },
    updateKeypair: async (input: KeypairFormInput) => {
      await mutationKeypairUpdate.mutateAsync(input)
      await queryKeypairs.refetch()
    },
    deleteKeypair: async (keypair: AppKeypair) => {
      await mutationKeypairDelete.mutateAsync(keypair)
      await queryKeypairs.refetch()
    },
    selectKeypair: async (keypair: AppKeypair) => {
      await mutationKeypairSelect.mutateAsync(keypair)
      await queryKeypairs.refetch()
    },
    generateKeypair: async () => {
      await mutationKeypairAdd.mutateAsync(await generateAppKeypair())
      await queryKeypairs.refetch()
    },
    importKeypair: async () => {
      const secret = window.prompt(`Import keypair`)
      if (!secret?.trim().length) {
        return
      }
      try {
        const keypair = getKeypairFromSecret(secret)
        await addKeypair(keypair)
      } catch (error) {
        toastError(`${error}`)
        return
      }
    },
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useKeypair() {
  return useContext(Context)
}
