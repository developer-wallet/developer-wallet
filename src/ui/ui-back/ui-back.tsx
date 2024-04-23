import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useUiTheme } from '../ui-theme'

export function UiBack({ to = '../', ...props }: ActionIconProps & { to?: string }) {
  const { Link } = useUiTheme()

  return (
    <ActionIcon color="brand" size="sm" variant="light" component={Link} to={to} {...props}>
      <IconArrowLeft />
    </ActionIcon>
  )
}
