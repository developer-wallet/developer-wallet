import { ellipsify } from '@core/core-helpers'
import { ClusterUiExplorerLink } from '@features/cluster'
import { Badge, Button, Table } from '@mantine/core'
import { ConfirmedSignatureInfo } from '@solana/web3.js'
import { UiInfo, UiTime } from '@ui'

export function SolanaUiTransactionTable({
  items,
  setShowAll,
  showAll,
}: {
  items: ConfirmedSignatureInfo[]
  setShowAll: (showAll: boolean) => void
  showAll: boolean
}) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Signature</Table.Th>
          <Table.Th align="right">Slot</Table.Th>
          <Table.Th style={{ textWrap: 'nowrap' }}>Block Time</Table.Th>
          <Table.Th ta="right">Result</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {items.length ? (
          items?.map((item) => (
            <Table.Tr key={item.signature}>
              <Table.Th>
                <ClusterUiExplorerLink
                  ff="monospace"
                  path={`tx/${item.signature}`}
                  label={ellipsify(item.signature, 8)}
                />
              </Table.Th>
              <Table.Td>
                <ClusterUiExplorerLink ff="monospace" path={`block/${item.slot}`} label={item.slot.toString()} />
              </Table.Td>
              <Table.Td>
                <UiTime date={new Date((item.blockTime ?? 0) * 1000)} />
              </Table.Td>
              <Table.Td align="right">
                {item.err ? (
                  <Badge color="red" title={JSON.stringify(item.err)}>
                    Failed
                  </Badge>
                ) : (
                  <Badge color="green">Success</Badge>
                )}
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={4} align="center">
              <UiInfo
                message={'Transactions will appear here when you send or receive tokens.'}
                title={'No transactions found.'}
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
