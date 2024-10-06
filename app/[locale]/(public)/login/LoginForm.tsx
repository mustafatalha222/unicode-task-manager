import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/FormInput'
import { Link } from '@/i18n/routing'
import { LoginFormProps } from './interface'
import { Separator } from '@/components/ui/separator'

const initialValues = {
  email: '',
  password: '',
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, onGithubSignIn }) => {
  const t = useTranslations()

  const validationSchema = Yup.object({
    email: Yup.string().email().required().label(t('email')),
    password: Yup.string().min(6).required().label(t('password')),
  })

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <div className="flex items-center justify-center">
          <div className="w-96">
            <h2 className="text-2xl font-bold text-center mb-4">{t('Login')}</h2>
            <form onSubmit={handleSubmit}>
              <FormInput label={t('email')} name="email" type="email" />
              <FormInput label={t('password')} name="password" type="password" />
              <Button type="submit" className="w-full" disabled={loading}>
                {t('submit')}
              </Button>
            </form>

            <div className="flex mx-12">
              <Separator className="my-4" />
            </div>

            <button
              onClick={onGithubSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">{t('or')}</span>
            </div>

            <footer className="mt-2 text-center">
              <span className="text-primary font-medium">
                {t('dontHaveAccount')}{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  {t('signup')}
                </Link>
              </span>
            </footer>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default LoginForm
