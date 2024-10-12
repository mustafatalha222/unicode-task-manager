import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import FormSelect from '@/components/FormSelect'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { IRole, ITeamMember, ITeamMemberPopulated } from '@/shared/interfaces/TeamMember'
import { IUser } from '@/shared/interfaces/User'

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
  teamMember?: ITeamMemberPopulated | null
}

const validationSchema = Yup.object({
  user: Yup.string().required().label('User'),
  role: Yup.string().required().label('Role'),
  message: Yup.string().max(100).label('Message'),
})

const MemberForm: React.FC<IMemberFormProps> = ({ onSuccess, teamMember }) => {
  const t = useTranslations()
  const { loading, request } = useApi('/api/teamMembers', false)
  const { data } = useApi('/api/users')
  const { data: users = [] } = data || {}

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

  return (
    <>
      <Formik enableReinitialize initialValues={formValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <div className="w-80">
            <form onSubmit={handleSubmit}>
              <FormSelect
                label={t('Select User')}
                name="user"
                options={users.map((user: IUser) => ({ value: user._id, label: user.name }))}
                disabled={!!teamMember}
              />
              <FormSelect label={t('Role')} name="role" options={roleOptions} />
              <FormInput label={t('Message')} name="message" />
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
