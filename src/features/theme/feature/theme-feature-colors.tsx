import { ColorPicker, DEFAULT_THEME } from '@mantine/core'
import { UiCard, useUi } from '@ui'

export function ThemeFeatureColors() {
  const { allColors, color, setColor } = useUi()
  const colorMap = allColors.map((colors) => ({ label: colors, value: DEFAULT_THEME.colors[colors][6] }))

  return (
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
  )
}
