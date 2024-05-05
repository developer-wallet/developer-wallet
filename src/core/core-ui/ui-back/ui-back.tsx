import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function UiBack({ to = '../', ...props }: ActionIconProps & { to?: string }) {
  return (
    <ActionIcon color="brand" size="sm" variant="light" component={Link} to={to} {...props}>
      <IconArrowLeft />
    </ActionIcon>
  )
}
