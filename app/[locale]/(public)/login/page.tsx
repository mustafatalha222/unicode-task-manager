'use client'
import { useRouter } from '@/i18n/routing'
import { signIn, SignInResponse, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import LoginForm from './LoginForm'
import { useEffect } from 'react'

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations()
  const { status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [sessionStatus, router])

  const handleRedirect = (res: SignInResponse | undefined) => {
    if (res?.error) {
      toast.error(t('authErrorMessage'))
    }
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    handleRedirect(res)
  }

  const handleGithubSignIn = async () => {
    const res = await signIn('github', { redirect: false })
    handleRedirect(res)
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} loading={sessionStatus === 'loading'} onGithubSignIn={handleGithubSignIn} />
    </div>
  )
}

export default LoginPage
