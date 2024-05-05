import { ClusterProvider } from '@features/cluster'
import { KeypairProvider } from '@features/keypair'
import { LabelProvider } from '@features/label'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UiProvider } from '@ui'
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
              <LabelProvider>
                <UiProvider>{children}</UiProvider>
              </LabelProvider>
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
  return useCore().pages
}
