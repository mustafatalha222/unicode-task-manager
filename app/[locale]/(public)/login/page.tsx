'use client'
import { useRouter } from '@/i18n/routing'
import { signIn, SignInResponse, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
import LoginForm from './LoginForm'
import { useEffect, useState } from 'react'

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations()
  const { status: sessionStatus } = useSession()
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [sessionStatus, router])

  const handleRedirect = (res: SignInResponse | undefined) => {
    if (res?.error) {
      toast.error(t('Authentication Failed'))
    }
  }

  const handleSubmit = async (values: { email: string; password: string }) => {
    setloading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    handleRedirect(res)
    setloading(false)
  }

  const handleGithubSignIn = async () => {
    setloading(true)
    const res = await signIn('github', { redirect: false })
    handleRedirect(res)
    setloading(false)
  }

  return (
    <div>
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading || sessionStatus === 'loading'}
        onGithubSignIn={handleGithubSignIn}
      />
    </div>
  )
}

export default LoginPage
