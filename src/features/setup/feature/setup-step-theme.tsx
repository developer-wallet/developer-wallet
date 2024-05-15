import { ThemeFeatureColors, ThemeFeatureColorScheme } from '@features/theme'
import { UiStack } from '@ui'

export function SetupStepTheme() {
  return (
    <UiStack>
      <ThemeFeatureColorScheme />
      <ThemeFeatureColors />
    </UiStack>
  )
}
