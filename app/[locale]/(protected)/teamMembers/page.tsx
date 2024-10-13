'use client'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { CustomSkeleton } from '@/components/ui/skeleton'
import TaskDialog from './components/MemberDialog'
import { useAppDispatch } from '@/hooks/useRedux'
import { setIsDialogOpen } from '@/store/slices/teamMemberSlice'
import MyMembers from './components/MyMembers'

const Tasks = () => {
  const t = useTranslations()
  const dispatch = useAppDispatch()
  const { data, loading, refresh } = useApi('/api/teamMembers')
  const { data: members = [] } = data || {}

  const toggleDialog = () => {
    dispatch(setIsDialogOpen(true))
  }

  return (
    <>
      <TaskDialog refresh={refresh} />
      <Button onClick={toggleDialog}>{t('Add Team Member')}</Button>
      <CustomSkeleton className="h-32 mt-2" loading={loading} length={members.length} />

      {!!members.length && <MyMembers members={members} />}
    </>
  )
}

export default Tasks
