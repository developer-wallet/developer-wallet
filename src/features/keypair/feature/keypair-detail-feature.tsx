import { ClusterUiExplorerLink } from '@features/cluster/ui/cluster-ui-explorer-link.tsx'
import { Group } from '@mantine/core'
import { Keypair } from '@solana/web3.js'
import { UiCopy, UiStack } from '@ui'

export function KeypairDetailScreen({ keypair }: { keypair: Keypair }) {
  const address = keypair.publicKey

  return (
    <UiStack>
      <UiStack gap={0}>
        <Group>
          <UiCopy text={address.toString()} />
          <ClusterUiExplorerLink ff="monospace" label={address.toString()} path={`account/${address}`} />
        </Group>
      </UiStack>
    </UiStack>
  )
}
