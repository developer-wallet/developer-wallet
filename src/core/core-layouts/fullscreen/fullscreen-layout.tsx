import './fullscreen-layout.css'
import { CoreShell, CoreShellPage } from '@core/core-shell/core-shell.tsx'
import { AssetFeature } from '@features/asset'
import { ClusterUiSelect } from '@features/cluster'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { Group } from '@mantine/core'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'
import { CoreHeader } from '../../core-header/core-header.tsx'

export function FullscreenLayout() {
  const pages: CoreShellPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <AssetFeature /> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <SettingsFeature /> },
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
