import { Stack, StackProps } from '@mantine/core'
import { ReactNode } from 'react'
import { useUiBreakpoints } from '../ui-theme'

export interface UiStackProps extends StackProps {
  children: ReactNode
}

export function UiStack({ children, ...props }: UiStackProps) {
  const { isSm } = useUiBreakpoints()
  return (
    <Stack gap={isSm ? 'xs' : 'md'} {...props}>
      {children}
    </Stack>
  )
}
