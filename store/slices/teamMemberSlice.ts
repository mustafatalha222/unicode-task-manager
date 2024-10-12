import { ITeamMember } from '@/shared/interfaces/TeamMember'
import { createSlice } from '@reduxjs/toolkit'

interface MemberState {
  isDialogOpen: boolean
  currentMember?: ITeamMember | null
}

const initialState: MemberState = {
  isDialogOpen: false,
  currentMember: null,
}

const tasksSlice = createSlice({
  name: 'teamMembers',
  initialState,
  reducers: {
    setIsDialogOpen(state, action) {
      state.isDialogOpen = action.payload
    },
    setCurrentMember(state, action) {
      state.isDialogOpen = !!action.payload
      state.currentMember = action.payload
    },
    clearMemberDialog(state) {
      state.isDialogOpen = false
      state.currentMember = null
    },
  },
})

export const { setIsDialogOpen, setCurrentMember, clearMemberDialog } = tasksSlice.actions
export default tasksSlice.reducer
