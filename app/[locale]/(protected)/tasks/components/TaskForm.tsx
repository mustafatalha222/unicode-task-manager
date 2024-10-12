import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import { useTranslations } from 'next-intl'
import FormSelect from '@/components/FormSelect'
import useApi from '@/hooks/useApi'
import { ITask, ITaskPriority, ITaskStatus } from '@/shared/interfaces/Task'
import { IUser } from '../../users/interface'

const initialValues = {
  title: '',
  description: '',
  assignedTo: '',
  status: ITaskStatus.Todo,
  priority: ITaskPriority.Medium,
  dueDate: undefined,
}

const statusOptions = Object.entries(ITaskStatus).map(([key, value]) => ({
  value: value,
  label: key,
}))

const priorityOptions = Object.entries(ITaskPriority).map(([key, value]) => ({
  value: value,
  label: key,
}))

type ITaskFormProps = {
  onSuccess: () => void
  loading?: boolean
  task?: ITask | null
}

const validationSchema = Yup.object({
  title: Yup.string().required().max(20).label('Title'),
  description: Yup.string().required().max(50).label('Description'),
  assignedTo: Yup.string().required().label('Assign To'),
})

const TaskForm: React.FC<ITaskFormProps> = ({ onSuccess, task }) => {
  const t = useTranslations()
  const { loading, request } = useApi('/api/task', false)
  const { data } = useApi('/api/users')
  const { data: users = [] } = data || {}

  // If task prop is provided, use its values for the form
  const formValues = task
    ? {
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
        _id: task._id,
      }
    : initialValues

  const onSubmit = async (obj: ITask) => {
    const data = await request(task?._id ? 'PUT' : 'POST', obj)
    if (data) onSuccess()
  }

  const handleDelete = async () => {
    const data = await request('DELETE', { _id: task?._id })
    if (data) onSuccess()
  }

  return (
    <>
      <Formik enableReinitialize initialValues={formValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <div className="w-80">
            <form onSubmit={handleSubmit}>
              <FormInput label={'Title'} name="title" />
              <FormInput label={'Description'} name="description" />
              <FormSelect label={'Status'} name="status" options={statusOptions} />
              <FormSelect label={'Priority'} name="priority" options={priorityOptions} />
              <FormSelect
                label={t('Assign To')}
                name="assignedTo"
                options={users.map((e: IUser) => ({ value: e._id, label: e.name }))}
              />
              <Button disabled={loading} type="submit" className="w-full">
                {task ? t('Update') : t('Create')}
              </Button>
            </form>
          </div>
        )}
      </Formik>

      {task?._id && (
        <Button className="w-80 mt-2" variant={'destructive'} disabled={loading} onClick={() => handleDelete()}>
          Delete Task
        </Button>
      )}
    </>
  )
}

export default TaskForm
