import { AppLabelsProvider } from '@core/app-labels/app-labels-provider.tsx'
import { ClusterProvider } from '@features/cluster/cluster-data-access.tsx'
import { KeypairProvider } from '@features/keypair/data-access'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UiProvider } from '@ui/ui-provider.tsx'
import { createContext, ReactNode, useContext } from 'react'

const client = new QueryClient()
export interface AppProviderContext {
  href: string
  origin: string
  pathname: string
}

const Context = createContext<AppProviderContext>({} as AppProviderContext)

export function AppProvider({ children }: { children: ReactNode }) {
  const { href, origin, pathname } = window.location
  const value: AppProviderContext = {
    href,
    origin,
    pathname,
  }

  return (
    <QueryClientProvider client={client}>
      <Context.Provider value={value}>
        <ClusterProvider>
          <KeypairProvider>
            <AppLabelsProvider>
              <UiProvider>{children}</UiProvider>
            </AppLabelsProvider>
          </KeypairProvider>
        </ClusterProvider>
      </Context.Provider>
    </QueryClientProvider>
  )
}

export function useApp() {
  return useContext(Context)
}
