import { CoreProvider, FullscreenLayout } from '@core'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider>
      <FullscreenLayout />
    </CoreProvider>
  </StrictMode>,
)
