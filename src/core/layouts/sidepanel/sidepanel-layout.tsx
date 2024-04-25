import './sidepanel-layout.css'
import { AppHeaderFullscreen } from '@core/app-header/app-header-fullscreen.tsx'
import { AppHeader } from '@core/app-header/app-header.tsx'
import { AppLayout, AppLayoutPage } from '@core/app-layout/app-layout.tsx'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'
import React from 'react'

export function SidepanelLayout() {
  const pages: AppLayoutPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <div>Assets</div> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <SettingsFeature /> },
  ]

  return <AppLayout header={<AppHeader action={<AppHeaderFullscreen />} />} pages={pages} />
}
