import { CoreHeaderSettings } from '@core/core-header/core-header-settings.tsx'
import { Anchor, Group, useMantineTheme } from '@mantine/core'
import { UiLogo, UiLogoType, useUi, useUiBreakpoints } from '@ui'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function CoreHeader({ action }: { action?: ReactNode }) {
  const { colors } = useMantineTheme()
  const { isDark } = useUi()
  const { isSm } = useUiBreakpoints()
  const bg = isDark ? colors.dark[9] : colors.gray[1]

  return (
    <Group justify="space-between" align="center" h="100%" px="sm" bg={bg}>
      <Anchor component={Link} to="/" display="flex">
        {isSm ? <UiLogo height={28} /> : <UiLogoType height={28} />}
      </Anchor>
      <Group gap="xs">
        {action}
        <CoreHeaderSettings />
      </Group>
    </Group>
  )
}
