import { ellipsify } from '@core'
import { Keypair as SolanaKeypair, PublicKey } from '@solana/web3.js'
import { AppKeypair } from './keypair-types'

export function getSolanaKeypair(keypair: AppKeypair): SolanaKeypair | undefined {
  if (!keypair?.secretKey) return undefined
  return isValidSolanaKeypair(keypair.secretKey)
}

export function getSolanaPublicKey(publicKey?: PublicKey | string): PublicKey | undefined {
  if (!publicKey) return undefined
  return isValidSolanaPublicKey(publicKey)
}

export function isValidSolanaKeypair(secretKey: string): SolanaKeypair | undefined {
  try {
    return SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(secretKey)))
  } catch (e) {
    console.log('Error parsing secret key', e)
    return undefined
  }
}

export function isValidSolanaPublicKey(publicKey: PublicKey | string): PublicKey | undefined {
  try {
    return new PublicKey(publicKey)
  } catch (e) {
    console.log(`Invalid public key`, e)
    return undefined
  }
}

export function getSolanaInstance(kp: Omit<AppKeypair, 'solana'>): AppKeypair {
  return {
    ...kp,
    solana: kp?.secretKey ? getSolanaKeypair(kp) : undefined,
  }
}

export async function generateAppKeypair(): Promise<AppKeypair> {
  const keypair = SolanaKeypair.generate()

  return {
    name: ellipsify(keypair.publicKey.toString()),
    publicKey: keypair.publicKey.toString(),
    secretKey: `[${Array.from(keypair.secretKey)}]`,
  }
}
