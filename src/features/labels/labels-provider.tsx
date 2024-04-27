import { ellipsify } from '@core/core-helpers'
import { useKeypair } from '@features/keypair/data-access'
import { Anchor, Group, Text, TextProps } from '@mantine/core'
import { UiCopy } from '@ui'
import { createContext, ReactNode, useContext, useMemo } from 'react'

export interface AppLabel {
  name: string
  publicKey: string
}

export interface AppLabelsProviderContext {
  labels: AppLabel[]
  labelMap: Map<string, AppLabel>
  getLabel: (publicKey: string) => AppLabel | undefined
}

const Context = createContext<AppLabelsProviderContext>({} as AppLabelsProviderContext)

const defaultLabels: AppLabel[] = [
  { publicKey: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', name: 'Token' },
  { publicKey: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', name: 'Token 2022' },
]

export function LabelsProvider({ children }: { children: ReactNode }) {
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

  const value: AppLabelsProviderContext = {
    labels,
    labelMap,
    getLabel: (publicKey: string) => labelMap.get(publicKey),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLabels() {
  return useContext(Context)
}

export function RenderLabel({ publicKey, ...props }: TextProps & { publicKey: string }) {
  const { getLabel } = useLabels()

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
