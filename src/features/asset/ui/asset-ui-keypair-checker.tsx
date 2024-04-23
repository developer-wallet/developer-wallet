import { useKeypair } from '../../keypair/data-access'
import { AssetUiBalanceCheck } from './asset-ui-balance-check.tsx'

export function AssetUiKeypairChecker() {
  const { keypair } = useKeypair()
  if (!keypair.solana) {
    return null
  }
  return <AssetUiBalanceCheck label="Fee Payer account not found" address={keypair.solana.publicKey} />
}
