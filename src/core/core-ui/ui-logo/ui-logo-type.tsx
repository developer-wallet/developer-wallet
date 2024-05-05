import { UiLogoTypeDark, UiLogoTypeLight, useUi } from '@ui'
import { UiLogoProps } from './ui-logo-props'

export function UiLogoType(props: UiLogoProps = {}) {
  const { isDark } = useUi()

  return isDark ? <UiLogoTypeDark {...props} /> : <UiLogoTypeLight {...props} />
}
