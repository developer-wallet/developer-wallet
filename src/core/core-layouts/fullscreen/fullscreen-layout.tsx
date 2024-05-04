import './fullscreen-layout.css'
import { CoreShell, CoreShellPage } from '@core/core-shell/core-shell.tsx'
import { AssetFeature } from '@features/asset'
import { ClusterUiSelect } from '@features/cluster'
import { DebugFeature } from '@features/debug/debug-feature.tsx'
import { KeypairFeature } from '@features/keypair'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { Group } from '@mantine/core'
import { IconActivity, IconBug, IconKey, IconMoneybag, IconSettings } from '@tabler/icons-react'
import React from 'react'
import { CoreHeader } from '../../core-header/core-header.tsx'

export function FullscreenLayout() {
  const pages: CoreShellPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <AssetFeature /> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <SettingsFeature /> },
    { path: 'keypairs', label: 'Keypairs', leftSection: <IconKey />, element: <KeypairFeature /> },
    { path: 'debug', label: 'Debug', leftSection: <IconBug />, element: <DebugFeature /> },
  ]

  return (
    <CoreShell
      header={
        <CoreHeader
          action={
            <Group>
              {/*<KeypairUiSelect />*/}
              <ClusterUiSelect />
            </Group>
          }
        />
      }
      pages={pages}
    />
  )
}
