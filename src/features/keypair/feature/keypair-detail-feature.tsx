import { Group } from '@mantine/core'
import { Keypair } from '@solana/web3.js'
import { UiCopy, UiStack } from '@ui'
import { ExplorerLink } from '../../cluster/cluster-ui.tsx'

export function KeypairDetailScreen({ keypair }: { keypair: Keypair }) {
  const address = keypair.publicKey

  return (
    <UiStack>
      <UiStack gap={0}>
        <Group>
          <UiCopy text={address.toString()} />
          <ExplorerLink ff="monospace" label={address.toString()} path={`account/${address}`} />
        </Group>
      </UiStack>
    </UiStack>
  )
}
