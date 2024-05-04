import { Button, Group, Text } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import { UiWarning } from '@ui'
import { useCluster } from '../../cluster/data-access/cluster-provider.tsx'
import { useGetBalance, useRequestAirdrop } from '../asset-data-access'

export function AssetUiBalanceCheck({ address, label = 'Account not found' }: { address: PublicKey; label?: string }) {
  const { cluster } = useCluster()
  const query = useGetBalance({ address })
  const requestAirdrop = useRequestAirdrop({ address })

  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <UiWarning
        mb="xl"
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title={label}
        icon={undefined}
        message={
          <Group justify="center">
            <Text>
              You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
            </Text>
            <Button
              variant="light"
              color="yellow"
              size="xs"
              onClick={() => requestAirdrop.mutateAsync('1').catch((err) => console.log(err))}
            >
              Request Airdrop
            </Button>
          </Group>
        }
      />
    )
  }
  return null
}
