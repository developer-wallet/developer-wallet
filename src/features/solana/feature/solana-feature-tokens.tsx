import { SolanaTokenAccountResult, SolanaUiTokenTable, useGetTokenAccounts } from '@features/solana'
import { ActionIcon, Text } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { UiError, UiGroup, UiLoader, UiStack } from '@ui'
import { useMemo, useState } from 'react'

export function SolanaFeatureTokens({ address }: { address: PublicKey }) {
  const [showAll, setShowAll] = useState(false)
  const query = useGetTokenAccounts({ address })
  const client = useQueryClient()
  const items: SolanaTokenAccountResult = useMemo(
    () => (showAll ? query.data : query.data?.slice(0, 5)) ?? [],
    [query.data, showAll],
  )

  async function refresh() {
    await query.refetch()
    await client.invalidateQueries({ queryKey: ['getTokenAccountBalance'] })
  }

  return (
    <div>
      <UiStack>
        <UiGroup>
          <Text size="xl">Token Accounts</Text>
          <ActionIcon loading={query.isLoading} variant="outline" onClick={refresh}>
            <IconRefresh size={16} />
          </ActionIcon>
        </UiGroup>
        {query.isSuccess ? (
          <SolanaUiTokenTable items={items} setShowAll={setShowAll} showAll={showAll} />
        ) : query.isError ? (
          <UiError title="An error occurred" message={`Error: ${query.error}`} />
        ) : query.isLoading ? (
          <UiLoader />
        ) : (
          <UiError title="An error occurred" message={`Unknown error`} />
        )}
      </UiStack>
    </div>
  )
}
