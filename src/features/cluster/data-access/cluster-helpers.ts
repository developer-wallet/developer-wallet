import { clusterApiUrl, Connection } from '@solana/web3.js'
import { AppCluster, AppClusterNetwork } from './cluster-types'

export function getClusterUrlParam(cluster: AppCluster): string {
  let suffix = ''
  switch (cluster?.network) {
    case AppClusterNetwork.Devnet:
      suffix = 'devnet-solana'
      break
    case AppClusterNetwork.Mainnet:
      suffix = 'mainnet-solana'
      break
    case AppClusterNetwork.Testnet:
      suffix = 'testnet-solana'
      break
    default:
      suffix = `localnet-solana&customUrl=${encodeURIComponent(cluster?.endpoint)}`
      break
  }

  return suffix.length ? `?cluster=${suffix}` : ''
}

export function isValidConnection(endpoint?: string): Connection | false {
  if (!endpoint) return false
  if (!endpoint.startsWith('http')) return false
  try {
    return new Connection(endpoint)
  } catch (e) {
    return false
  }
}

export function getConnection(cluster: AppCluster): Connection {
  return isValidConnection(cluster?.endpoint)
    ? new Connection(cluster.endpoint, 'confirmed')
    : new Connection(clusterApiUrl('devnet'), 'confirmed')
}

export async function getNetwork(connection: Connection): Promise<AppClusterNetwork> {
  const version = await connection.getGenesisHash()
  console.log('version', version)
  switch (version) {
    case '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d':
      return AppClusterNetwork.Mainnet
    case 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG':
      return AppClusterNetwork.Devnet
    case '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY':
      return AppClusterNetwork.Testnet
    default:
      return AppClusterNetwork.Custom
  }
}
