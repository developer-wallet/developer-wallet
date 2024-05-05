import { useCorePages } from '@core'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconMaximize } from '@tabler/icons-react'

export function CoreHeaderFullscreen(props: ActionIconProps) {
  const { fullscreen } = useCorePages()

  return (
    <ActionIcon component="a" href={fullscreen} target="fullscreen" size="lg" variant="light" {...props}>
      <IconMaximize />
    </ActionIcon>
  )
}
