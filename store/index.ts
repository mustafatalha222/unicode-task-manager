import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'

export const store = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
