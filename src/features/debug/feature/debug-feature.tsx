import { CoreShellPage, useCore } from '@core'
import { useCluster } from '@features/cluster'
import { useKeypair } from '@features/keypair'
import { Text } from '@mantine/core'
import { IconBug } from '@tabler/icons-react'
import { UiBack, UiDebug, UiPage, useUi } from '@ui'

const FEATURE_ID = 'debug'
const FEATURE_TITLE = 'Debug'
const FEATURE_ICON = <IconBug />

export const FEATURE_PAGE_SETTINGS_DEBUG: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <DebugFeature />,
}

function DebugFeature() {
  const { cluster, clusters } = useCluster()
  const { keypair, keypairs } = useKeypair()
  const { color, colorScheme } = useUi()
  const appData = useCore()

  return (
    <UiPage title={FEATURE_TITLE} leftAction={<UiBack to={`/settings`} />}>
      <Text size="lg" fw="bold">
        App Data
      </Text>
      <UiDebug data={appData} />
      <Text size="lg" fw="bold">
        Cluster
      </Text>
      <UiDebug data={{ clusters, cluster }} />
      <Text size="lg" fw="bold">
        Color
      </Text>
      <UiDebug data={{ color, colorScheme }} />
      <Text size="lg" fw="bold">
        Keypair
      </Text>
      <UiDebug data={{ keypair, keypairs }} />
    </UiPage>
  )
}
