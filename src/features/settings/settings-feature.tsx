import { ClusterFeature } from '@features/cluster'
import { DebugFeature } from '@features/debug/debug-feature.tsx'
import { KeypairFeature } from '@features/keypair/feature/keypair-feature.tsx'
import { NavLink } from '@mantine/core'
import { IconBug, IconChevronRight, IconKey, IconServer, IconSettings } from '@tabler/icons-react'
import { UiBack, UiPage } from '@ui'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

export function SettingsFeature() {
  const back = <UiBack to="/settings" />
  const pages = [
    { path: 'keypairs', label: 'Keypairs', leftSection: <IconKey />, element: <KeypairFeature leftAction={back} /> },
    { path: 'clusters', label: 'Clusters', leftSection: <IconServer />, element: <ClusterFeature leftAction={back} /> },
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
  return (
    <Routes>
      <Route index element={index} />
      {pages.map((page) => (
        <Route key={page.path} path={`${page.path}/*`} element={page.element} />
      ))}
    </Routes>
  )
}
