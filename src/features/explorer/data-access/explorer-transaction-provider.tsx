import { SignatureStatus, TransactionConfirmationStatus, TransactionError } from '@solana/web3.js'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useExplorer } from './explorer-provider'
import { useGetBlockTime, useGetSignatureStatus } from './use-get-signature-status'

export type Confirmations = number | 'max'

export type Timestamp = number | 'unavailable'

export interface ExplorerTransactionProviderContext {
  signature: string
  signatureStatusLoading: boolean
  signatureStatusError: Error | undefined
  signatureStatus: SignatureStatus | null
  info: {
    confirmationStatus: TransactionConfirmationStatus | null
    confirmations: Confirmations
    result: { err: TransactionError | null }
    slot: number | null
    timestamp: Timestamp | null
  }
}

const Context = createContext<ExplorerTransactionProviderContext>({} as ExplorerTransactionProviderContext)

export function ExplorerTransactionProvider({ children, signature }: { children: ReactNode; signature: string }) {
  const { setSearchQuery, searchQuery } = useExplorer()

  useEffect(() => {
    if (!signature && searchQuery === signature) return
    setSearchQuery(signature)
  }, [signature])

  const queryGetSignatureStatus = useGetSignatureStatus({ signature })
  const queryGetBlockTime = useGetBlockTime({ slot: queryGetSignatureStatus.data?.value?.slot })

  const signatureStatus = queryGetSignatureStatus.data?.value ?? null

  let confirmations: Confirmations
  if (typeof signatureStatus?.confirmations === 'number') {
    confirmations = signatureStatus?.confirmations
  } else {
    confirmations = 'max'
  }

  const value: ExplorerTransactionProviderContext = {
    signature,
    signatureStatusLoading: queryGetSignatureStatus.isLoading,
    signatureStatusError: queryGetSignatureStatus.error ?? undefined,
    signatureStatus: queryGetSignatureStatus.data?.value ?? null,
    info: {
      confirmationStatus: signatureStatus?.confirmationStatus ?? null,
      confirmations,
      result: { err: signatureStatus?.err ?? null },
      slot: signatureStatus?.slot ?? null,
      timestamp: queryGetBlockTime.data ?? null,
    },
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useExplorerTransaction() {
  return useContext(Context)
}
