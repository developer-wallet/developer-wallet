import { useParams } from 'react-router-dom'

export function ExplorerFeatureEpoch() {
  const { epoch } = useParams() as { epoch: string }

  return <div>Epoch: {epoch}</div>
}
