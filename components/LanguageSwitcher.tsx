'use client'
import { setLanguage } from '../store/slices/languageSlice' // Adjust the path
import { useAppDispatch } from '@/hooks/redux'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

const LanguageSwitcher = () => {
  const t = useTranslations()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const changeLanguage = (locale: 'en' | 'ar') => {
    dispatch(setLanguage(locale))
    const { pathname, search } = window.location
    const newPathname = pathname.split('/').slice(2).join('/')
    router.replace(`/${newPathname}${search}`, { locale })
  }

  return (
    <div className="flex space-x-4">
      <button onClick={() => changeLanguage('en')} className="p-2 bg-blue-500 text-white rounded">
        {t('english')}
      </button>
      <button onClick={() => changeLanguage('ar')} className="p-2 bg-green-500 text-white rounded">
        {t('arabic')}
      </button>
    </div>
  )
}

export default LanguageSwitcher
