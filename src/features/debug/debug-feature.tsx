import { useApp } from '@core/app-provider/app-provider.tsx'
import { useCluster } from '@features/cluster/cluster-data-access.tsx'
import { Text } from '@mantine/core'
import { IconBug } from '@tabler/icons-react'
import { UiDebug, UiPage } from '@ui'
import React from 'react'

export function DebugFeature() {
  const cluster = useCluster()
  const appData = useApp()
  return (
    <UiPage title="Debug" leftAction={<IconBug />}>
      <Text size="lg" fw="bold">
        App Data
      </Text>
      <UiDebug data={appData} open hideButton />
      <Text size="lg" fw="bold">
        Cluster
      </Text>
      <UiDebug data={cluster} open hideButton />
    </UiPage>
  )
}
