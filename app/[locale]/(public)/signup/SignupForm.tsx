import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import { SignupFormProps } from './interface'
import { Link } from '@/i18n/routing'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading }) => {
  const t = useTranslations()

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(30).required().label(t('Name')),
    email: Yup.string().email().required().label(t('Email')),
    password: Yup.string().min(6).required().label(t('Password')),
  })

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <div className="flex items-center justify-center">
          <div className="w-96">
            <h2 className="text-2xl font-bold text-center mb-4">{t('Sign Up')}</h2>
            <form onSubmit={handleSubmit}>
              <FormInput label={'Name'} name="name" />
              <FormInput label={'Email'} name="email" type="email" />
              <FormInput label={'Password'} name="password" type="password" />
              <Button type="submit" className="w-full" disabled={loading}>
                {t('Submit')}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-600">{t('or')}</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-primary font-medium">
                {t('Already have an account?')}{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  {t('Login')}
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default SignupForm
