import { MantineColorScheme } from '@mantine/core'
import { createContext, ReactNode, useContext, useState } from 'react'
import { UiThemeProvider } from './ui-theme'
import './'

export interface UiProviderContext {
  name: string
  theme: MantineColorScheme
  toggleTheme: () => void
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

export function UiProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<MantineColorScheme>('dark')
  const value: UiProviderContext = {
    name: 'Ui',
    theme,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
  }
  return (
    <Context.Provider value={value}>
      <UiThemeProvider>{children}</UiThemeProvider>
    </Context.Provider>
  )
}

export function useUi() {
  return useContext(Context)
}
