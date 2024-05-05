import { createTheme, DEFAULT_THEME, MantineColor, MantineColorScheme, MantineThemeOverride } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { WxtStorageItem } from 'wxt/storage'
import { UiThemeProvider } from './ui-theme'
import './'

export interface UiProviderContext {
  actualColor: string
  allColors: MantineColor[]
  color: MantineColor
  colorScheme: MantineColorScheme
  isDark: boolean
  setColor: (input: MantineColor) => Promise<void>
  setColorScheme: (input: MantineColorScheme) => Promise<void>
  theme: MantineThemeOverride
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

const defaultColor = 'red'
const defaultColorScheme = 'dark'
const allColors: MantineColor[] = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
]

export function UiProvider({ children }: { children: ReactNode }) {
  const storageKeyColor = 'sync:theme:color'
  const storageKeyScheme = 'sync:theme:scheme'
  const storageColor: WxtStorageItem<MantineColor, {}> = storage.defineItem<MantineColor>(storageKeyColor, {
    defaultValue: defaultColor,
    version: 1,
  })
  const storageScheme: WxtStorageItem<MantineColorScheme, {}> = storage.defineItem<MantineColorScheme>(
    storageKeyScheme,
    {
      defaultValue: defaultColorScheme,
      version: 1,
    },
  )

  const queryColor = useQuery({ queryKey: [storageKeyColor], queryFn: () => storageColor.getValue() })
  const queryScheme = useQuery({ queryKey: [storageKeyScheme], queryFn: () => storageScheme.getValue() })

  const color = useMemo(() => queryColor.data ?? defaultColor, [queryColor.data])
  const colorScheme = useMemo(() => queryScheme.data ?? defaultColorScheme, [queryScheme.data])

  const theme = useMemo(
    () =>
      createTheme({
        colors: {
          brand: DEFAULT_THEME.colors[color],
        },
        primaryColor: 'brand',
      }),
    [color],
  )

  const systemColorDark = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    [],
  )
  const actualColorScheme = useMemo(
    () => (colorScheme === 'auto' ? (systemColorDark ? 'dark' : 'light') : colorScheme),
    [colorScheme],
  )

  const value: UiProviderContext = {
    actualColor: DEFAULT_THEME.colors[color][6],
    allColors,
    color,
    colorScheme,
    isDark: actualColorScheme === 'dark',
    setColor: async (input: MantineColor) => {
      await storageColor.setValue(input)
      await queryColor.refetch()
    },
    setColorScheme: async (input: MantineColorScheme) => {
      await storageScheme.setValue(input)
      await queryScheme.refetch()
    },
    theme,
  }
  return (
    <Context.Provider value={value}>
      <UiThemeProvider colorScheme={actualColorScheme} theme={theme}>
        {children}
      </UiThemeProvider>
    </Context.Provider>
  )
}

export function useUi() {
  return useContext(Context)
}
