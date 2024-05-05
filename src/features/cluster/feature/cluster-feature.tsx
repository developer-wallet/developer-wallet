import { CoreShellPage } from '@core'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconServer } from '@tabler/icons-react'
import { UiAlert, UiBack, UiLoader, UiPage } from '@ui'
import { useCluster } from '../data-access'
import { ClusterUiForm, ClusterUiTable } from '../ui'

const FEATURE_ID = 'clusters'
const FEATURE_TITLE = 'Clusters'
const FEATURE_ICON = <IconServer />

export const FEATURE_PAGE_SETTINGS_CLUSTER: CoreShellPage = {
  path: FEATURE_ID,
  label: FEATURE_TITLE,
  leftSection: FEATURE_ICON,
  element: <ClusterFeature />,
}

function ClusterFeature() {
  const { addCluster, clusters, deleteCluster, loading, reset, selectCluster, updateCluster } = useCluster()

  return (
    <UiPage
      title={FEATURE_TITLE}
      leftAction={<UiBack to={`/settings`} />}
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
