import { CoreHeaderSettings } from '@core/core-header/core-header-settings.tsx'
import { Group, useMantineTheme } from '@mantine/core'
import { UiLogoType } from '@ui/ui-logo'
import { useUiColorScheme } from '@ui/ui-theme'
import React, { ReactNode } from 'react'

export function CoreHeader({ action }: { action?: ReactNode }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[9] : colors.gray[1]

  return (
    <Group justify="space-between" align="center" h="100%" px="sm" bg={bg}>
      <UiLogoType height={28} />
      <Group>
        {action}
        <CoreHeaderSettings />
      </Group>
    </Group>
  )
}
