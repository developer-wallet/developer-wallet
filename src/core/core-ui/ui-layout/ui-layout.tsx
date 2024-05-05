import { AppShell, AppShellProps, Loader, rem } from '@mantine/core'
import { ReactNode, Suspense } from 'react'

export function UiLayout({
  children,
  header,
  headerHeight = rem(56),
  ...props
}: Omit<AppShellProps, 'header'> & { children: ReactNode; header: ReactNode; headerHeight?: string }) {
  return (
    <AppShell header={{ height: headerHeight }} padding="md" {...props}>
      <AppShell.Header>{header}</AppShell.Header>

      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
    </AppShell>
  )
}
