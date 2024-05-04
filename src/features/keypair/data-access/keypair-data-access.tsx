import { ellipsify } from '@core/core-helpers'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'
import { storage } from 'wxt/storage'

export interface AppKeypair {
  name: string
  publicKey: string
  secretKey: string
  active?: boolean
  solana?: SolanaKeypair
}

const initial = SolanaKeypair.generate()
export const defaultKeypairs: AppKeypair[] = [
  {
    name: ellipsify(initial.publicKey.toString()),
    publicKey: initial.publicKey.toString(),
    secretKey: `[${Array.from(initial.secretKey)}]`,
  },
]

const keypairStorage = storage.defineItem<AppKeypair>('sync:keypair', { defaultValue: defaultKeypairs[0], version: 1 })
const keypairsStorage = storage.defineItem<AppKeypair[]>('sync:keypairs', {
  defaultValue: defaultKeypairs,
  version: 1,
})

export interface KeypairProviderContext {
  keypair: AppKeypair | undefined
  keypairs: AppKeypair[]
  loading: boolean
  addKeypair: (keypair: AppKeypair) => void
  deleteKeypair: (keypair: AppKeypair) => void
  importKeypair: (secret: string) => void
  setKeypair: (keypair: AppKeypair) => void
  generateKeypair: () => void
}

const Context = createContext<KeypairProviderContext>({} as KeypairProviderContext)

export function useStorageKeypair() {
  return useQuery({
    queryKey: ['keypair'],
    queryFn: () => keypairStorage.getValue(),
  })
}

export function useStorageKeypairs() {
  return useQuery({
    queryKey: ['keypairs'],
    queryFn: () => keypairsStorage.getValue(),
  })
}

export function KeypairProvider({ children }: { children: ReactNode }) {
  const queryKeypair = useStorageKeypair()
  const queryKeypairs = useStorageKeypairs()

  const loading = queryKeypair.isLoading || queryKeypairs.isLoading

  function addNewKeypair(kp: SolanaKeypair) {
    const keypair: AppKeypair = {
      name: ellipsify(kp.publicKey.toString()),
      publicKey: kp.publicKey.toString(),
      secretKey: `${Array.from(kp.secretKey)}`,
    }

    // setKeypairs([...keypairs, keypair])
    // if (!keypairs.length) {
    //   activateKeypair(keypair)
    // }
  }

  function activateKeypair(keypair: AppKeypair) {
    const kp = getSolanaKeypair(keypair)
    // setKeypair({ ...keypair, solana: kp })
  }

  function solanaInstance(kp: AppKeypair): AppKeypair {
    return {
      ...kp,
      solana: kp?.secretKey ? getSolanaKeypair(kp) : undefined,
    }
  }

  const value: KeypairProviderContext = {
    keypair: queryKeypair.data ? solanaInstance(queryKeypair.data) : undefined,
    keypairs: queryKeypairs.data ?? [], // keypairs.sort((a, b) => (a.name > b.name ? 1 : -1)).map((item) => solanaInstance(item)),
    loading,
    addKeypair: (keypair: AppKeypair) => {
      // setKeypairs([...keypairs, keypair])
    },
    deleteKeypair: (keypair: AppKeypair) => {
      // setKeypairs(keypairs.filter((item) => item.name !== keypair.name))
    },
    importKeypair(secret: string) {
      addNewKeypair(SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(secret))))
    },
    setKeypair: (keypair: AppKeypair) => activateKeypair(keypair),
    generateKeypair: () => addNewKeypair(SolanaKeypair.generate()),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useKeypair() {
  return useContext(Context)
}

function getSolanaKeypair(kp: AppKeypair): SolanaKeypair | undefined {
  try {
    return SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(kp?.secretKey)))
  } catch (e) {
    console.log('Error parsing secret key', e)
    return undefined
  }
}
