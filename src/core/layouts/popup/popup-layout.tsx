import './popup-layout.css'
import { AppHeader } from '@core/app-header/app-header.tsx'
import { AppProvider } from '@core/app-provider/app-provider.tsx'
import { AppTab, AppTabs } from '@core/app-tabs-popup/app-tabs.tsx'
import { Box, Flex } from '@mantine/core'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'
import React from 'react'

export function PopupLayout() {
  const tabs: AppTab[] = [
    { id: 'assets', label: 'Assets', icon: IconMoneybag, panel: <div>Assets</div> },
    { id: 'activity', label: 'Activity', icon: IconActivity, panel: <div>Activity</div> },
    { id: 'settings', label: 'Settings', icon: IconSettings, panel: <div>Settings</div> },
  ]

  return (
    <AppProvider>
      <Flex h="100vh" direction="column" justify="space-between">
        <AppHeader type="popup" />
        <Box style={{ flexGrow: 1 }}>
          <AppTabs tabs={tabs} />
        </Box>
      </Flex>
    </AppProvider>
  )
}