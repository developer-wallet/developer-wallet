import './popup-layout.css'
import { CoreHeader, CoreShell } from '@core'
import { FEATURE_PAGE_ACTIVITY } from '@features/activity'
import { FEATURE_PAGE_ASSET } from '@features/asset'
import { FEATURE_PAGE_SETTINGS } from '@features/settings'

export function PopupLayout() {
  return (
    <CoreShell
      header={<CoreHeader withFullscreen withSidebar />}
      pages={[FEATURE_PAGE_ASSET, FEATURE_PAGE_ACTIVITY, FEATURE_PAGE_SETTINGS]}
    />
  )
}
