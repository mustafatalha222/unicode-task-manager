import { ITeamMemberPopulated } from '@/shared/interfaces/TeamMember'
import { createSlice } from '@reduxjs/toolkit'

interface MemberState {
  isDialogOpen: boolean
  currentMember?: ITeamMemberPopulated | null
  members: ITeamMemberPopulated[]
}

const initialState: MemberState = {
  isDialogOpen: false,
  currentMember: null,
  members: [],
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
    setTeamMembers(state, action) {
      state.members = action.payload
    },
  },
})

export const { setIsDialogOpen, setCurrentMember, clearMemberDialog, setTeamMembers } = tasksSlice.actions
export default tasksSlice.reducer
