'use client' // Add this to indicate it's a client component

import { useSelector } from 'react-redux'
import { RootState } from '@/store' // Adjust the path
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const DashboardPage = () => {
  const language = useSelector((state: RootState) => state.language.language)
  const t = useTranslations('Dashboard')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LanguageSwitcher />
      {language} - {t('Dashboard')}
    </div>
  )
}

export default DashboardPage
