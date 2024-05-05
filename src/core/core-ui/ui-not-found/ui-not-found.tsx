import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useUiTheme } from '../ui-theme'
import classes from './ui-not-found.module.css'

export function UiNotFound({ to = '/' }: { to?: string }) {
  const { Link } = useUiTheme()
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another
        URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" component={Link} to={to}>
          Take me back!
        </Button>
      </Group>
    </Container>
  )
}
