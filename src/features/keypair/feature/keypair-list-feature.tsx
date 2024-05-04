import { Group, Text } from '@mantine/core'
import { IconKey } from '@tabler/icons-react'
import { UiCard, UiCardTitle, UiGroup, UiPage, UiStack } from '@ui'

import { useKeypair } from '../data-access'
import { KeypairUiModal } from '../ui'

export function KeypairListFeature() {
  const {} = useKeypair()
  return (
    <UiPage title="Keypairs" leftAction={<IconKey />}>
      <UiCard
        title={
          <UiGroup>
            <UiCardTitle>Keypairs</UiCardTitle>
            <Group justify="end">
              <KeypairUiModal />
            </Group>
          </UiGroup>
        }
      >
        <UiStack>
          <Text>You can store your keys in the browser's local storage.</Text>
        </UiStack>
      </UiCard>
      KEYPAIR TABLE HERE
      {/*<KeypairUiTable />*/}
    </UiPage>
  )
}
