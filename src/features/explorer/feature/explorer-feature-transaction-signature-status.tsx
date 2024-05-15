import { useExplorerTransaction } from '@features/explorer/data-access'
import { UiDebug, UiLoader, UiWarning } from '@ui'

export function ExplorerFeatureTransactionSignatureStatus() {
  const { signatureStatus, signatureStatusLoading, signatureStatusError, info } = useExplorerTransaction()

  return signatureStatusLoading ? (
    <UiLoader />
  ) : signatureStatusError ? (
    <UiDebug data={signatureStatusError} open />
  ) : signatureStatus === null ? (
    <UiWarning message="Transaction not found" />
  ) : (
    <div>
      <UiDebug data={{ signatureStatus, info }} open />
    </div>
  )
}
