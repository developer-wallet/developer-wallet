import { ellipsify } from '@core'
import { useKeypair } from '@features/keypair'
import { Anchor, Group, Text, TextProps } from '@mantine/core'
import { UiCopy } from '@ui'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { AppLabel } from './label-types'

export interface AppLabelProviderContext {
  labels: AppLabel[]
  labelMap: Map<string, AppLabel>
  getLabel: (publicKey: string) => AppLabel | undefined
}

const Context = createContext<AppLabelProviderContext>({} as AppLabelProviderContext)

const defaultLabels: AppLabel[] = [
  { publicKey: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', name: 'Token' },
  { publicKey: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', name: 'Token 2022' },
]

export function LabelProvider({ children }: { children: ReactNode }) {
  const { keypairs } = useKeypair()

  const keypairLabels = useMemo(
    () => keypairs.map((i) => ({ publicKey: i.publicKey.toString(), name: i.name })),
    [keypairs],
  )

  const labels = useMemo(
    () => [
      // Add more label sources here
      ...defaultLabels,
      ...keypairLabels,
    ],
    [keypairLabels],
  )

  const labelMap = useMemo(() => new Map<string, AppLabel>(labels.map((i) => [i.publicKey, i])), [labels])

  const value: AppLabelProviderContext = {
    labels,
    labelMap,
    getLabel: (publicKey: string) => labelMap.get(publicKey),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLabel() {
  return useContext(Context)
}

export function RenderLabel({ publicKey, ...props }: TextProps & { publicKey: string }) {
  const { getLabel } = useLabel()

  return <Text {...props}>{getLabel(publicKey)?.name ?? ellipsify(publicKey)}</Text>
}

export function AppLabelLink({ publicKey, to }: { publicKey: string; to?: string }) {
  return (
    <Anchor href={to}>
      <Group gap="xs" align="center">
        <UiCopy text={publicKey} />
        <RenderLabel publicKey={publicKey} />
      </Group>
    </Anchor>
  )
}
