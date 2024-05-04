import './popup-layout.css'
import { CoreHeaderFullscreen } from '@core/core-header/core-header-fullscreen.tsx'
import { CoreHeaderSidebar } from '@core/core-header/core-header-sidebar.tsx'
import { CoreHeader } from '@core/core-header/core-header.tsx'
import { CoreShell, CoreShellPage } from '@core/core-shell/core-shell.tsx'
import { Group } from '@mantine/core'
import { IconActivity, IconMoneybag, IconSettings } from '@tabler/icons-react'

export function PopupLayout() {
  const pages: CoreShellPage[] = [
    { path: 'assets', label: 'Assets', leftSection: <IconMoneybag />, element: <div>Assets</div> },
    { path: 'activity', label: 'Activity', leftSection: <IconActivity />, element: <div>Activity</div> },
    { path: 'settings', label: 'Settings', leftSection: <IconSettings />, element: <div>Settings</div> },
  ]

  return (
    <CoreShell
      header={
        <CoreHeader
          action={
            <Group>
              <CoreHeaderFullscreen />
              <CoreHeaderSidebar />
            </Group>
          }
        />
      }
      pages={pages}
    />
  )
}
