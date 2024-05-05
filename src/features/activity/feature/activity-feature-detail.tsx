import { getSolanaPublicKey } from '@features/keypair'
import { SolanaFeatureTransactions } from '@features/solana'
import { useMemo } from 'react'

export function ActivityFeatureDetail({ publicKey }: { publicKey: string }) {
  const address = useMemo(() => getSolanaPublicKey(publicKey), [publicKey])

  if (!address) {
    return <div>Error loading account</div>
  }

  return <SolanaFeatureTransactions address={address} />
}
