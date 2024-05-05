import { AppCluster, ClusterFormInput } from '@features/cluster'
import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@ui'

export function ClusterUiForm({
  item,
  submit,
}: {
  item?: AppCluster
  submit: (res: ClusterFormInput) => Promise<void>
}) {
  const form = useForm<ClusterFormInput>({
    initialValues: {
      id: item?.id ?? '',
      endpoint: item?.endpoint ?? '',
      name: item?.name ?? '',
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return submit(values)
      })}
    >
      <UiStack>
        <TextInput label="Name" type="text" {...form.getInputProps('name')} />
        <TextInput label="Endpoint" type="text" {...form.getInputProps('endpoint')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
