'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { CustomSkeleton } from '@/components/ui/skeleton'
import TaskBoard from './components/TaskBoard'
import TaskDialog from './components/TaskDialog'
import { useAppDispatch } from '@/hooks/useRedux'
import { setIsCreate } from '@/store/slices/tasksSlice'

const Tasks = () => {
  const t = useTranslations()
  const dispatch = useAppDispatch()
  const { data, loading, refresh } = useApi('/api/task')
  const { data: tasks = [] } = data || {}

  const toggleCreate = () => {
    // Open the dialog for creating a task
    dispatch(setIsCreate(true))
  }

  return (
    <>
      <TaskDialog refresh={refresh} />

      <div className="mb-3">
        <Button onClick={toggleCreate}>{t('Create Task')}</Button>
      </div>

      <CustomSkeleton className="h-32" loading={loading} length={tasks.length} />

      {!!tasks.length && <TaskBoard tasks={tasks} />}
    </>
  )
}

export default Tasks
