import { CoreProvider, SidepanelLayout } from '@core'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider>
      <SidepanelLayout />
    </CoreProvider>
  </StrictMode>,
)
