import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import teamMemberReducer from './slices/teamMemberSlice'

export const store = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      members: teamMemberReducer,
    },
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
