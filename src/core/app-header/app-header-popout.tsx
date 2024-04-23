import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconLayoutDashboard } from '@tabler/icons-react'

export function AppHeaderPopout(props: ActionIconProps) {
  const location = window.location.href.replace('popup.html', 'fullscreen.html')
  return (
    <ActionIcon component="a" href={location} target="fullscreen" size="lg" variant="light" {...props}>
      <IconLayoutDashboard />
    </ActionIcon>
  )
}
