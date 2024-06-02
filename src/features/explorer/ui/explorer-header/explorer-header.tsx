import { ClusterUiSelect } from '@features/cluster'
import { useExplorer } from '@features/explorer/data-access'
import { Anchor, Group, TextInput, useMantineTheme } from '@mantine/core'
import { UiLogo, UiLogoType, useUi, useUiBreakpoints } from '@ui'
import { Link } from 'react-router-dom'

export function ExplorerHeader() {
  const { colors } = useMantineTheme()
  const { isDark } = useUi()
  const { isSm } = useUiBreakpoints()
  const bg = isDark ? colors.dark[9] : colors.gray[1]

  return (
    <Group justify="space-between" align="center" h="100%" px="sm" bg={bg}>
      <Anchor component={Link} to="/" display="flex">
        {isSm ? <UiLogo height={28} /> : <UiLogoType height={28} />}
      </Anchor>
      <Group style={{ flexGrow: 1 }}>
        <ExplorerHeaderSearch />
      </Group>
      <Group gap="xs">
        <ClusterUiSelect withManage={false} />
      </Group>
    </Group>
  )
}

export function ExplorerHeaderSearch() {
  const { searchQuery, setSearchQuery } = useExplorer()

  return <TextInput miw="100%" value={searchQuery} onChange={(v) => setSearchQuery(v.target.value ?? '')} />
}
