import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function BalanceSol({ balance }: { balance: number }) {
  return <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
}
