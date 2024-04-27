import { useCore } from '@core/core-provider'
import { useCluster } from '@features/cluster'
import { Text } from '@mantine/core'
import { IconBug } from '@tabler/icons-react'
import { UiDebug, UiPage } from '@ui'
import React from 'react'

export function DebugFeature() {
  const cluster = useCluster()
  const appData = useCore()
  return (
    <UiPage title="Debug" leftAction={<IconBug />}>
      <Text size="lg" fw="bold">
        App Data
      </Text>
      <UiDebug data={appData} open hideButton />
      <Text size="lg" fw="bold">
        Cluster
      </Text>
      <UiDebug data={cluster.cluster} open hideButton />
    </UiPage>
  )
}
