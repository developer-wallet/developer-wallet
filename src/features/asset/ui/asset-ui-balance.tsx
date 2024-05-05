import { SolanaUiBalanceSol, useGetBalance } from '@features/solana'
import { Title, TitleProps } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'

export function AssetUiBalance({ address, ...props }: { address: PublicKey } & TitleProps) {
  const query = useGetBalance({ address })

  return (
    <Title onClick={() => query.refetch()} {...props}>
      {query.data ? <SolanaUiBalanceSol balance={query.data} /> : '...'} SOL
    </Title>
  )
}
