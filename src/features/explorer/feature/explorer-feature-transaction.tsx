import { ExplorerFeatureTransactionSignatureStatus } from '@features/explorer/feature/explorer-feature-transaction-signature-status.tsx'
import { UiPage, UiStack } from '@ui'
import { useParams } from 'react-router-dom'
import { ExplorerUiEnsureValidSignature } from '../ui/explorer-ui-ensure-valid-signature'

export function ExplorerFeatureTransaction() {
  const { signature } = useParams() as { signature: string }

  return (
    <UiPage title="Transaction ">
      <ExplorerUiEnsureValidSignature signature={signature}>
        <UiStack>
          <ExplorerFeatureTransactionSignatureStatus />
        </UiStack>
      </ExplorerUiEnsureValidSignature>
    </UiPage>
  )
}
