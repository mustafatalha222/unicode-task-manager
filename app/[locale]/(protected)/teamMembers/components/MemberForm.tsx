import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import FormSelect from '@/components/FormSelect'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { IRole, ITeamMember, ITeamMemberPopulated } from '@/shared/interfaces/TeamMember'
import { IUser } from '@/shared/interfaces/User'
import { useAppSelector } from '@/hooks/useRedux'
import { useMemo } from 'react'

const initialValues = {
  user: '',
  role: IRole.Member,
  message: '',
}

const roleOptions = Object.entries(IRole).map(([key, value]) => ({
  value: value,
  label: key,
}))

type IMemberFormProps = {
  onSuccess: () => void
  loading?: boolean
}

const validationSchema = Yup.object({
  user: Yup.string().required().label('User'),
  role: Yup.string().required().label('Role'),
  message: Yup.string().max(100).label('Message'),
})

const MemberForm: React.FC<IMemberFormProps> = ({ onSuccess }) => {
  const t = useTranslations()
  const { loading, request } = useApi('/api/teamMembers', false)
  const { data } = useApi('/api/users')
  const { data: users = [] } = data || {}
  const currentUserId = useAppSelector((state) => state.user._id)
  const teamMember = useAppSelector((state) => state.members.currentMember)
  const members = useAppSelector((state) => state.members.members)

  const formValues = teamMember
    ? {
        user: teamMember.user._id,
        role: teamMember.role,
        message: teamMember.message,
        _id: teamMember._id,
      }
    : initialValues

  const onSubmit = async (values: ITeamMember) => {
    const response = await request(teamMember?._id ? 'PUT' : 'POST', values)
    if (response) onSuccess()
  }

  // Memoize filtered users to exclude those who are the creator or assigned user
  const filteredUsers = useMemo(
    () =>
      users
        .filter(
          (user: IUser) =>
            !members.some((member) => member.createdBy._id === user._id || member.user._id === user._id) &&
            user._id !== currentUserId
        )
        .map((user: IUser) => ({ value: user._id, label: user.name })),
    [users, members, currentUserId]
  )

  return (
    <>
      <Formik enableReinitialize initialValues={formValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <div className="w-80">
            <form onSubmit={handleSubmit}>
              <FormSelect label={t('Select User')} name="user" options={filteredUsers} disabled={!!teamMember} />
              <FormSelect label={t('Role')} name="role" options={roleOptions} />
              <FormInput label={t('Message')} name="message" required={false} />
              <Button disabled={loading} type="submit" className="w-full">
                {teamMember ? t('Update') : t('Create')}
              </Button>
            </form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default MemberForm
