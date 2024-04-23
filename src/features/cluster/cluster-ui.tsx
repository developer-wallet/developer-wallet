import { Anchor, AnchorProps, Button, Group, Menu, Select, Table, Text, TextInput } from '@mantine/core'
import { IconNetwork, IconNetworkOff, IconTrash } from '@tabler/icons-react'
import { UiCopy, UiStack } from '@ui'
import { ReactNode, useState } from 'react'

import { AppClusterNetwork, useCluster } from './cluster-data-access'

export function ExplorerLink({
  copy,
  path,
  label = 'View on Explorer',
  ...props
}: { path: string; copy?: string; label?: ReactNode } & AnchorProps) {
  const { getExplorerUrl } = useCluster()
  return (
    <Group align="start" gap={4} wrap="nowrap">
      {copy ? <UiCopy text={copy} /> : null}
      <Anchor href={getExplorerUrl(path)} target="_blank" rel="noopener noreferrer" {...props}>
        {label}
      </Anchor>
    </Group>
  )
}

export function ClusterUiSelect() {
  const { clusters, setCluster, cluster } = useCluster()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light" size="xs">
          {cluster.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setCluster(item)}
            leftSection={item.active ? <IconNetwork /> : <IconNetworkOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        {/*<Menu.Item component={Link} to="/clusters">*/}
        {/*    Manage Clusters*/}
        {/*</Menu.Item>*/}
      </Menu.Dropdown>
    </Menu>
  )
}

export function ClusterUiModal() {
  const { addCluster } = useCluster()
  const [name, setName] = useState('')
  const [network, setNetwork] = useState<AppClusterNetwork | undefined>(AppClusterNetwork.Devnet)
  const [endpoint, setEndpoint] = useState('')

  return (
    <UiStack>
      <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextInput type="text" placeholder="Endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      <Select
        value={network}
        onChange={(value) => setNetwork(value as AppClusterNetwork)}
        data={[
          { value: AppClusterNetwork.Custom, label: 'Custom' },
          { value: AppClusterNetwork.Devnet, label: 'Devnet' },
          { value: AppClusterNetwork.Testnet, label: 'Testnet' },
          { value: AppClusterNetwork.Mainnet, label: 'Mainnet' },
        ]}
      />
      <Group justify="flex-end">
        <Button
          onClick={() => {
            addCluster({ name, network, endpoint })
          }}
        >
          Save
        </Button>
      </Group>
    </UiStack>
  )
}

export function ClusterUiTable() {
  const { clusters, setCluster, deleteCluster } = useCluster()
  return (
    <div>
      <Table withTableBorder>
        <Table.Tbody>
          {clusters.map((item) => (
            <Table.Tr key={item.name}>
              <Table.Td>
                <Text size="lg">
                  {item?.active ? (
                    item.name
                  ) : (
                    <Anchor component="button" title="Select cluster" onClick={() => setCluster(item)}>
                      {item.name}
                    </Anchor>
                  )}
                </Text>
                <Text size="xs">Network: {item.network ?? 'custom'}</Text>
                <div>{item.endpoint}</div>
              </Table.Td>
              <Table.Td align="right">
                <Button
                  disabled={item?.active}
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) return
                    deleteCluster(item)
                  }}
                >
                  <IconTrash size={16} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
