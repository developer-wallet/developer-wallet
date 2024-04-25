import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconLayoutSidebarRightInactive } from '@tabler/icons-react'
import { browser } from 'wxt/browser'

export function AppHeaderSidebar(props: ActionIconProps) {
  async function openSidePanel() {
    const window = await browser.windows.getCurrent()
    const windowId = window.id

    if (!windowId) throw new Error('Window id is not found')
    if (!(browser as { sidePanel?: unknown }).sidePanel) throw new Error('Side panel is not supported')

    return (browser as unknown as { sidePanel: { open: (options: { windowId: number }) => void } }).sidePanel.open({
      windowId: windowId,
    })
  }

  return (
    <ActionIcon onClick={() => openSidePanel().then(() => window.close())} size="lg" variant="light" {...props}>
      <IconLayoutSidebarRightInactive />
    </ActionIcon>
  )
}
