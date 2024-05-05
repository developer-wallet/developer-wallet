import { CoreShellPage } from '@core'
import { KeypairUiTable, useKeypair } from '@features/keypair'
import { Button } from '@mantine/core'
import { IconKey } from '@tabler/icons-react'
import { UiAlert, UiBack, UiLoader, UiPage } from '@ui'

const FEATURE_ID = 'keypairs'
const FEATURE_TITLE = 'Keypairs'
const FEATURE_ICON = <IconKey />

export const FEATURE_PAGE_SETTINGS_KEYPAIR: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <KeypairFeature />,
}

export function KeypairFeature() {
  const { deleteKeypair, generateKeypair, keypairs, loading, selectKeypair } = useKeypair()

  return (
    <UiPage
      title={FEATURE_TITLE}
      leftAction={<UiBack to={`/settings`} />}
      rightAction={
        <Button.Group>
          <Button
            size="xs"
            variant="light"
            onClick={async () => {
              await generateKeypair()
            }}
          >
            Generate Keypairs
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
