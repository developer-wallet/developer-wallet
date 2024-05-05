import { CoreHeader, CoreShell, CoreShellPage } from '@core'
import { AssetFeature } from '@features/asset'
import { ClusterUiSelect } from '@features/cluster'
import { KeypairUiSelect } from '@features/keypair'
import { SettingsFeature } from '@features/settings'
import { Group } from '@mantine/core'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'

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
            <Group gap="xs">
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
