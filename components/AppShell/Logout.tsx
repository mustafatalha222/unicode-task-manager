'use client'
import { memo, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import ElementSidebar from './ElementSidebar'
import AlertDialog from '../AlertDialog'
import { useRouter } from '@/i18n/routing'
import { signOut } from 'next-auth/react'

const Logout = () => {
  const [openDialog, setopenDialog] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setopenDialog(true)
  }

  const handleSuccess = () => {
    signOut()
    setopenDialog(false)
    router.push('/')
  }

  return (
    <>
      <ElementSidebar
        handleClick={handleClick}
        name="logout"
        link={''}
        selectable={false}
        icon={<AiOutlineLogout size={20} className="-rotate-90" />}
      />

      <AlertDialog
        open={openDialog}
        setOpen={setopenDialog}
        content="confirm_logout"
        successBtn="Confirm"
        cancelBtn="Cancel"
        handleSuccess={handleSuccess}
        successIcon={false}
      ></AlertDialog>
    </>
  )
}
export default memo(Logout)
