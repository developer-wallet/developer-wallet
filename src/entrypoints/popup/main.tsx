import { CoreProvider, PopupLayout } from '@core'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoreProvider>
      <PopupLayout />
    </CoreProvider>
  </StrictMode>,
)
