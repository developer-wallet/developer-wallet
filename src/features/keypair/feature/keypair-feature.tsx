import { KeypairUiTable, useKeypair } from '@features/keypair'
import { Button } from '@mantine/core'
import { IconKey } from '@tabler/icons-react'
import { UiAlert, UiLoader, UiPage } from '@ui'
import React, { ReactNode } from 'react'

export function KeypairFeature({ leftAction }: { leftAction?: ReactNode }) {
  const { deleteKeypair, generateKeypair, keypairs, loading, selectKeypair } = useKeypair()

  return (
    <UiPage
      title="Keypairs"
      leftAction={leftAction ?? <IconKey />}
      rightAction={
        <Button.Group>
          <Button
            size="xs"
            variant="light"
            onClick={async () => {
              await generateKeypair()
            }}
          >
            Generate Keypair
          </Button>
        </Button.Group>
      }
    >
      {loading ? (
        <UiLoader />
      ) : keypairs.length ? (
        <KeypairUiTable keypairs={keypairs ?? []} deleteKeypair={deleteKeypair} selectKeypair={selectKeypair} />
      ) : (
        <UiAlert
          title="No keypairs found"
          message={<Button onClick={() => generateKeypair()}>Generate Keypair</Button>}
        />
      )}
    </UiPage>
  )
}
