import { PopupLayout } from '@core/core-layouts/popup/popup-layout.tsx'
import { CoreProvider } from '@core/core-provider/core-provider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CoreProvider>
      <PopupLayout />
    </CoreProvider>
  </React.StrictMode>,
)
