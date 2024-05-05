import { Button, Group, Menu, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconWallet, IconWalletOff } from '@tabler/icons-react'
import { UiStack } from '@ui'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useKeypair } from '../data-access'

export function KeypairUiModal() {
  const {
    // importKeypair
  } = useKeypair()
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
                // importKeypair(secret)
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
  const { keypairs, selectKeypair, keypair } = useKeypair()

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light" size="sm">
          {keypair?.name ?? 'No keypairs found'}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {keypairs.map((item) => (
          <Menu.Item
            key={item.name}
            onClick={() => selectKeypair(item)}
            leftSection={item.active ? <IconWallet /> : <IconWalletOff />}
          >
            {item.name}
          </Menu.Item>
        ))}
        <Menu.Divider />
        <Menu.Item component={Link} to="/settings/keypairs">
          Manage Keypairs
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
