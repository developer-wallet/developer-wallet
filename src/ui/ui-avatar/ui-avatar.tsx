import { Avatar, AvatarProps, Tooltip } from '@mantine/core'
import { getColorByIndex, getIntFromString } from '../ui-helpers'

export type UiAvatarProps = Omit<AvatarProps, 'src'> & {
  url?: string | null
  name?: string | null
  tooltipLabel?: string
}

export function UiAvatar({ url, name, tooltipLabel, ...props }: UiAvatarProps) {
  const firstLetter = name?.charAt(0) ?? '?'

  const content = url?.length ? (
    <Avatar radius={100} src={url} alt={`${name} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getIntFromString(name ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )

  return tooltipLabel ? (
    <Tooltip label={tooltipLabel} withArrow>
      {content}
    </Tooltip>
  ) : (
    content
  )
}
