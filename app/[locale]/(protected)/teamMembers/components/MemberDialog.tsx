import React from 'react'
import CustomDialog from '@/components/CustomDialog'
import MemberForm from './MemberForm'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { clearMemberDialog } from '@/store/slices/teamMemberSlice'

interface MemberDialogProps {
  refresh: () => void
}

const MemberDialog: React.FC<MemberDialogProps> = ({ refresh }) => {
  const dispatch = useAppDispatch()
  const { isDialogOpen, currentMember } = useAppSelector((state) => state.members)

  const onClose = () => {
    dispatch(clearMemberDialog())
  }

  const onSuccess = () => {
    refresh()
    onClose()
  }

  return (
    <CustomDialog
      open={isDialogOpen}
      setOpen={onClose}
      content={<MemberForm onSuccess={onSuccess} />}
      title={currentMember ? 'Edit Team Member' : 'Add Team Member'}
      hideIcon={true}
      showCloseIcon={true}
    />
  )
}

export default MemberDialog
