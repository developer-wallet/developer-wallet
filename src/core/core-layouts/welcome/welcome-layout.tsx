import { SetupFeature } from '@features/setup'
import { Flex } from '@mantine/core'

export function WelcomeLayout() {
  return (
    <Flex h="100vh" justify="center" align="center">
      <SetupFeature />
    </Flex>
  )
}
