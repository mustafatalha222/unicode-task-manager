'use client'
import useApi from '@/hooks/useApi'
import { ISignUpValues } from './interface'
import SignupForm from './SignupForm'
import { useRouter } from '@/i18n/routing'

const SignupPage = () => {
  const router = useRouter()
  const { request, loading } = useApi('/api/signup', false)

  const handleSubmit = async (values: ISignUpValues) => {
    const data = await request('POST', values)
    if (data) router.push('/login')
  }

  return (
    <>
      <SignupForm onSubmit={handleSubmit} loading={loading} />
    </>
  )
}

export default SignupPage
