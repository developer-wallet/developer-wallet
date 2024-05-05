import { ellipsify } from '@core'
import { ClusterUiExplorerLink } from '@features/cluster'
import { SolanaTokenAccountResult } from '@features/solana'
import { Button, Table, Text } from '@mantine/core'
import { UiInfo } from '@ui'

export function SolanaUiTokenTable({
  items,
  setShowAll,
  showAll,
}: {
  items: SolanaTokenAccountResult
  setShowAll: (showAll: boolean) => void
  showAll: boolean
}) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Public Key</Table.Th>
          <Table.Th>Mint</Table.Th>
          <Table.Th ta="right">Balance</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.length ? (
          items?.map(({ account, pubkey }) => (
            <Table.Tr key={pubkey.toString()}>
              <Table.Td>
                <ClusterUiExplorerLink
                  ff="monospace"
                  label={ellipsify(pubkey.toString())}
                  path={`account/${pubkey.toString()}`}
                />
              </Table.Td>
              <Table.Td>
                <ClusterUiExplorerLink
                  ff="monospace"
                  label={ellipsify(account.data.parsed.info.mint)}
                  path={`account/${account.data.parsed.info.mint.toString()}`}
                />
              </Table.Td>
              <Table.Td align="right">
                <Text ff="mono">{account.data.parsed.info.tokenAmount.uiAmount}</Text>
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={4} align="center">
              <UiInfo
                message={'Token accounts will appear here when you send or receive tokens.'}
                title={'No token accounts found.'}
              />
            </Table.Td>
          </Table.Tr>
        )}
        {(items?.length ?? 0) > 5 && (
          <Table.Tr>
            <Table.Td colSpan={4} align="center">
              <Button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</Button>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  )
}
