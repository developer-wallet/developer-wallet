import { ColorPicker, DEFAULT_THEME, MantineColorScheme, SegmentedControl } from '@mantine/core'
import { IconPaint } from '@tabler/icons-react'
import { UiCard, UiPage, useUi } from '@ui'
import { ReactNode } from 'react'

export function SettingsFeatureTheme({ leftAction }: { leftAction?: ReactNode }) {
  const { allColors, color, setColor, colorScheme, setColorScheme } = useUi()
  const colorMap = allColors.map((colors) => ({ label: colors, value: DEFAULT_THEME.colors[colors][6] }))

  return (
    <UiPage title="Theme" leftAction={leftAction ?? <IconPaint />}>
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

      <UiCard title="Colors">
        <ColorPicker
          swatchesPerRow={Math.round(allColors.length / 2)}
          format="hex"
          size="xl"
          value={color}
          onChange={async (color) => {
            await setColor(colorMap.find((c) => c.value === color)?.label ?? 'red')
          }}
          withPicker={false}
          swatches={colorMap.map((c) => c.value)}
        />
      </UiCard>
    </UiPage>
  )
}
