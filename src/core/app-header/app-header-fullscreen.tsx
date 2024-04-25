import { useAppPages } from '@core/app-provider/app-provider.tsx'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconMaximize } from '@tabler/icons-react'

export function AppHeaderFullscreen(props: ActionIconProps) {
  const { fullscreen } = useAppPages()

  return (
    <ActionIcon component="a" href={fullscreen} target="fullscreen" size="lg" variant="light" {...props}>
      <IconMaximize />
    </ActionIcon>
  )
}
