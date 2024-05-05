import { MantineColorScheme, SegmentedControl } from '@mantine/core'
import { UiCard, useUi } from '@ui'

export function ThemeFeatureColorScheme() {
  const { colorScheme, setColorScheme } = useUi()

  return (
    <UiCard title="Color Scheme">
      <SegmentedControl
        value={colorScheme}
        onChange={(val) => setColorScheme(val as MantineColorScheme)}
        data={[
          { label: 'Auto', value: 'auto' },
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
        ]}
      />
    </UiCard>
  )
}
