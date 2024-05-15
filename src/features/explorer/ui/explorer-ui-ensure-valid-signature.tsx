import { ExplorerTransactionProvider } from '@features/explorer/data-access'
import { UiError } from '@ui'
// @ts-ignore
import * as bs58 from 'bs58'
import { ReactNode } from 'react'

export function ExplorerUiEnsureValidSignature({ children, signature }: { children: ReactNode; signature: string }) {
  try {
    const decoded = bs58.decode(signature)

    return decoded.length === 64 ? (
      <ExplorerTransactionProvider signature={signature}>{children}</ExplorerTransactionProvider>
    ) : (
      <UiError message="Invalid transaction signature" />
    )
  } catch (err) {
    return <UiError message="Error decoding transaction signature" />
  }
}
