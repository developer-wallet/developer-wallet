import { ActionIcon, Anchor, Group, Table, Text } from '@mantine/core'
import { IconCurrencySolana, IconTrash } from '@tabler/icons-react'
import { UiCopy, UiDebugModal } from '@ui'
import { RenderLabel } from '../../label'
import { AppKeypair } from '../data-access'

export interface KeypairUiTableProps {
  keypairs: AppKeypair[]
  deleteKeypair: (keypair: AppKeypair) => Promise<void>
  selectKeypair: (keypair: AppKeypair) => Promise<void>
}

export function KeypairUiTable({ keypairs, deleteKeypair, selectKeypair }: KeypairUiTableProps) {
  return (
    <Table>
      <Table.Tbody>
        {keypairs?.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>
              {item.active ? (
                <RenderLabel size="lg" publicKey={item.publicKey} />
              ) : (
                <Anchor component="button" title="Select keypair" onClick={() => selectKeypair(item)}>
                  <RenderLabel size="lg" publicKey={item.publicKey} />
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
                <UiCopy text={item.secretKey} tooltip="Copy Secret" />
                <ActionIcon
                  size="sm"
                  variant="light"
                  disabled={item.active}
                  onClick={async () => {
                    if (!window.confirm('Are you sure?')) return
                    await deleteKeypair(item)
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
