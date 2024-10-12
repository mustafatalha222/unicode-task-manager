import { ITask } from '@/shared/interfaces/Task'
import { createSlice } from '@reduxjs/toolkit'

interface TaskState {
  isCreate: boolean
  currentTask?: ITask | null
}

const initialState: TaskState = {
  isCreate: false,
  currentTask: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setIsCreate(state, action) {
      state.isCreate = action.payload
    },
    setCurrentTask(state, action) {
      state.isCreate = !!action.payload
      state.currentTask = action.payload
    },
    clearTaskCreate(state) {
      state.isCreate = false
      state.currentTask = null
    },
  },
})

export const { setIsCreate, setCurrentTask, clearTaskCreate } = tasksSlice.actions
export default tasksSlice.reducer
