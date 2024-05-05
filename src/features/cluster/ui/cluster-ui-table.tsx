import { ActionIcon, Anchor, Badge, Code, Group, Table, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconHandFinger, IconHandFingerOff, IconPencil, IconTrash } from '@tabler/icons-react'
import { UiDebugModal } from '@ui'
import { AppCluster } from '../data-access'
import { ClusterUiForm } from './cluster-ui-form'

export function ClusterUiTable({
  clusters,
  deleteCluster,
  selectCluster,
  updateCluster,
}: {
  clusters: AppCluster[]
  deleteCluster: (cluster: AppCluster) => Promise<void>
  selectCluster: (cluster: AppCluster) => Promise<void>
  updateCluster: (cluster: AppCluster) => Promise<void>
}) {
  return (
    <div>
      <Table withTableBorder>
        <Table.Tbody>
          {clusters.map((item) => (
            <Table.Tr key={item.name}>
              <Table.Td>
                <Group gap="xs">
                  <Text size="lg">
                    {item?.active ? (
                      item.name
                    ) : (
                      <Anchor component="button" title="Select cluster" onClick={() => selectCluster(item)}>
                        {item.name}
                      </Anchor>
                    )}
                  </Text>
                  <Badge variant="light" size="xs">
                    {item.network ?? 'custom'}
                  </Badge>
                </Group>
                <Code>{item.endpoint}</Code>
              </Table.Td>
              <Table.Td align="right">
                <Group gap="xs" justify="flex-end" wrap="nowrap">
                  <Tooltip label="Select cluster">
                    <ActionIcon disabled={item.active} size="sm" variant="light" onClick={() => selectCluster(item)}>
                      {item.active ? <IconHandFingerOff size={16} /> : <IconHandFinger size={16} />}
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Delete cluster">
                    <ActionIcon
                      size="sm"
                      variant="light"
                      disabled={item?.active}
                      onClick={async () => {
                        if (!window.confirm('Are you sure?')) return
                        await deleteCluster(item)
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Update cluster">
                    <ActionIcon
                      size="sm"
                      variant="light"
                      onClick={() => {
                        modals.open({
                          size: 'lg',
                          centered: true,
                          children: (
                            <ClusterUiForm
                              item={item}
                              submit={async (res) => {
                                await updateCluster(res as AppCluster)
                                modals.closeAll()
                              }}
                            />
                          ),
                        })
                      }}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <UiDebugModal data={item} />
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
