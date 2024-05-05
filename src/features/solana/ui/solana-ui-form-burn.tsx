import { formatAmount } from '@core/core-helpers'
import { Button, ButtonProps, Group, Stack, Text, TextInput } from '@mantine/core'
import { UiGroup } from '@ui'
import { useState } from 'react'

export function SolanaUiFormBurn({
  available,
  burn,
  ...props
}: ButtonProps & {
  available: string
  burn: (input: { amount: string }) => Promise<void>
}) {
  const [amount, setAmount] = useState('1')
  const [loading, setLoading] = useState(false)

  return (
    <Stack
      component="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        return burn({ amount }).finally(() => setLoading(false))
      }}
    >
      <Group>
        <TextInput
          styles={{
            label: { width: '100%' },
            input: { textAlign: 'right' },
          }}
          disabled={loading}
          label={
            <Group component="span" justify="space-between">
              <Text size="sm" fw="bold" span>
                Amount
              </Text>
              <UiGroup>
                <Text
                  size="xs"
                  onClick={() => {
                    setAmount(available)
                  }}
                >
                  {formatAmount(available)}
                </Text>
              </UiGroup>
            </Group>
          }
          type="number"
          step="any"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          flex={1}
        />
      </Group>
      <Group justify="end">
        <Button loading={loading} type="submit" disabled={!amount} {...props}>
          Burn
        </Button>
      </Group>
    </Stack>
  )
}
