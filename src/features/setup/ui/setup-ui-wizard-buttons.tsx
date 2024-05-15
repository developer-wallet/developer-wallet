import { Button, Group } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export interface SetupUiWizardButtonsProps {
  isComplete: boolean
  isFirst: boolean
  isLast: boolean
  onComplete: () => void
  onNext: () => void
  onPrevious: () => void
}

export function SetupUiWizardButtons({
  isComplete,
  isFirst,
  isLast,
  onComplete,
  onNext,
  onPrevious,
}: SetupUiWizardButtonsProps) {
  return (
    <Group justify="space-between" mt="xl">
      <Button leftSection={<IconChevronLeft />} disabled={isFirst} variant="light" onClick={onPrevious}>
        Back
      </Button>
      {isLast ? (
        <Button rightSection={<IconChevronRight />} onClick={onComplete}>
          Finish
        </Button>
      ) : (
        <Button rightSection={<IconChevronRight />} disabled={!isComplete} onClick={onNext}>
          Next
        </Button>
      )}
    </Group>
  )
}
