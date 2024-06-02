import { ClusterProvider } from '@features/cluster'
import { ExplorerProvider } from '@features/explorer/data-access'
import { ExplorerLayout } from '@features/explorer/ui'
import { Outlet } from 'react-router-dom'

export function ExplorerRoutesWrapper() {
  return (
    <ClusterProvider>
      <ExplorerProvider>
        <ExplorerLayout>
          <Outlet />
        </ExplorerLayout>
      </ExplorerProvider>
    </ClusterProvider>
  )
}
