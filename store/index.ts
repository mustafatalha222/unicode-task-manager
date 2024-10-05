import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'

export const store = () => {
  return configureStore({
    reducer: {
      language: languageReducer,
    },
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
