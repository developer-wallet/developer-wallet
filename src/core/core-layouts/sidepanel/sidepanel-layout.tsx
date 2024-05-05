import './sidepanel-layout.css'
import { CoreHeader, CoreShell } from '@core'
import { ACTIVITY_FEATURE_PAGE } from '@features/activity'
import { ASSET_FEATURE_PAGE } from '@features/asset'
import { SETTINGS_FEATURE_PAGE } from '@features/settings/settings-feature.tsx'

export function SidepanelLayout() {
  return (
    <CoreShell
      header={<CoreHeader withFullscreen />}
      pages={[ASSET_FEATURE_PAGE, ACTIVITY_FEATURE_PAGE, SETTINGS_FEATURE_PAGE]}
    />
  )
}
