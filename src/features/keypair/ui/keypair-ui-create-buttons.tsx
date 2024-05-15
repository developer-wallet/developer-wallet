import { Button, Group } from '@mantine/core'

export interface KeypairUiCreateButtonsProps {
  generateKeypair: () => Promise<void>
  importKeypair: () => Promise<void>
}

export function KeypairUiCreateButtons({ generateKeypair, importKeypair }: KeypairUiCreateButtonsProps) {
  return (
    <Group justify="space-evenly">
      <Button onClick={generateKeypair}>Generate Keypair</Button>
      <Button onClick={importKeypair}>Import Keypair</Button>
    </Group>
  )
}
