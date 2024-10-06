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
  const [loading, setloading] = useState(false)
  const { status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/')
    }
  }, [sessionStatus, router])

  const handleRedirect = (res: SignInResponse | undefined) => {
    if (res?.error) {
      setloading(false)
      toast.error(t('authErrorMessage'))
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
  }

  const handleGithubSignIn = async () => {
    setloading(true)
    const res = await signIn('github', { redirect: false })
    handleRedirect(res)
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} loading={loading} onGithubSignIn={handleGithubSignIn} />
    </div>
  )
}

export default LoginPage
