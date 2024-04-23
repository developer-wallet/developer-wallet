import { Table, TableProps } from '@mantine/core'
import { ReactNode } from 'react'

export type UiInfoItem = [ReactNode, ReactNode] | undefined
export type UiInfoItems = UiInfoItem[]
export type UiInfoTableProps = TableProps & { items: UiInfoItems; tdw?: string }

export function UiInfoTable({ items, tdw = '25%', ...props }: UiInfoTableProps) {
  const filtered = items.filter(Boolean) as [ReactNode, ReactNode][]
  if (!filtered.length) return null
  return (
    <Table {...props}>
      <Table.Tbody>
        {filtered.map(([key, value], index) => (
          <Table.Tr key={index}>
            <Table.Td w={tdw}>{key}</Table.Td>
            <Table.Th>{value}</Table.Th>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
