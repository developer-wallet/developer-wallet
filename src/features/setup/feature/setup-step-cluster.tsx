import { AppCluster } from '@features/cluster'
import { UiInfo, UiStack } from '@ui'

export function SetupStepCluster({ clusters }: { clusters: AppCluster[] }) {
  return (
    <UiStack>
      {clusters.length ? (
        <UiInfo
          message={
            <UiStack>
              <div>You have {clusters.length} clusters</div>
              <div>You can add more clusters in the settings page</div>
            </UiStack>
          }
        />
      ) : null}
    </UiStack>
  )
}
