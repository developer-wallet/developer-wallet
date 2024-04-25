import './fullscreen-layout.css'
import { AppHeader } from '@core/app-header/app-header.tsx'
import { AppLayout, AppLayoutPage } from '@core/app-layout/app-layout.tsx'
import { AssetFeature } from '@features/asset/asset-feature.tsx'
import { ClusterFeature } from '@features/cluster/cluster-feature.tsx'
import { ClusterUiSelect } from '@features/cluster/cluster-ui.tsx'
import { DebugFeature } from '@features/debug/debug-feature.tsx'
import { KeypairFeature } from '@features/keypair/feature'
import { KeypairUiSelect } from '@features/keypair/ui'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { Group } from '@mantine/core'
import { IconActivity, IconBug, IconKey, IconMoneybag, IconServer, IconSettings } from '@tabler/icons-react'
import React from 'react'

export function FullscreenLayout() {
  const pages: AppLayoutPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <AssetFeature /> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'clusters', label: 'Clusters', leftSection: <IconServer />, element: <ClusterFeature /> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <SettingsFeature /> },
    { path: 'keypairs', label: 'Keypairs', leftSection: <IconKey />, element: <KeypairFeature /> },
    { path: 'debug', label: 'Debug', leftSection: <IconBug />, element: <DebugFeature /> },
  ]

  return (
    <AppLayout
      header={
        <AppHeader
          action={
            <Group>
              <KeypairUiSelect />
              <ClusterUiSelect />
            </Group>
          }
        />
      }
      pages={pages}
    />
  )
}
