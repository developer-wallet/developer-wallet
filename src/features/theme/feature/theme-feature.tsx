import { CoreShellPage } from '@core'
import { ThemeFeatureColors, ThemeFeatureColorScheme } from '@features/theme'
import { IconPaint } from '@tabler/icons-react'
import { UiBack, UiPage } from '@ui'

const FEATURE_ID = 'theme'
const FEATURE_TITLE = 'Theme'
const FEATURE_ICON = <IconPaint />

export const FEATURE_PAGE_SETTINGS_THEME: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <ThemeFeature />,
}

function ThemeFeature() {
  return (
    <UiPage title={FEATURE_TITLE} leftAction={<UiBack to={`/settings`} />}>
      <ThemeFeatureColorScheme />
      <ThemeFeatureColors />
    </UiPage>
  )
}
