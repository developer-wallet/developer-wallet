import { Container, ContainerProps } from '@mantine/core'
import { ReactNode } from 'react'
import { useUiBreakpoints } from '../ui-theme'

export interface UiContainerProps extends ContainerProps {
  children: ReactNode
}

export function UiContainer({ children, ...props }: UiContainerProps) {
  const { isSm } = useUiBreakpoints()
  return (
    <Container fluid={isSm} size="xl" px={isSm ? 'xs' : undefined} py={isSm ? 'xs' : 'md'} {...props}>
      {children}
    </Container>
  )
}
