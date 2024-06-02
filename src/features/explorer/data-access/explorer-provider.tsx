import { useCluster } from '@features/cluster'
import { Connection } from '@solana/web3.js'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

export interface ExplorerProviderContext {
  connection: Connection
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const Context = createContext<ExplorerProviderContext>({} as ExplorerProviderContext)

export function ExplorerProvider({ children }: { children: ReactNode }) {
  const { connection } = useCluster()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const value: ExplorerProviderContext = {
    connection,
    searchQuery,
    setSearchQuery,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useExplorer() {
  return useContext(Context)
}
