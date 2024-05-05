import { ClusterUiSelect } from '@features/cluster'
import { KeypairUiSelect } from '@features/keypair'
import { Anchor, Group, useMantineTheme } from '@mantine/core'
import { UiLogo, UiLogoType, useUi, useUiBreakpoints } from '@ui'
import { Link } from 'react-router-dom'
import { CoreHeaderFullscreen } from './core-header-fullscreen'
import { CoreHeaderSettings } from './core-header-settings'
import { CoreHeaderSidebar } from './core-header-sidebar'

export function CoreHeader({
  withCluster = false,
  withKeypair = false,
  withFullscreen = false,
  withSidebar = false,
}: {
  withCluster?: boolean
  withKeypair?: boolean
  withFullscreen?: boolean
  withSidebar?: boolean
}) {
  const { colors } = useMantineTheme()
  const { isDark } = useUi()
  const { isSm } = useUiBreakpoints()
  const bg = isDark ? colors.dark[9] : colors.gray[1]

  return (
    <Group justify="space-between" align="center" h="100%" px="sm" bg={bg}>
      <Anchor component={Link} to="/" display="flex">
        {isSm ? <UiLogo height={28} /> : <UiLogoType height={28} />}
      </Anchor>
      <Group gap="xs">
        {withKeypair ? <KeypairUiSelect /> : null}
        {withCluster ? <ClusterUiSelect /> : null}
        {withFullscreen ? <CoreHeaderFullscreen /> : null}
        {withSidebar ? <CoreHeaderSidebar /> : null}
        <CoreHeaderSettings />
      </Group>
    </Group>
  )
}
