'use client'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { updateUserName } from '@/store/slices/userSlice'

const nameValidationSchema = Yup.object({
  name: Yup.string().min(3).max(30).required().label('Name'),
})

const passwordValidationSchema = Yup.object({
  oldPassword: Yup.string().min(6).required().label('Old Password'),
  newPassword: Yup.string().min(6).required().label('New Password'),
})

const ProfileForm = () => {
  const t = useTranslations()
  const { loading, request } = useApi('/api/profile', false)
  const { loading: loadingPassword, request: requestPassword } = useApi('/api/profile/updatePassword', false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  // Form values for name and password updates
  const nameFormValues = {
    name: user?.name || '',
  }

  const passwordFormValues = {
    oldPassword: '',
    newPassword: '',
  }

  const updateName = async (values: { name: string }) => {
    await request('PUT', { name: values.name })
    dispatch(updateUserName(values.name))
  }

  const updatePassword = async (
    values: { oldPassword: string; newPassword: string },
    { resetForm }: FormikHelpers<{ oldPassword: string; newPassword: string }>
  ) => {
    await requestPassword('PUT', values)
    resetForm() // Clear password fields after submission
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Name Update Form */}
      <Formik
        enableReinitialize
        initialValues={nameFormValues}
        validationSchema={nameValidationSchema}
        onSubmit={updateName}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-2 text-lg font-semibold text-center">{t('Update Name')}</h3>
            <FormInput label={'Name'} name="name" />
            <Button disabled={loading} type="submit" className="w-full">
              {t('Update Name')}
            </Button>
          </form>
        )}
      </Formik>

      {/* Password Update Form */}
      <Formik initialValues={passwordFormValues} validationSchema={passwordValidationSchema} onSubmit={updatePassword}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-2 mt-8 text-lg font-semibold text-center">{t('Change Password')}</h3>
            <FormInput label={'Old Password'} name="oldPassword" type="password" />
            <FormInput label={'New Password'} name="newPassword" type="password" />
            <Button disabled={loadingPassword} type="submit" className="w-full">
              {t('Change Password')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileForm
