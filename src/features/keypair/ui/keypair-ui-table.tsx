import { RenderLabel } from '@features/labels'
import { ActionIcon, Anchor, Group, Table, Text } from '@mantine/core'
import { IconCurrencySolana, IconTrash } from '@tabler/icons-react'
import { UiCopy, UiDebugModal } from '@ui'
import { AppKeypair } from '../data-access'

export function KeypairUiTable({
  keypair,
  keypairs,
  deleteKeypair,
  setKeypair,
}: {
  keypair: AppKeypair | undefined
  keypairs: AppKeypair[]
  deleteKeypair: (keypair: AppKeypair) => Promise<void>
  setKeypair: (keypair: AppKeypair) => Promise<void>
}) {
  return (
    <Table>
      <Table.Tbody>
        {keypairs?.map((item) => (
          <Table.Tr key={item.name}>
            <Table.Td>
              {keypair?.publicKey === item.publicKey ? (
                <RenderLabel size="lg" publicKey={item.publicKey} />
              ) : (
                <Anchor component="button" title="Select keypair" onClick={() => setKeypair(item)}>
                  <RenderLabel publicKey={item.publicKey} />
                </Anchor>
              )}

              <Group gap={4}>
                <UiCopy size="xs" text={item.publicKey} />
                <Text c="dimmed" size="xs">
                  {item.publicKey}
                </Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Group gap="xs" justify="flex-end">
                <ActionIcon disabled={!item.solana} size="sm" variant="light">
                  <IconCurrencySolana />
                </ActionIcon>
                <UiDebugModal data={item} />
                <ActionIcon
                  size="sm"
                  variant="light"
                  disabled={keypair?.publicKey === item.publicKey}
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) return
                    deleteKeypair(item)
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
