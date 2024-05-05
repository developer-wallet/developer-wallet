import { CoreShellPage } from '@core'
import { useKeypair } from '@features/keypair'
import { IconActivity } from '@tabler/icons-react'
import { UiPage, UiWarning } from '@ui'
import { ActivityFeatureDetail } from './activity-feature-detail.tsx'

export const ACTIVITY_FEATURE_ID = 'activity'
export const ACTIVITY_FEATURE_TITLE = 'Activity'
export const ACTIVITY_FEATURE_ICON = <IconActivity />
export const ACTIVITY_FEATURE_PAGE: CoreShellPage = {
  path: ACTIVITY_FEATURE_ID,
  label: ACTIVITY_FEATURE_TITLE,
  leftSection: ACTIVITY_FEATURE_ICON,
  element: <ActivityFeature />,
}

function ActivityFeature() {
  const { keypair } = useKeypair()
  return (
    <UiPage title={ACTIVITY_FEATURE_TITLE} leftAction={ACTIVITY_FEATURE_ICON}>
      {keypair ? (
        <ActivityFeatureDetail publicKey={keypair.publicKey} />
      ) : (
        <UiWarning title="No keypair found" message={<div>You need to add a keypair to use this feature</div>} />
      )}
    </UiPage>
  )
}
