import { useMantineTheme } from '@mantine/core'
import { UiGroup } from '@ui/ui-group'
import { UiLogoType } from '@ui/ui-logo'
import { useUiColorScheme } from '@ui/ui-theme'
import { ReactNode } from 'react'

export function AppHeader({ action }: { action?: ReactNode }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[9] : colors.gray[1]

  return (
    <UiGroup p="xs" bg={bg}>
      <UiLogoType height={28} />
      {action}
    </UiGroup>
  )
}
