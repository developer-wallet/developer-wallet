import { NavLink } from '@mantine/core'
import { IconBug, IconChevronRight, IconKey, IconServer, IconSettings } from '@tabler/icons-react'
import { UiPage } from '@ui'
import { Link } from 'react-router-dom'

export function SettingsPage() {
  return (
    <UiPage title="Settings" leftAction={<IconSettings />}>
      <NavLink
        component={Link}
        to={`/settings/clusters`}
        label="Clusters"
        leftSection={<IconServer />}
        rightSection={<IconChevronRight />}
        variant="outline"
      />
      <NavLink
        component={Link}
        to={`/settings/keypairs`}
        label="Keypairs"
        leftSection={<IconKey />}
        rightSection={<IconChevronRight />}
        variant="filled"
      />
      <NavLink
        component={Link}
        to={`/settings/debug`}
        label="Debug"
        leftSection={<IconBug />}
        rightSection={<IconChevronRight />}
        variant="filled"
      />
    </UiPage>
  )
}
