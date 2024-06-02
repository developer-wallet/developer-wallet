import { CoreProvider } from '@core'
import { ExplorerRoutes } from '@features/explorer/feature/explorer-routes.tsx'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider>
      <ExplorerRoutes />
    </CoreProvider>
  </StrictMode>,
)
