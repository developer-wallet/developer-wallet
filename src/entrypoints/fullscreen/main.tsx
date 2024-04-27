import { FullscreenLayout } from '@core/core-layouts/fullscreen/fullscreen-layout.tsx'
import { CoreProvider } from '@core/core-provider/core-provider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CoreProvider>
      <FullscreenLayout />
    </CoreProvider>
  </React.StrictMode>,
)
