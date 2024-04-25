import { AppProvider } from '@core/app-provider/app-provider.tsx'
import { SidepanelLayout } from '@core/layouts/sidepanel/sidepanel-layout.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <SidepanelLayout />
    </AppProvider>
  </React.StrictMode>,
)
