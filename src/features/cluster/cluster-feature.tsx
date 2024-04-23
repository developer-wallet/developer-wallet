import { IconServer } from '@tabler/icons-react'
import { UiPage } from '@ui'

import { ClusterUiModal, ClusterUiTable } from './cluster-ui'

export function ClusterFeature() {
  return (
    <UiPage title="Clusters" leftAction={<IconServer />}>
      <ClusterUiTable />
      <ClusterUiModal />
    </UiPage>
  )
}
