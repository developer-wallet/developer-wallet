import { CoreShellPage } from '@core'
import { useKeypair } from '@features/keypair'
import { IconActivity } from '@tabler/icons-react'
import { UiPage, UiWarning } from '@ui'
import { ActivityFeatureDetail } from './activity-feature-detail'

const FEATURE_ID = 'activity'
const FEATURE_TITLE = 'Activity'
const FEATURE_ICON = <IconActivity />

export const FEATURE_PAGE_ACTIVITY: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <ActivityFeature />,
}

function ActivityFeature() {
  const { keypair } = useKeypair()
  return (
    <UiPage title={FEATURE_TITLE} leftAction={FEATURE_ICON}>
      {keypair ? (
        <ActivityFeatureDetail publicKey={keypair.publicKey} />
      ) : (
        <UiWarning title="No keypair found" message={<div>You need to add a keypair to use this feature</div>} />
      )}
    </UiPage>
  )
}
