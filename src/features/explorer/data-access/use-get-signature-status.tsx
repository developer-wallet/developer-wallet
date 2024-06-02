import { useQuery } from '@tanstack/react-query'
import { useExplorer } from './explorer-provider'

export function useGetSignatureStatus({ signature }: { signature: string }) {
  const { connection } = useExplorer()
  return useQuery({
    queryKey: ['getSignatureStatus', { endpoint: connection.rpcEndpoint, signature }],
    queryFn: () => connection.getSignatureStatus(signature),
    retry: false,
  })
}

export function useGetBlockTime({ slot }: { slot?: number }) {
  const { connection } = useExplorer()
  return useQuery({
    queryKey: ['getBlockTime', { endpoint: connection.rpcEndpoint, slot }],
    queryFn: async () => {
      if (!slot) {
        return 'unavailable'
      }
      return connection.getBlockTime(slot)
    },
    retry: false,
  })
}
