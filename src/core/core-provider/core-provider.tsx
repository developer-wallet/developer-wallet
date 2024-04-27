import { ClusterProvider } from '@features/cluster'
import { KeypairProvider } from '@features/keypair/data-access'
import { LabelsProvider } from '@features/labels'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UiProvider } from '@ui/ui-provider.tsx'
import { createContext, ReactNode, useContext } from 'react'
import { HashRouter } from 'react-router-dom'

const client = new QueryClient()
export interface CoreProviderContext {
  href: string
  origin: string
  pathname: string
  pages: {
    fullscreen: string
    popup: string
    sidepanel: string
  }
}

const Context = createContext<CoreProviderContext>({} as CoreProviderContext)

export function CoreProvider({ children }: { children: ReactNode }) {
  const { href, origin, pathname } = window.location
  const value: CoreProviderContext = {
    href,
    origin,
    pathname,
    pages: {
      fullscreen: `${origin}/fullscreen.html`,
      popup: `${origin}/popup.html`,
      sidepanel: `${origin}/sidepanel.html`,
    },
  }

  return (
    <QueryClientProvider client={client}>
      <Context.Provider value={value}>
        <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <ClusterProvider>
            <KeypairProvider>
              <LabelsProvider>
                <UiProvider>{children}</UiProvider>
              </LabelsProvider>
            </KeypairProvider>
          </ClusterProvider>
        </HashRouter>
      </Context.Provider>
    </QueryClientProvider>
  )
}

export function useCore() {
  return useContext(Context)
}

export function useCorePages() {
  const { pages } = useCore()
  return pages
}
