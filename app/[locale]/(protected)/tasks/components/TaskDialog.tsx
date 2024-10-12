import React from 'react'
import CustomDialog from '@/components/CustomDialog'
import TaskForm from './TaskForm'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { clearTaskCreate } from '@/store/slices/tasksSlice'

interface TaskDialogProps {
  refresh: () => void
}

const TaskDialog: React.FC<TaskDialogProps> = ({ refresh }) => {
  const dispatch = useAppDispatch()
  const { isCreate, currentTask } = useAppSelector((state) => state.tasks)

  const onClose = () => {
    dispatch(clearTaskCreate())
  }

  const onSuccess = () => {
    refresh()
    dispatch(clearTaskCreate())
  }

  return (
    <CustomDialog
      open={isCreate}
      setOpen={onClose}
      content={<TaskForm task={currentTask} onSuccess={onSuccess} />}
      title={currentTask ? 'Edit Task' : 'Create Task'}
      hideIcon={true}
      showCloseIcon={true}
    />
  )
}

export default TaskDialog
