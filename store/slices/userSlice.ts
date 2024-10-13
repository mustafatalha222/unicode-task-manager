import { IUser } from '@/shared/interfaces/User'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUser = {
  email: '',
  name: '',
  _id: '',
  image: '',
  provider: '',
}

const tasksSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    updateUserName(state, action) {
      if (state) {
        state.name = action.payload
      }
    },
  },
})

export const { setUser, updateUserName } = tasksSlice.actions
export default tasksSlice.reducer
