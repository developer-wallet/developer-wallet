import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'
import { ExplorerHeader } from '../explorer-header'

export function ExplorerLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <ExplorerHeader />
      </AppShell.Header>
      <AppShell.Main
        style={{
          height: 'calc(100% - 120px)',
          overflow: 'auto',
          paddingBottom: 60,
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
