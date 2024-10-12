'use client'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { IElementSidebar } from './interface'

const ElementSidebar = ({ icon, link, name, selectable = true, handleClick }: IElementSidebar) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isSelected = selectable && pathname.startsWith(link)

  return (
    <Link
      href={link}
      onClick={handleClick}
      className={`flex items-center p-2 space-x-3 hover:bg-gray-100 hover:border-l-4 border-primary ${
        isSelected ? 'bg-gray-100 border-l-4 border-primary' : ''
      }`}
    >
      <span className=""></span>
      <span className="text-primary">{icon}</span>
      <span className="text-lg">{t(name)}</span>
    </Link>
  )
}
export default memo(ElementSidebar)
