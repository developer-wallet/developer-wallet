import './sidepanel-layout.css'
import { CoreHeaderFullscreen } from '@core/core-header/core-header-fullscreen.tsx'
import { CoreHeader } from '@core/core-header/core-header.tsx'
import { CoreShell, CoreShellPage } from '@core/core-shell/core-shell.tsx'
import { SettingsFeature } from '@features/settings/settings-feature.tsx'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'

export function SidepanelLayout() {
  const pages: CoreShellPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <div>Assets</div> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <SettingsFeature /> },
  ]

  return <CoreShell header={<CoreHeader action={<CoreHeaderFullscreen />} />} pages={pages} />
}
