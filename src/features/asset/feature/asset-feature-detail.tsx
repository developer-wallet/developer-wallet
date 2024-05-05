import { ellipsify } from '@core'
import { ClusterUiExplorerLink } from '@features/cluster'
import { getSolanaPublicKey } from '@features/keypair'
import { SolanaFeatureBalance, SolanaFeatureTokens } from '@features/solana'
import { UiStack } from '@ui'
import { useMemo } from 'react'
import { AssetUiButtons } from '../ui/asset-ui-buttons'

export function AssetFeatureDetail({ publicKey }: { publicKey: string }) {
  const address = useMemo(() => getSolanaPublicKey(publicKey), [publicKey])

  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <UiStack align="stretch" gap="xl">
      <UiStack>
        <UiStack align="center" gap="xl">
          <SolanaFeatureBalance order={2} address={address} />
          <ClusterUiExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          <AssetUiButtons address={address} />
        </UiStack>

        <UiStack align="stretch" gap="xl">
          <SolanaFeatureTokens address={address} />
        </UiStack>
      </UiStack>
    </UiStack>
  )
}
