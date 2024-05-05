import { CoreShellPage } from '@core'
import { useKeypair } from '@features/keypair'
import { IconMoneybag } from '@tabler/icons-react'
import { UiPage, UiWarning } from '@ui'
import { AssetFeatureDetail } from './asset-feature-detail'

export const ASSET_FEATURE_ID = 'asset'
export const ASSET_FEATURE_TITLE = 'Asset'
export const ASSET_FEATURE_ICON = <IconMoneybag />
export const ASSET_FEATURE_PAGE: CoreShellPage = {
  path: ASSET_FEATURE_ID,
  label: ASSET_FEATURE_TITLE,
  leftSection: ASSET_FEATURE_ICON,
  element: <AssetFeature />,
}

function AssetFeature() {
  const { keypair } = useKeypair()
  return (
    <UiPage title="Assets" leftAction={<IconMoneybag />}>
      {keypair ? (
        <AssetFeatureDetail publicKey={keypair.publicKey} />
      ) : (
        <UiWarning title="No keypair found" message={<div>You need to add a keypair to use this feature</div>} />
      )}
    </UiPage>
  )
}
