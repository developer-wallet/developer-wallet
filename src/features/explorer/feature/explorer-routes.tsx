import { ExplorerRoutesWrapper } from '@features/explorer/feature/explorer-routes-wrapper.tsx'
import { useRoutes } from 'react-router-dom'

import { ExplorerFeatureAddress } from './explorer-feature-address.tsx'
import { ExplorerFeatureBlock } from './explorer-feature-block.tsx'
import { ExplorerFeatureEpoch } from './explorer-feature-epoch.tsx'
import { ExplorerFeatureIndex } from './explorer-feature-index.tsx'
import { ExplorerFeatureTransaction } from './explorer-feature-transaction.tsx'

export function ExplorerRoutes() {
  return useRoutes([
    {
      element: <ExplorerRoutesWrapper />,
      children: [
        { index: true, element: <ExplorerFeatureIndex /> },
        { path: 'address/:address', element: <ExplorerFeatureAddress /> },
        { path: 'block/:slot', element: <ExplorerFeatureBlock /> },
        { path: 'epoch/:epoch', element: <ExplorerFeatureEpoch /> },
        { path: 'tx/:signature', element: <ExplorerFeatureTransaction /> },
      ],
    },
  ])
}
