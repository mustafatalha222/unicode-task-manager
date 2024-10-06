'use client'
import React, { memo, useEffect, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { usePathname } from '@/i18n/routing'
import { useSession } from 'next-auth/react'
import { getTitleByPathname } from '@/lib/helper'
import { useTranslations } from 'next-intl'

function Header() {
  const [currentTitle, setcurrentTitle] = useState('')
  const pathname = usePathname()
  const { data } = useSession()
  const t = useTranslations('Heading')

  useEffect(() => {
    setcurrentTitle(getTitleByPathname(pathname))
  }, [pathname])

  return (
    <header className="h-[8vh] px-6 py-3 flex justify-between shadow-sm">
      <span className="text-xl font-bold">{t(currentTitle)}</span>
      <div className="flex gap-6 items-center">
        <Avatar>
          <AvatarFallback>
            <IoNotificationsOutline size={20} />
          </AvatarFallback>
        </Avatar>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-end ">
            <span className="text-lg">{data?.user?.name}</span>
            <span className="text-xs">{data?.user?.email}</span>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>IM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
