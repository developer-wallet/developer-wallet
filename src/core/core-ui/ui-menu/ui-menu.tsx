import { ActionIcon, Menu, MenuItemProps, MenuProps } from '@mantine/core'
import { ReactNode } from 'react'

export interface UiMenuItem extends MenuItemProps {
  label: string
  type: 'label' | 'divider' | 'item'
  onClick?: () => void
}

export interface UiMenuProps extends MenuProps {
  items: UiMenuItem[]
  icon: ReactNode
}

export function UiMenu({ items, icon, ...props }: UiMenuProps) {
  return (
    <Menu shadow="md" width={200} {...props}>
      <Menu.Target>
        <ActionIcon radius="xl" size="lg" variant="default">
          {icon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {items.map(({ label, type, ...item }) => {
          switch (type) {
            case 'label':
              return <Menu.Label key={label}>{label}</Menu.Label>
            case 'divider':
              return <Menu.Divider key={label} />
            default:
              return (
                <Menu.Item key={label} {...item}>
                  {label}
                </Menu.Item>
              )
          }
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
