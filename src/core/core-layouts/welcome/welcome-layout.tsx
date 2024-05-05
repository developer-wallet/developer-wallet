import { useCorePages } from '@core'
import { useCluster } from '@features/cluster'
import { useKeypair } from '@features/keypair'
import { ThemeFeatureColors, ThemeFeatureColorScheme } from '@features/theme'
import { Button, Flex, Group, Stepper } from '@mantine/core'
import { toastWarning, UiCard, UiInfo, UiStack } from '@ui'
import { useMemo, useState } from 'react'

export function WelcomeLayout() {
  const { keypair, keypairs, generateKeypair } = useKeypair()
  const { cluster, clusters } = useCluster()
  const { fullscreen } = useCorePages()

  const steps = [
    {
      id: 0,
      label: 'Keypair',
      element: (
        <UiStack>
          {keypairs.length ? (
            <UiInfo
              message={
                <UiStack>
                  <div>You have {keypairs.length} keypairs</div>
                  <div>You can add more keypairs in the settings page</div>
                </UiStack>
              }
            />
          ) : (
            <Button onClick={generateKeypair}>Generate Keypair</Button>
          )}
        </UiStack>
      ),
      isComplete: () => !!keypair,
    },
    {
      id: 1,
      label: 'Cluster',
      element: (
        <UiStack>
          {clusters.length ? (
            <UiInfo
              message={
                <UiStack>
                  <div>You have {clusters.length} clusters</div>
                  <div>You can add more clusters in the settings page</div>
                </UiStack>
              }
            />
          ) : null}
        </UiStack>
      ),
      isComplete: () => !!cluster,
    },
    {
      id: 2,
      label: 'Theme',
      element: (
        <div>
          <ThemeFeatureColorScheme />
          <ThemeFeatureColors />
        </div>
      ),
      isComplete: () => true,
    },
  ]

  const [active, setActive] = useState(steps[0].id)

  function nextStep() {
    const step = steps[active]

    if (!step.isComplete()) {
      toastWarning('Please complete the previous step')
      return
    }
    return setActive((current) => (current < 3 ? current + 1 : current))
  }

  function prevStep() {
    return setActive((current) => (current > 0 ? current - 1 : current))
  }

  const isCurrentStepComplete = useMemo(() => steps[active].isComplete(), [active, keypair])
  const isFirstStep = active === steps[0].id
  const isLastStep = active === steps[steps.length - 1].id

  return (
    <Flex h="100vh" justify="center" align="center">
      <UiCard title="Setup" p="md" miw={600}>
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
          {steps.map((step) => (
            <Stepper.Step key={step.id} label={step.label}>
              {step.element}
            </Stepper.Step>
          ))}

          <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>

        <Group justify="space-between" mt="xl">
          <Button disabled={isFirstStep} variant="default" onClick={prevStep}>
            Back
          </Button>
          {isLastStep ? (
            <Button component="a" href={fullscreen}>
              Finish
            </Button>
          ) : (
            <Button disabled={!isCurrentStepComplete} onClick={nextStep}>
              Next step
            </Button>
          )}
        </Group>
      </UiCard>
    </Flex>
  )
}
