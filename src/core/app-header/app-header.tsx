import { AppHeaderPopout } from '@core/app-header/app-header-popout.tsx'
import { useMantineTheme } from '@mantine/core'
import { UiGroup } from '@ui/ui-group'
import { UiLogoType } from '@ui/ui-logo'
import { useUiColorScheme } from '@ui/ui-theme'
import { ReactNode } from 'react'
import { AppLayoutType } from '../app-layout/app-layout.tsx'

export function AppHeader({ action, type }: { action?: ReactNode; type: AppLayoutType }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[9] : colors.gray[1]

  return (
    <UiGroup p="xs" bg={bg}>
      <UiLogoType height={28} />
      {type === 'popup' ? <AppHeaderPopout /> : action}
    </UiGroup>
  )
}
