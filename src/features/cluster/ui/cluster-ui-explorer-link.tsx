import { useCluster } from '@features/cluster'
import { Anchor, AnchorProps, Group } from '@mantine/core'
import { UiCopy } from '@ui'
import React, { ReactNode } from 'react'

export function ClusterUiExplorerLink({
  copy,
  path,
  label = 'View on Explorer',
  ...props
}: { path: string; copy?: string; label?: ReactNode } & AnchorProps) {
  const { getExplorerUrl } = useCluster()
  return (
    <Group align="start" gap={4} wrap="nowrap">
      {copy ? <UiCopy text={copy} /> : null}
      <Anchor href={getExplorerUrl(path)} target="_blank" rel="noopener noreferrer" {...props}>
        {label}
      </Anchor>
    </Group>
  )
}
