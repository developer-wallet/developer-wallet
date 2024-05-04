export interface AppCluster {
  id: string
  name: string
  endpoint: string
  network?: AppClusterNetwork
  active?: boolean
}

export type ClusterFormInput = Omit<AppCluster, 'id' | 'active' | 'network'> & { id?: string }

export enum AppClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}
