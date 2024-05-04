import { CoreStorage } from '@core/core-storage/core-storage.ts'
import { NavLink } from '@mantine/core'
import { IconChevronRight, IconKey, IconServer, IconSettings } from '@tabler/icons-react'
import { UiPage } from '@ui'
import React from 'react'
import { Link } from 'react-router-dom'

export function SettingsPage() {
  async function testStorage() {
    await CoreStorage.test()
  }

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
    </UiPage>
  )
}
