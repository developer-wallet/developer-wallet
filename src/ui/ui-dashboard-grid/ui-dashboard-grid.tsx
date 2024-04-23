import { SimpleGrid, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { ComponentType } from 'react'
import { getColorByIndex } from '../ui-helpers'
import { useUiTheme } from '../ui-theme'
import classes from './ui-dashboard-grid.module.css'

export interface UiDashboardItem {
  icon: ComponentType<{ color?: string; size: number | string }>
  label: string
  to: string
  color?: string
}

export interface UiDashboardGridProps {
  links: UiDashboardItem[]
}

export function UiDashboardGrid({ links }: UiDashboardGridProps) {
  const { Link } = useUiTheme()
  const theme = useMantineTheme()

  const items = links.map((item, index) => (
    <UnstyledButton component={Link} to={item.to} key={item.label} className={classes.item}>
      <item.icon color={theme.colors[item.color ?? getColorByIndex(index)][6]} size={64} />
      <Text size="lg" mt={7} c={theme.colors[item.color ?? getColorByIndex(index)][6]}>
        {item.label}
      </Text>
    </UnstyledButton>
  ))

  return (
    <SimpleGrid cols={{ xs: 1, sm: 2, md: 3 }} spacing={{ base: 'sm', md: 'xl' }} px="md">
      {items}
    </SimpleGrid>
  )
}
