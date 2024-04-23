import { Alert, Checkbox, NumberInput, PasswordInput, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React, { ReactNode, useEffect } from 'react'
import { UiFormDate } from './ui-form-date'
import { UiFormField, UiFormFieldType } from './ui-form-field'
import { UiFormText } from './ui-form-text'

function cleanupValues<T>({ fields, values }: { fields: UiFormField<T>[]; values: Partial<T> }): Partial<T> {
  type fieldKey = keyof T
  const fieldKeys: Array<fieldKey> = fields.map((field) => field.key)

  return Object.keys(values as Record<fieldKey, unknown>).reduce((acc, key) => {
    if (fieldKeys.includes(key as fieldKey)) {
      acc[key as fieldKey] = values[key as fieldKey]
    }
    return acc
  }, {} as Partial<T>)
}

export function UiForm<T>({
  children,
  model,
  fields,
  submit,
  validate,
}: {
  children?: ReactNode
  model: T
  fields: UiFormField<T>[]
  submit: (input: Partial<T>) => Promise<boolean | undefined>
  validate?: (input: Partial<T>) => Record<string, string>
}) {
  const form = useForm<T>({
    clearInputErrorOnChange: true,
    initialValues: model,
    validate,
  })

  async function handleSubmit(values: T) {
    const input = cleanupValues({ fields, values })
    const result = await submit(input)

    if (!result) {
      form.setFieldError('submit', 'An error occurred')
    } else {
      form.reset()
    }
  }

  useEffect(() => {
    form.setValues(model)
    form.resetDirty(model)
  }, [model])

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={16}>
        {fields.map((field) => {
          switch (field.type) {
            case UiFormFieldType.Checkbox:
              return (
                <Checkbox
                  key={field.key?.toString()}
                  description={field.description}
                  disabled={field.disabled}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  {...form.getInputProps(field.key, { type: 'checkbox' })}
                />
              )
            case UiFormFieldType.Date:
              return (
                <DatePickerInput
                  key={field.key?.toString()}
                  description={field.description}
                  disabled={field.disabled}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  maxDate={(field as UiFormDate<T>).maxDate}
                  minDate={(field as UiFormDate<T>).minDate}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Number:
              return (
                <NumberInput
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Text:
              return (
                <TextInput
                  readOnly={field.readOnly}
                  disabled={field.disabled}
                  error={(field as UiFormText<T>)?.error}
                  pattern={(field as UiFormText<T>)?.pattern}
                  styles={{ input: { marginTop: 16 } }}
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Password:
              return (
                <PasswordInput
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  withAsterisk={field.required}
                  // icon={<IconLock size={16} />}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Select:
              return (
                <Select
                  variant="filled"
                  styles={{ input: { marginTop: 16 } }}
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  data={field.options ?? []}
                  {...form.getInputProps(field.key)}
                />
              )
            case UiFormFieldType.Textarea:
              return (
                <Textarea
                  variant="filled"
                  key={field.key?.toString()}
                  description={field.description}
                  label={field.label}
                  placeholder={field.placeholder ?? field.label}
                  required={field.required}
                  rows={field.rows ?? 5}
                  withAsterisk={field.required}
                  {...form.getInputProps(field.key)}
                />
              )
            default:
              return <Alert>Unknown form type: {field.type}</Alert>
          }
        })}
        {children ? children : null}
      </Stack>
    </form>
  )
}
