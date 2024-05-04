import { ClusterFeature } from '@features/cluster'
import { SettingsPageKeypairs } from '@features/settings/settings-page-keypairs.tsx'
import { SettingsPage } from '@features/settings/settings-page.tsx'
import { ActionIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

export function SettingsFeature() {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="keypairs" element={<SettingsPageKeypairs />} />
      <Route
        path="clusters"
        element={
          <ClusterFeature
            leftAction={
              <ActionIcon color="brand" size="sm" variant="light" component={Link} to={`/settings`}>
                <IconArrowLeft />
              </ActionIcon>
            }
          />
        }
      />
    </Routes>
  )
}
