import { Text, TextProps } from '@mantine/core'
import TimeAgo from 'timeago-react'

export interface UiTimeProps extends TextProps {
  date: Date
  prefix?: string
  suffix?: string
}

export function UiTime({ date, prefix, suffix, ...props }: UiTimeProps) {
  return (
    <Text {...props} title={date.toISOString()}>
      {prefix}
      <TimeAgo datetime={date} locale="en_US" />
      {suffix}
    </Text>
  )
}
