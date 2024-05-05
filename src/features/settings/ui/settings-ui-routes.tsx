import { CoreShellPage } from '@core'
import { SettingsUiIndex } from '@features/settings'
import { useRoutes } from 'react-router-dom'

export function SettingsUiRoutes({
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
  return useRoutes([
    { index: true, element: <SettingsUiIndex pages={pages} title={title} path={path} leftAction={leftAction} /> },
    ...pages.map((page) => ({
      path: `/${page.path}`,
      element: page.element,
    })),
  ])
}
