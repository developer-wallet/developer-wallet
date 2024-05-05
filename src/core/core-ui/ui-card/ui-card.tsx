import { Box, Paper, PaperProps, Skeleton, Stack } from '@mantine/core'
import { useUiBreakpoints } from '../ui-theme'
import { ReactNode } from 'react'
import { UiCardTitle } from './ui-card-title'

interface UiCardProps extends PaperProps {
  children?: ReactNode
  loading?: boolean
  title?: ReactNode
}

export function UiCard({ loading, title, ...props }: UiCardProps) {
  const { isSm } = useUiBreakpoints()

  return (
    <Paper p={isSm ? 'xs' : 'md'} withBorder {...props}>
      <Stack gap={isSm ? 'xs' : 'md'}>
        {title ? <Box>{typeof title === 'string' ? <UiCardTitle>{title}</UiCardTitle> : title}</Box> : null}
        {props.children ? loading ? <Skeleton visible={loading}>{props.children}</Skeleton> : props.children : null}
      </Stack>
    </Paper>
  )
}
