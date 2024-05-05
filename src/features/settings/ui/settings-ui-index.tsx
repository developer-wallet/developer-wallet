import { CoreShellPage } from '@core'
import { NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { UiPage } from '@ui'
import { Link } from 'react-router-dom'

export function SettingsUiIndex({
  pages,
  title,
  path,
  leftAction,
}: {
  pages: CoreShellPage[]
  title: React.ReactNode
  path: string
  leftAction: React.ReactNode
}) {
  return (
    <UiPage title={title} leftAction={leftAction}>
      {pages.map((item) => (
        <NavLink
          key={item.path}
          component={Link}
          to={`/${path}/${item.path}`}
          label={item.label}
          leftSection={item.leftSection}
          rightSection={<IconChevronRight />}
        />
      ))}
    </UiPage>
  )
}
