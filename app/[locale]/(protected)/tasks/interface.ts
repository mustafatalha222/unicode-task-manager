import { ITask } from '@/shared/interfaces/Task'

export type ITaskFormProps = {
  onSuccess: () => void
  loading?: boolean
  task?: ITask
}
