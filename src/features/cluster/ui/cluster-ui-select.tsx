import { useCluster } from '@features/cluster'
import { Button, Menu } from '@mantine/core'
import { IconServer, IconServerOff } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function ClusterUiSelect() {
  const { clusters, selectCluster, cluster } = useCluster()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light" size="sm">
          {cluster?.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {clusters.map((item) => (
          <Menu.Item
            key={item.name}
            fw={item.active ? 'bold' : 'normal'}
            onClick={() => selectCluster(item)}
            leftSection={item.active ? <IconServer /> : <IconServerOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={Link} to="/settings/clusters">
          Manage Clusters
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
