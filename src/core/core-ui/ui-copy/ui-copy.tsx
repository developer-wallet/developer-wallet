import { ActionIcon, ActionIconProps, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export function UiCopy({ text, tooltip, ...props }: ActionIconProps & { text: string; tooltip?: string }) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : tooltip ?? 'Copy'} withArrow position="top">
          <ActionIcon variant="light" size="sm" color={copied ? 'green' : 'brand'} onClick={copy} {...props}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}
