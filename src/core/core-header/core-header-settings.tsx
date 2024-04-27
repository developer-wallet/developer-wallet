import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function CoreHeaderSettings(props: ActionIconProps) {
  return (
    <ActionIcon component={Link} to="/settings" size="lg" variant="light" {...props}>
      <IconSettings />
    </ActionIcon>
  )
}
