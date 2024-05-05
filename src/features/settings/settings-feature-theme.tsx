import { SettingsFeatureThemeColors, SettingsFeatureThemeColorScheme } from '@features/settings'
import { DEFAULT_THEME } from '@mantine/core'
import { IconPaint } from '@tabler/icons-react'
import { UiPage, useUi } from '@ui'
import { ReactNode } from 'react'

export function SettingsFeatureTheme({ leftAction }: { leftAction?: ReactNode }) {
  const { allColors, color, setColor, colorScheme, setColorScheme } = useUi()
  const colorMap = allColors.map((colors) => ({ label: colors, value: DEFAULT_THEME.colors[colors][6] }))

  return (
    <UiPage title="Theme" leftAction={leftAction ?? <IconPaint />}>
      <SettingsFeatureThemeColorScheme />
      <SettingsFeatureThemeColors />
    </UiPage>
  )
}
