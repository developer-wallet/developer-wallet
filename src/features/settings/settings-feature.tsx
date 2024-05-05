import { CoreShellPage } from '@core'
import { ClusterFeature } from '@features/cluster'
import { DebugFeature } from '@features/debug/debug-feature.tsx'
import { KeypairFeature } from '@features/keypair/feature/keypair-feature.tsx'
import { NavLink } from '@mantine/core'
import { IconBug, IconChevronRight, IconKey, IconPaint, IconServer, IconSettings } from '@tabler/icons-react'
import { UiBack, UiPage } from '@ui'
import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { SettingsFeatureTheme } from './settings-feature-theme.tsx'

export const SETTINGS_FEATURE_ID = 'settings'
export const SETTINGS_FEATURE_TITLE = 'Settings'
export const SETTINGS_FEATURE_ICON = <IconSettings />
export const SETTINGS_FEATURE_PAGE: CoreShellPage = {
  path: SETTINGS_FEATURE_ID,
  label: SETTINGS_FEATURE_TITLE,
  leftSection: SETTINGS_FEATURE_ICON,
  element: <SettingsFeature />,
}

function SettingsFeature() {
  const back = <UiBack to="/settings" />
  const pages = [
    { path: 'keypairs', label: 'Keypairs', leftSection: <IconKey />, element: <KeypairFeature leftAction={back} /> },
    { path: 'clusters', label: 'Clusters', leftSection: <IconServer />, element: <ClusterFeature leftAction={back} /> },
    { path: 'theme', label: 'Theme', leftSection: <IconPaint />, element: <SettingsFeatureTheme leftAction={back} /> },
    { path: 'debug', label: 'Debug', leftSection: <IconBug />, element: <DebugFeature leftAction={back} /> },
  ]
  const index = (
    <UiPage title="Settings" leftAction={<IconSettings />}>
      {pages.map((item) => (
        <NavLink
          key={item.path}
          component={Link}
          to={`/settings/${item.path}`}
          label={item.label}
          leftSection={item.leftSection}
          rightSection={<IconChevronRight />}
        />
      ))}
    </UiPage>
  )
  return useRoutes([
    { index: true, element: index },
    ...pages.map((page) => ({ path: `/${page.path}`, element: page.element })),
  ])
}
