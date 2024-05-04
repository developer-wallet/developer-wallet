import { ellipsify } from '@core/core-helpers'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import { AppKeypair } from './keypair-types.ts'

export function getSolanaKeypair(kp: AppKeypair): SolanaKeypair | undefined {
  if (!kp?.secretKey) return undefined
  return isValidSolanaKeypair(kp.secretKey)
}

export function isValidSolanaKeypair(secretKey: string): SolanaKeypair | undefined {
  try {
    return SolanaKeypair.fromSecretKey(new Uint8Array(JSON.parse(secretKey)))
  } catch (e) {
    console.log('Error parsing secret key', e)
    return undefined
  }
}

export function getSolanaInstance(kp: Omit<AppKeypair, 'solana'>): AppKeypair {
  return {
    ...kp,
    solana: kp?.secretKey ? getSolanaKeypair(kp) : undefined,
  }
}

export async function getKeypair(): Promise<AppKeypair> {
  const keypair = SolanaKeypair.generate()

  return {
    name: ellipsify(keypair.publicKey.toString()),
    publicKey: keypair.publicKey.toString(),
    secretKey: `[${Array.from(keypair.secretKey)}]`,
  }
}
