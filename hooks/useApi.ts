import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

type UseApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
  request: (method: string, body?: object) => Promise<T | null>
  refresh: () => void
}

const useApi = <T = any>(url: string, initialFetch: boolean = true): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslations()

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url, { method: 'GET' })

      if (!res.ok) {
        const errorMessage = await res.json()
        toast.error(t(errorMessage.error || errorMessage))
        setError(errorMessage.error || t('Failed to fetch data'))
        return
      }

      const data = await res.json()
      setData(data)
    } catch (error) {
      const errorMessage = (error as Error).message
      setError(errorMessage)
      toast.error(t(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialFetch) {
      fetchData() // Fetch data on mount if initialFetch is true
    }
  }, [url, initialFetch])

  const request = async (method: string, body?: object): Promise<T | null> => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!res.ok) {
        const errorMessage = await res.json()
        toast.error(t(errorMessage.error || errorMessage))
        setError(errorMessage.error || 'Request failed')
        return null
      }

      const data = await res.json()
      toast.success(t(data?.data?.message))
      return data
    } catch (error) {
      const errorMessage = (error as Error).message
      setError(errorMessage)
      toast.error(t(errorMessage))
      return null
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => fetchData() // Re-fetch data

  return { data, error, loading, request, refresh }
}

export default useApi
