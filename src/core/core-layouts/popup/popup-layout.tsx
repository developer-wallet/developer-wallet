import './popup-layout.css'
import { CoreHeader, CoreShell } from '@core'
import { ACTIVITY_FEATURE_PAGE } from '@features/activity'
import { ASSET_FEATURE_PAGE } from '@features/asset'
import { SETTINGS_FEATURE_PAGE } from '@features/settings'

export function PopupLayout() {
  return (
    <CoreShell
      header={<CoreHeader withFullscreen withSidebar />}
      pages={[ASSET_FEATURE_PAGE, ACTIVITY_FEATURE_PAGE, SETTINGS_FEATURE_PAGE]}
    />
  )
}
