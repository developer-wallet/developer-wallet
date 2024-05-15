import { useCore } from '@core'
import { useCluster } from '@features/cluster'
import { useKeypair } from '@features/keypair'
import { SetupUiWizard } from '../ui/setup-ui-wizard'
import { SetupStepCluster } from './setup-step-cluster'
import { SetupStepKeypair } from './setup-step-keypair'
import { SetupStepTheme } from './setup-step-theme'

export function SetupFeature() {
  const { deleteKeypair, generateKeypair, importKeypair, keypair, keypairs, selectKeypair } = useKeypair()
  const { cluster, clusters } = useCluster()
  const { navigate } = useCore()

  return (
    <SetupUiWizard
      onComplete={() => navigate('fullscreen')}
      steps={[
        {
          label: 'Keypair',
          element: (
            <SetupStepKeypair
              keypairs={keypairs}
              generateKeypair={generateKeypair}
              importKeypair={importKeypair}
              selectKeypair={selectKeypair}
              deleteKeypair={deleteKeypair}
            />
          ),
          isComplete: () => !!keypair,
        },
        {
          label: 'Cluster',
          element: <SetupStepCluster clusters={clusters} />,
          isComplete: () => !!cluster,
        },
        {
          label: 'Theme',
          element: <SetupStepTheme />,
          isComplete: () => true,
        },
      ]}
    />
  )
}
