'use client'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { Switch } from './ui/switch'

const LanguageSwitcher = () => {
  const t = useTranslations('Lang')
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const changeLanguage = () => {
    const locale = currentLocale === 'en' ? 'ar' : 'en'

    router.replace(pathname, { locale })
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`font-bold px-2 text-sm ${currentLocale === 'ar' ? 'text-primary' : 'text-gray-600'}`}>
        {currentLocale === 'en' ? t('English') : t('Arabic')}
      </span>
      <Switch dir="ltr" checked={currentLocale === 'ar'} onCheckedChange={changeLanguage} />
    </div>
  )
}

export default LanguageSwitcher
