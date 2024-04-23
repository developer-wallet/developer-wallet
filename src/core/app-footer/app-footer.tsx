import { useMantineTheme } from '@mantine/core'
import { UiGroup } from '@ui/ui-group'
import { UiLogo } from '@ui/ui-logo'
import { useUiColorScheme } from '@ui/ui-theme'
import { UiThemeSwitch } from '@ui/ui-theme-switch'

export function AppFooter() {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[9] : colors.gray[1]

  return (
    <UiGroup p="xs" bg={bg}>
      <UiLogo height={28} />
      <UiThemeSwitch />
    </UiGroup>
  )
}
