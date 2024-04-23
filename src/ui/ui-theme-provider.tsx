import { createContext, ReactNode, useContext } from 'react'

export interface UiThemeProviderContext {
  name: string
}

const Context = createContext<UiThemeProviderContext>({} as UiThemeProviderContext)

export function UiThemeProvider({ children }: { children: ReactNode }) {
  const value: UiThemeProviderContext = {
    name: 'UiTheme',
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useUiTheme() {
  return useContext(Context)
}
