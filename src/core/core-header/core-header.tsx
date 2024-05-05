import { CoreHeaderSettings } from '@core/core-header/core-header-settings.tsx'
import { Anchor, Group, useMantineTheme } from '@mantine/core'
import { UiLogoType } from '@ui/ui-logo'
import { useUiColorScheme } from '@ui/ui-theme'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function CoreHeader({ action }: { action?: ReactNode }) {
  const { colors } = useMantineTheme()
  const { colorScheme } = useUiColorScheme()
  const bg = colorScheme === 'dark' ? colors.dark[9] : colors.gray[1]

  return (
    <Group justify="space-between" align="center" h="100%" px="sm" bg={bg}>
      <Anchor component={Link} to="/" display="flex">
        <UiLogoType height={28} />
      </Anchor>
      <Group gap="xs">
        {action}
        <CoreHeaderSettings />
      </Group>
    </Group>
  )
}
