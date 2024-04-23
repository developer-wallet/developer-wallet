import { Button, Group, Menu, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconWallet, IconWalletOff } from '@tabler/icons-react'
import { UiStack } from '@ui/index.ts'

import { useState } from 'react'

import { useKeypair } from '../data-access'

export function KeypairUiModal() {
  const { importKeypair } = useKeypair()
  const [opened, { close, open }] = useDisclosure(false)
  const [secret, setSecret] = useState('')

  return (
    <>
      <Button onClick={open}>Add Keypair</Button>
      <Modal opened={opened} onClose={close} title="Add Keypair">
        <UiStack>
          <TextInput type="text" placeholder="Name" value={secret} onChange={(e) => setSecret(e.target.value)} />

          <Group justify="end">
            <Button
              onClick={() => {
                importKeypair(secret)
                close()
              }}
            >
              Save
            </Button>
          </Group>
        </UiStack>
      </Modal>
    </>
  )
}

export function KeypairUiSelect() {
  const { keypairs, setKeypair, keypair } = useKeypair()

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light">{keypair.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {keypairs.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => setKeypair(item)}
            leftSection={item.active ? <IconWallet /> : <IconWalletOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={'a'} href="/keypairs">
          Manage Keypairs
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
