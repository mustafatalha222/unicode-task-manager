import { useTranslations } from 'next-intl'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useApi = (url: string) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslations()

  const request = async (method: string, body?: object) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!res.ok) {
        const errorMessage = await res.json()
        toast.error(t(errorMessage.error || errorMessage))
        return null
      }

      const data = await res.json()
      return data
    } catch (error) {
      setError((error as Error).message)
      toast.error(t((error as Error).message))
    } finally {
      setLoading(false)
    }
  }

  return { request, error, loading }
}

export default useApi
