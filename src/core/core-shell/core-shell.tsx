import { AppShell, Flex, Tabs, Text } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { UiLoader } from '@ui'
import { ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

export interface CoreShellPage {
  path: string
  label: string
  leftSection: ReactNode
  element: ReactNode
}

export interface CoreShellProps {
  header?: ReactNode
  pages: CoreShellPage[]
}

export function CoreShell({ header, pages }: CoreShellProps) {
  const { width } = useViewportSize()
  const isSmall = width < 400
  const navigate = useNavigate()
  const basePath = ''
  const location = useLocation()
  // Set the active tab based on matching the location pathname with the tab path
  const activeTab = pages.find((tab) => location.pathname.includes(`/${tab.path}`))?.path
  // Set default redirect route to the first tab
  const redirect = pages.length && pages[0].path !== '' ? pages[0].path : undefined

  const main = (
    <Suspense fallback={<UiLoader />}>
      <Routes>
        {redirect ? <Route index element={<Navigate replace to={`./${redirect}`} />} /> : null}
        {pages.map((page) => (
          <Route key={page.path} path={`${page.path}/*`} element={page.element} />
        ))}
        <Route path="*" element={<Navigate replace to={`./${redirect}`} />} />
      </Routes>
    </Suspense>
  )

  const footer = (
    <Tabs
      variant="default"
      value={activeTab}
      onChange={(value) => navigate(`${basePath ? `${basePath}/${value}` : value}`)}
      inverted
      styles={{ list: { height: isSmall ? '80px' : undefined } }}
    >
      <Tabs.List grow>
        {pages.map((tab) => (
          <Tabs.Tab key={tab.path} value={tab.path} leftSection={isSmall ? undefined : tab.leftSection}>
            {isSmall ? (
              <Flex align="center" direction="column" gap={4}>
                {tab.leftSection}
                <Text>{tab.label}</Text>
              </Flex>
            ) : (
              <Text>{tab.label}</Text>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  )

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>{header}</AppShell.Header>
      <AppShell.Main
        style={{
          height: 'calc(100% - 120px)',
          overflow: 'auto',
          paddingBottom: 60,
        }}
      >
        {main}
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>{footer}</AppShell.Footer>
    </AppShell>
  )
}
