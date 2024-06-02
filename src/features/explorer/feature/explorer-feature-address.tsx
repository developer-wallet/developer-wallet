import { useParams } from 'react-router-dom'

export function ExplorerFeatureAddress() {
  const { address } = useParams() as { address: string }

  return <div>Address: {address}</div>
}