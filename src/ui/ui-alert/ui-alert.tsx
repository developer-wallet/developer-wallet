import { Alert, AlertProps } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface UiAlertProps extends AlertProps {
  message: ReactNode
  title?: ReactNode
}

export function UiAlert({ message, ...props }: UiAlertProps) {
  return (
    <Alert title={props.title ?? 'Alert'} {...props}>
      {message}
    </Alert>
  )
}

export function UiError({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Error'} color="red" icon={props.icon ?? <IconCircleX />} {...props} />
}

export function UiInfo({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Info'} color="blue" icon={props.icon ?? <IconInfoCircle />} {...props} />
}

export function UiSuccess({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Success'} color="green" icon={props.icon ?? <IconCheck />} {...props} />
}

export function UiWarning({ ...props }: UiAlertProps) {
  return <UiAlert title={props.title ?? 'Warning'} color="yellow" icon={props.icon ?? <IconAlertCircle />} {...props} />
}
