import { AppProvider } from '@core/app-provider/app-provider.tsx'
import { FullscreenLayout } from '@core/layouts/fullscreen/fullscreen-layout.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <FullscreenLayout />
    </AppProvider>
  </React.StrictMode>,
)
