import { Keypair as SolanaKeypair } from '@solana/web3.js'

import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { createContext, ReactNode, useContext } from 'react'

export function formatAmount(amount: number | string, decimals = 2) {
  return Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(parseFloat(amount.toString()))
}

function ellipsify(str = '', len = 4, delimiter = '..') {
  const strLen = str.length
  const limit = len * 2 + delimiter.length

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str
}

export interface Keypair {
  name: string
  publicKey: string
  secretKey: string
  active?: boolean
  solana?: SolanaKeypair
}

export const defaultKeypairs: Keypair[] = []

const keypairAtom = atomWithStorage<Keypair>('ppl-keypair', defaultKeypairs[0])
const keypairsAtom = atomWithStorage<Keypair[]>('ppl-keypairs', defaultKeypairs)

const activeKeypairsAtom = atom<Keypair[]>((get) => {
  const keypairs = get(keypairsAtom)
  const keypair = get(keypairAtom)
  return keypairs.map((item) => ({
    ...item,
    active: item?.name === keypair?.name,
  }))
})

const activeKeypairAtom = atom<Keypair>((get) => {
  const keypairs = get(activeKeypairsAtom)

  return keypairs.find((item) => item.active) || keypairs[0]
})

export interface KeypairProviderContext {
  keypair: Keypair
  keypairs: Keypair[]
  addKeypair: (keypair: Keypair) => void
  deleteKeypair: (keypair: Keypair) => void
  importKeypair: (secret: string) => void
  setKeypair: (keypair: Keypair) => void
  generateKeypair: () => void
}

const Context = createContext<KeypairProviderContext>({} as KeypairProviderContext)

export function KeypairProvider({ children }: { children: ReactNode }) {
  const keypair = useAtomValue(activeKeypairAtom)
  const keypairs = useAtomValue(activeKeypairsAtom)
  const setKeypair = useSetAtom(keypairAtom)
  const setKeypairs = useSetAtom(keypairsAtom)

  function addNewKeypair(kp: SolanaKeypair) {
    const keypair: Keypair = {
      name: ellipsify(kp.publicKey.toString()),
      publicKey: kp.publicKey.toString(),
      secretKey: `[${kp.secretKey.join(',')}]`,
    }
    setKeypairs([...keypairs, keypair])
    if (!keypairs.length) {
      activateKeypair(keypair)
    }
  }

  function activateKeypair(keypair: Keypair) {
    const kp = SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(keypair.secretKey)))
    setKeypair({ ...keypair, solana: kp })
  }

  function solanaInstance(kp: Keypair): Keypair {
    return {
      ...kp,
      solana: kp?.secretKey ? SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(kp?.secretKey))) : undefined,
    }
  }

  const value: KeypairProviderContext = {
    keypair: solanaInstance(keypair),
    keypairs: keypairs.sort((a, b) => (a.name > b.name ? 1 : -1)).map((item) => solanaInstance(item)),
    addKeypair: (keypair: Keypair) => {
      setKeypairs([...keypairs, keypair])
    },
    deleteKeypair: (keypair: Keypair) => {
      setKeypairs(keypairs.filter((item) => item.name !== keypair.name))
    },
    importKeypair(secret: string) {
      addNewKeypair(SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(secret))))
    },
    setKeypair: (keypair: Keypair) => activateKeypair(keypair),
    generateKeypair: () => addNewKeypair(SolanaKeypair.generate()),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useKeypair() {
  return useContext(Context)
}
