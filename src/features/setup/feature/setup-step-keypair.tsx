import {
  KeypairUiCreateButtons,
  KeypairUiCreateButtonsProps,
  KeypairUiTable,
  KeypairUiTableProps,
} from '@features/keypair'
import { UiStack } from '@ui'

export function SetupStepKeypair({
  generateKeypair,
  importKeypair,
  ...props
}: KeypairUiTableProps & KeypairUiCreateButtonsProps) {
  return (
    <UiStack>
      <KeypairUiCreateButtons generateKeypair={generateKeypair} importKeypair={importKeypair} />
      <KeypairUiTable {...props} />
    </UiStack>
  )
}
