import { rem, Switch, SwitchProps, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { useUiColorScheme } from '../ui-theme'

export function UiThemeSwitch(props: SwitchProps) {
  const theme = useMantineTheme()

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.brand[6]} />
  )
  const { toggleColorScheme, colorScheme } = useUiColorScheme()

  return (
    <Switch
      size="lg"
      color="dark.8"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={() => toggleColorScheme()}
      checked={colorScheme === 'dark'}
      {...props}
    />
  )
}
