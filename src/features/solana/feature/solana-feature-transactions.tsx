import { SolanaUiTransactionTable, useGetSignatures } from '@features/solana'
import { ActionIcon, Text } from '@mantine/core'
import { ConfirmedSignatureInfo, PublicKey } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import { UiError, UiGroup, UiLoader, UiStack } from '@ui'
import { useMemo, useState } from 'react'

export function SolanaFeatureTransactions({ address }: { address: PublicKey }) {
  const query = useGetSignatures({ address })
  const [showAll, setShowAll] = useState(false)
  const items: ConfirmedSignatureInfo[] = useMemo(
    () => (showAll ? query.data : query.data?.slice(0, 5)) ?? [],
    [query.data, showAll],
  )

  return (
    <UiStack>
      <UiGroup>
        <Text size="xl">Transaction History</Text>
        <ActionIcon loading={query.isLoading} variant="outline" onClick={() => query.refetch()}>
          <IconRefresh size={16} />
        </ActionIcon>
      </UiGroup>
      {query.isSuccess ? (
        <SolanaUiTransactionTable items={items} setShowAll={setShowAll} showAll={showAll} />
      ) : query.isError ? (
        <UiError title="An error occurred" message={`Error: ${query.error}`} />
      ) : query.isLoading ? (
        <UiLoader />
      ) : (
        <UiError title="An error occurred" message={`Unknown error`} />
      )}
    </UiStack>
  )
}
