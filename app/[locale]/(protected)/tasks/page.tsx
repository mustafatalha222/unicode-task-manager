'use client'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { useState } from 'react'
import TaskForm from './TaskForm'
import { ITask } from './interface'
import CustomDialog from '@/components/CustomDialog'

const TaskFilter = () => {
  const tasksFilter = null
  const [isCreate, setisCreate] = useState(false)

  const toggleCreate = () => {
    setisCreate(true)
  }

  const onSuccess = () => {
    setisCreate(false)
  }

  return (
    <>
      <CustomDialog
        open={isCreate}
        setOpen={setisCreate}
        content={<TaskForm onSuccess={onSuccess} />}
        title="Create Task"
        hideIcon={true}
        showCloseIcon={true}
      />

      <div className="mb-4">
        <Button onClick={toggleCreate}>Create Task</Button>
        <ul className="flex flex-wrap gap-1 sm:gap-4 justify-center text-sm sm:text-base font-medium text-center text-slate-500 border-b border-slate-200 ">
          <Link
            href=""
            className={`${
              tasksFilter === null && 'bg-emerald-200 text-slate-900 '
            } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
          >
            All
          </Link>
        </ul>
      </div>
    </>
  )
}

export default TaskFilter
