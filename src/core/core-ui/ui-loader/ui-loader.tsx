import { Flex, Loader, LoaderProps } from '@mantine/core'

export function UiLoader({
  size = 'xl',
  type = 'oval',
  flex = 'inline',
  ...props
}: LoaderProps & {
  flex?: 'full' | 'inline'
}) {
  return (
    <Flex h={flex === 'full' ? '100vh' : '100%'} justify="center" align="center">
      <Loader size={size} type={type} {...props} />
    </Flex>
  )
}
