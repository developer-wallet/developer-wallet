import { useWallet } from '@solana/wallet-adapter-react'
import { useKeypair } from '../../keypair/data-access'

import { AssetUiBalanceCheck } from './asset-ui-balance-check.tsx'

export function AssetUiChecker() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <AssetUiBalanceCheck address={publicKey} />
}

export function AccountUiCheckerKeypair() {
  const { keypair } = useKeypair()
  if (!keypair.solana) {
    return null
  }
  return <AssetUiBalanceCheck label="Keypair account not found" address={keypair.solana?.publicKey} />
}
