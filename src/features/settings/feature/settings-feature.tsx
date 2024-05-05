import { CoreShellPage } from '@core'
import { FEATURE_PAGE_SETTINGS_CLUSTER } from '@features/cluster'
import { FEATURE_PAGE_SETTINGS_DEBUG } from '@features/debug'
import { FEATURE_PAGE_SETTINGS_KEYPAIR } from '@features/keypair'
import { FEATURE_PAGE_SETTINGS_THEME } from '@features/theme'
import { IconSettings } from '@tabler/icons-react'
import { SettingsUiRoutes } from '../ui'

const FEATURE_ID = 'settings'
const FEATURE_TITLE = 'Settings'
const FEATURE_ICON = <IconSettings />

export const FEATURE_PAGE_SETTINGS: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <SettingsFeature />,
}

function SettingsFeature() {
  return (
    <SettingsUiRoutes
      title={FEATURE_TITLE}
      path={FEATURE_ID}
      leftAction={FEATURE_ICON}
      pages={[
        FEATURE_PAGE_SETTINGS_CLUSTER,
        FEATURE_PAGE_SETTINGS_KEYPAIR,
        FEATURE_PAGE_SETTINGS_THEME,
        FEATURE_PAGE_SETTINGS_DEBUG,
      ]}
    />
  )
}
