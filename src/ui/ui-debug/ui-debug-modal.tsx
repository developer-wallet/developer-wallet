import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconBug } from '@tabler/icons-react'
import { UiDebug } from './ui-debug'

export function handleDebugModalClick({ data, title }: { data: string | unknown; title?: string }) {
  return modals.open({
    size: 'lg',
    title: title ?? 'Debug',
    children: <UiDebug data={data} open hideButton />,
  })
}

export function UiDebugModal({ data, title, ...props }: ActionIconProps & { data: string | unknown; title?: string }) {
  return (
    <Tooltip label="Show debug data">
      <ActionIcon
        color="brand"
        variant="light"
        size="sm"
        onClick={() => handleDebugModalClick({ data, title })}
        {...props}
      >
        <IconBug size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
