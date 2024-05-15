import { Stepper } from '@mantine/core'
import { toastWarning, UiCard } from '@ui'
import { ReactNode, useMemo, useState } from 'react'
import { SetupUiWizardButtons, SetupUiWizardButtonsProps } from './setup-ui-wizard-buttons.tsx'

export interface SetupUiWizardProps {
  onComplete: () => void
  steps: SetupUiWizardStep[]
}

export interface SetupUiWizardStep {
  label: string
  element: ReactNode
  isComplete: () => boolean
}

export function SetupUiWizard({ onComplete, steps }: SetupUiWizardProps) {
  const wizardSteps: Array<SetupUiWizardStep & { id: number }> = useMemo(
    () => steps.map((step, id) => ({ ...step, id })),
    [steps],
  )

  const [active, setActive] = useState(wizardSteps[0].id)

  const isComplete = useMemo(() => wizardSteps[active]?.isComplete(), [active, wizardSteps])
  const isFirst = useMemo(() => active === wizardSteps[0].id, [active, wizardSteps])
  const isLast = useMemo(() => active === wizardSteps[wizardSteps.length - 1].id, [active, wizardSteps])

  const buttons: SetupUiWizardButtonsProps = {
    isComplete,
    isFirst,
    isLast,
    onComplete,
    onNext: () => {
      if (!isComplete) {
        toastWarning('Please complete this step')
        return
      }
      return setActive((current) => (current < 3 ? current + 1 : current))
    },
    onPrevious: () => {
      setActive((current) => (current > 0 ? current - 1 : current))
    },
  }

  return (
    <UiCard>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} miw={600} mih={400}>
        {wizardSteps.map((step) => (
          <Stepper.Step key={step.id} label={step.label}>
            {step.element}
          </Stepper.Step>
        ))}
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>
      <SetupUiWizardButtons {...buttons} />
    </UiCard>
  )
}
