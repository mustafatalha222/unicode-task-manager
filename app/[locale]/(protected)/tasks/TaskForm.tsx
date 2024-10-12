import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import { useTranslations } from 'next-intl'
import { ITaskFormProps } from './interface'
import FormSelect from '@/components/FormSelect'
import useApi from '@/hooks/useApi'
import { ITask, ITaskPriority, ITaskStatus } from '@/shared/interfaces/Task'

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

const validationSchema = Yup.object({
  title: Yup.string().required().label('title'),
  description: Yup.string().required().label('description'),
  assignedTo: Yup.string().required().label('assignedTo'),
})

const TaskForm: React.FC<ITaskFormProps> = ({ onSuccess, task }) => {
  const t = useTranslations()
  const { loading, request } = useApi('/api/task', false)

  // If task prop is provided, use its values for the form
  const formValues = task
    ? {
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
      }
    : initialValues

  const onSubmit = async (task: ITask) => {
    const data = await request('POST', task)
    console.log(data, 'data')
    onSuccess()
  }

  return (
    <Formik enableReinitialize initialValues={formValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <div className="w-80">
          <form onSubmit={handleSubmit}>
            <FormInput label={'title'} name="title" />
            <FormInput label={'description'} name="description" />
            <FormSelect label={'status'} name="status" options={statusOptions} />
            <FormSelect label={'priority'} name="priority" options={priorityOptions} />
            <FormSelect
              label={t('assignedTo')}
              name="assignedTo"
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
              ]}
            />
            <Button disabled={loading} type="submit" className="w-full">
              {task ? t('Update') : t('Create')}
            </Button>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default TaskForm
