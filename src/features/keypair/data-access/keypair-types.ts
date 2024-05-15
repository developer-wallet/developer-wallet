import { Keypair } from '@solana/web3.js'

export interface AppKeypair {
  id: string
  name: string
  publicKey: string
  secretKey: string
  active?: boolean
  solana?: Keypair
}

export type KeypairFormInput = Omit<AppKeypair, 'active' | 'solana' | 'secretKey'> & { secretKey?: string }
