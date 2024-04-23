import { IconSettings } from '@tabler/icons-react'
import { UiInfo, UiPage } from '@ui'
import React from 'react'

export function SettingsFeature() {
  return (
    <UiPage title="Settings" leftAction={<IconSettings />}>
      <UiInfo title="TBD" message="This is under construction" />
    </UiPage>
  )
}
