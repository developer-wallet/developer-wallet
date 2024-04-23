import { AssetFeatureDetail } from '@features/asset/asset-feature-detail.tsx'
import { useKeypair } from '@features/keypair/data-access'
import { IconMoneybag } from '@tabler/icons-react'
import { UiPage } from '@ui'

export function AssetFeature() {
  const { keypair } = useKeypair()
  return (
    <UiPage title="Assets" leftAction={<IconMoneybag />}>
      {keypair ? <AssetFeatureDetail keypair={keypair} /> : null}
    </UiPage>
  )
}
