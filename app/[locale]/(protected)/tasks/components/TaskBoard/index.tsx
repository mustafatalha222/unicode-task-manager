import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from 'react'
import { ITask, ITaskPriority, ITaskStatus } from '@/shared/interfaces/Task'
import { useAppDispatch } from '@/hooks/useRedux'
import { setCurrentTask } from '@/store/slices/tasksSlice'
import useApi from '@/hooks/useApi'
import { FcHighPriority } from 'react-icons/fc'
import { FcMediumPriority } from 'react-icons/fc'
import { RiSlowDownLine } from 'react-icons/ri'

interface ITaskBoardProps {
  tasks: ITask[]
}

const priorityMapping = {
  [ITaskPriority.Low]: <RiSlowDownLine color="blue" />,
  [ITaskPriority.Medium]: <FcMediumPriority />,
  [ITaskPriority.High]: <FcHighPriority />,
}

const TaskBoard: React.FC<ITaskBoardProps> = ({ tasks }) => {
  const { request } = useApi('/api/task')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateTask = async (updatedTask: ITask) => {
    await request('PUT', updatedTask)
  }

  const [taskList, setTaskList] = useState<ITask[]>(tasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  const onDragEnd = useCallback(
    async (result: any) => {
      const { source, destination } = result
      // Check if the task position and status remain the same
      if (
        !destination ||
        // destination.droppableId === source.droppableId ||
        (source.droppableId === destination.droppableId && source.index === destination.index)
      ) {
        return // No change, exit early
      }

      const sourceStatus = source.droppableId
      const destinationStatus = destination.droppableId

      // Find the moved task in the task list by its index in the source column
      const sourceTasks = taskList.filter((task) => task.status === sourceStatus)
      const [movedTask] = sourceTasks.splice(source.index, 1)

      if (!movedTask) return // No task found, exit early

      // Update the task status based on the new column
      movedTask.status = destinationStatus

      // Create a new task list without the moved task
      const otherTasks = taskList.filter((task) => task._id !== movedTask._id)

      // Insert the moved task into its new position in the destination column
      const destinationTasks = otherTasks.filter((task) => task.status === destinationStatus)
      destinationTasks.splice(destination.index, 0, movedTask)

      // Reassemble the full task list with updated positions
      const finalTaskList = [...otherTasks.filter((task) => task.status !== destinationStatus), ...destinationTasks]
      setTaskList(finalTaskList)

      // Call the API to update the task's new status
      await onUpdateTask(movedTask)
    },
    [taskList, onUpdateTask]
  )

  const onClickTask = (task: ITask) => {
    dispatch(setCurrentTask(task))
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-4">
          {Object.keys(ITaskStatus).map((statusKey) => (
            <Droppable key={statusKey} droppableId={ITaskStatus[statusKey as keyof typeof ITaskStatus]}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg p-4 shadow-md w-full flex flex-col"
                >
                  <h2 className="font-bold text-lg text-gray-800 mb-2 text-center">{statusKey}</h2>
                  <div className="flex-1 overflow-hidden">
                    {taskList
                      .filter((task) => task.status === ITaskStatus[statusKey as keyof typeof ITaskStatus])
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id!} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 mb-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                              <div className="flex justify-between">
                                <h3
                                  className="font-semibold cursor-pointer hover:underline"
                                  onClick={() => onClickTask(task)}
                                >
                                  {task.title}
                                </h3>

                                {task.priority && <div>{priorityMapping[task.priority]}</div>}
                              </div>
                              <p className="text-gray-700">{task.description}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  )
}

export default TaskBoard
