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
    name: Yup.string().min(3).max(30).required().label(t('name')),
    email: Yup.string().email().required().label(t('email')),
    password: Yup.string().min(6).required().label(t('password')),
  })

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <div className="flex items-center justify-center">
          <div className="w-96">
            <h2 className="text-2xl font-bold text-center mb-4">{t('signup')}</h2>
            <form onSubmit={handleSubmit}>
              <FormInput label={'name'} name="name" />
              <FormInput label={'email'} name="email" type="email" />
              <FormInput label={'password'} name="password" type="password" />
              <Button type="submit" className="w-full" disabled={loading}>
                {t('submit')}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-600">{t('or')}</span>
            </div>
            <div className="mt-2 text-center">
              <span className="text-primary font-medium">
                {t('alreadyHaveAccount')}{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  {t('login')}
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
