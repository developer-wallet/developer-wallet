import { KeypairUiTable, useKeypair } from '@features/keypair'
import { ActionIcon, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { UiAlert, UiDebug, UiLoader, UiPage } from '@ui'
import React from 'react'
import { Link } from 'react-router-dom'

export function SettingsPageKeypairs() {
  const { keypair, keypairs, loading, generateKeypair, setKeypair, deleteKeypair } = useKeypair()

  return (
    <UiPage
      title="Keypairs"
      leftAction={
        <ActionIcon color="brand" size="sm" variant="light" component={Link} to={`/settings`}>
          <IconArrowLeft />
        </ActionIcon>
      }
    >
      <UiDebug data={{ keypairs, keypair }} open hideButton />
      {loading ? (
        <UiLoader />
      ) : keypairs.length ? (
        <KeypairUiTable
          keypair={keypair ?? undefined}
          keypairs={keypairs ?? []}
          deleteKeypair={async (k) => deleteKeypair(k)}
          setKeypair={async (k) => setKeypair(k)}
        />
      ) : (
        <UiAlert
          title="No keypairs found"
          message={<Button onClick={() => generateKeypair()}>Generate Keypair</Button>}
        />
      )}
    </UiPage>
  )
}
