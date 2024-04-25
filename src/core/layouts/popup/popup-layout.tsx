import './popup-layout.css'
import { AppHeaderFullscreen } from '@core/app-header/app-header-fullscreen.tsx'
import { AppHeaderSidebar } from '@core/app-header/app-header-sidebar.tsx'
import { AppHeader } from '@core/app-header/app-header.tsx'
import { AppLayout, AppLayoutPage } from '@core/app-layout/app-layout.tsx'
import { Group } from '@mantine/core'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'
import React from 'react'

export function PopupLayout() {
  const pages: AppLayoutPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <div>Assets</div> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <div>Settings</div> },
  ]

  return (
    <AppLayout
      header={
        <AppHeader
          action={
            <Group>
              <AppHeaderFullscreen />
              <AppHeaderSidebar />
            </Group>
          }
        />
      }
      pages={pages}
    />
  )
}
