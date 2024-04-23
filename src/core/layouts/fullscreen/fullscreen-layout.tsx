import './fullscreen-layout.css'
import { AppHeader } from '@core/app-header/app-header.tsx'
import { AppProvider } from '@core/app-provider/app-provider.tsx'
import { AppTab, AppTabs } from '@core/app-tabs-popup/app-tabs.tsx'
import { AssetFeature } from '@features/asset/asset-feature.tsx'
import { ClusterFeature } from '@features/cluster/cluster-feature.tsx'
import { ClusterUiSelect } from '@features/cluster/cluster-ui.tsx'
import { DebugFeature } from '@features/debug/debug-feature.tsx'
import { KeypairFeature } from '@features/keypair/feature'
import { KeypairUiSelect } from '@features/keypair/ui'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { Box, Flex, Group } from '@mantine/core'
import { IconActivity, IconBug, IconKey, IconMoneybag, IconServer, IconSettings } from '@tabler/icons-react'
import React from 'react'

export function FullscreenLayout() {
  const tabs: AppTab[] = [
    { id: 'assets', label: 'Assets', icon: IconMoneybag, panel: <AssetFeature /> },
    { id: 'activity', label: 'Activity', icon: IconActivity, panel: <div>Activity</div> },
    { id: 'clusters', label: 'Clusters', icon: IconServer, panel: <ClusterFeature /> },
    { id: 'settings', label: 'Settings', icon: IconSettings, panel: <SettingsFeature /> },
    { id: 'keypairs', label: 'Keypairs', icon: IconKey, panel: <KeypairFeature /> },
    { id: 'debug', label: 'Debug', icon: IconBug, panel: <DebugFeature /> },
  ]

  return (
    <AppProvider>
      <Flex h="100vh" direction="column" justify="space-between">
        <AppHeader
          type="fullscreen"
          action={
            <Group>
              <KeypairUiSelect />
              <ClusterUiSelect />
            </Group>
          }
        />
        <Box style={{ flexGrow: 1 }}>
          <AppTabs tabs={tabs} orientation="vertical" />
        </Box>
      </Flex>
    </AppProvider>
  )
}
