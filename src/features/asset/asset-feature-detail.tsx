import { Keypair } from '@features/keypair/data-access'
import { PublicKey } from '@solana/web3.js'
import { UiStack } from '@ui'
import { useMemo } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { AssetUiTokens } from './asset-ui-tokens.tsx'

import { AssetUiBalance } from './ui/asset-ui-balance.tsx'
import { AssetUiButtons } from './ui/asset-ui-buttons.tsx'
import { AssetUiTransactions } from './ui/asset-ui-transactions.tsx'
import { ellipsify } from './ui/ellipsify'

export function AssetFeatureDetail({ keypair }: { keypair: Keypair }) {
  const { params } = { params: { address: keypair.publicKey } }
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <UiStack align="stretch" gap="xl">
      <UiStack>
        <UiStack align="center" gap="xl">
          <AssetUiBalance order={2} address={address} />
          <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          <AssetUiButtons address={address} />
        </UiStack>

        <UiStack align="stretch" gap="xl">
          <AssetUiTokens address={address} />
          <AssetUiTransactions address={address} />
        </UiStack>
      </UiStack>
    </UiStack>
  )
}
