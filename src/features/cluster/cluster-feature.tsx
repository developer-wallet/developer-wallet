import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconServer } from '@tabler/icons-react'
import { UiAlert, UiLoader, UiPage } from '@ui'
import { ReactNode } from 'react'
import { useCluster } from './data-access'
import { ClusterUiForm, ClusterUiTable } from './ui'

export function ClusterFeature({ leftAction }: { leftAction?: ReactNode }) {
  const { addCluster, clusters, deleteCluster, loading, reset, selectCluster, updateCluster } = useCluster()

  return (
    <UiPage
      title="Clusters"
      leftAction={leftAction ?? <IconServer />}
      rightAction={
        <Button.Group>
          <Button
            size="xs"
            variant="light"
            onClick={() => {
              modals.open({
                size: 'lg',
                centered: true,
                children: (
                  <ClusterUiForm
                    submit={async (res) => {
                      await addCluster(res)
                      modals.closeAll()
                    }}
                  />
                ),
              })
            }}
          >
            Add Cluster
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() => {
              if (!window.confirm('Are you sure?')) return
              reset()
            }}
          >
            Reset Clusters
          </Button>
        </Button.Group>
      }
    >
      {loading ? (
        <UiLoader />
      ) : clusters.length ? (
        <ClusterUiTable
          clusters={clusters}
          deleteCluster={deleteCluster}
          selectCluster={selectCluster}
          updateCluster={updateCluster}
        />
      ) : (
        <UiAlert message="No clusters found" />
      )}
    </UiPage>
  )
}
