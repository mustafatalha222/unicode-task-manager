'use client'
import { useAppDispatch } from '@/hooks/useRedux'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { Switch } from './ui/switch'
import { setLanguage } from '@/store/slices/languageSlice'

const LanguageSwitcher = () => {
  const t = useTranslations('Lang')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const changeLanguage = () => {
    const locale = currentLocale === 'en' ? 'ar' : 'en'
    dispatch(setLanguage(locale))

    router.replace(pathname, { locale })
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`font-bold text-sm ${currentLocale === 'ar' ? 'text-primary' : 'text-gray-600'}`}>
        {currentLocale === 'en' ? t('english') : t('arabic')}
      </span>
      <Switch checked={currentLocale === 'ar'} onCheckedChange={changeLanguage} className="mr-2" />
    </div>
  )
}

export default LanguageSwitcher
