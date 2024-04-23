import { Box, Flex } from '@mantine/core'
import { ReactNode } from 'react'
import { AppFooter } from '../app-footer/app-footer.tsx'
import { AppHeader } from '../app-header/app-header.tsx'

export type AppLayoutType = 'fullscreen' | 'popup'

export function AppLayout({ children, type }: { children: ReactNode; type: AppLayoutType }) {
  return (
    <Flex h="100%" direction="column" gap="xs">
      <AppHeader type={type} />
      <Box component="main" style={{ flexGrow: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Flex>
  )
}
