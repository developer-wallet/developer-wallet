import { Tabs, TabsProps } from '@mantine/core'
import { ComponentType, ReactNode } from 'react'

export interface AppTab {
  id: string
  label: string
  icon: ComponentType<{ color?: string; size?: number | string }>
  panel: ReactNode
}

export function AppTabs({ tabs, ...props }: TabsProps & { tabs: AppTab[] }) {
  const isVertical = props.orientation === 'vertical'
  const content = tabs.map((tab) => (
    <Tabs.Panel style={{ height: `calc(100% - 46px)` }} key={tab.id} value={tab.id}>
      {tab.panel}
    </Tabs.Panel>
  ))

  const nav = (
    <Tabs.List grow={!isVertical}>
      {tabs.map((tab) => (
        <Tabs.Tab key={tab.id} value={tab.id} leftSection={<tab.icon />}>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  )

  return (
    <Tabs
      style={isVertical ? {} : { height: '100%' }}
      h="100%"
      variant="default"
      defaultValue={tabs[0].id}
      inverted
      {...props}
    >
      {isVertical ? nav : content}
      {isVertical ? content : nav}
    </Tabs>
  )
}
