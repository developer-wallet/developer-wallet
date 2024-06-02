import { useParams } from 'react-router-dom'

export function ExplorerFeatureBlock() {
  const { slot } = useParams() as { slot: string }
  return <div>Slot: {slot}</div>
}
