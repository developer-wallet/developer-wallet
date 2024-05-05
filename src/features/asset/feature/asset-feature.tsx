import { CoreShellPage } from '@core'
import { useKeypair } from '@features/keypair'
import { IconMoneybag } from '@tabler/icons-react'
import { UiPage, UiWarning } from '@ui'
import { AssetFeatureDetail } from './asset-feature-detail'

const FEATURE_ID = 'asset'
const FEATURE_TITLE = 'Asset'
const FEATURE_ICON = <IconMoneybag />

export const FEATURE_PAGE_ASSET: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <AssetFeature />,
}

function AssetFeature() {
  const { keypair } = useKeypair()

  return (
    <UiPage title={FEATURE_TITLE} leftAction={FEATURE_ICON}>
      {keypair ? (
        <AssetFeatureDetail publicKey={keypair.publicKey} />
      ) : (
        <UiWarning title="No keypair found" message={<div>You need to add a keypair to use this feature</div>} />
      )}
    </UiPage>
  )
}
