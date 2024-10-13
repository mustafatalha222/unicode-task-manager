'use client'
import React, { memo, useEffect, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { usePathname } from '@/i18n/routing'
import { getTitleByPathname } from '@/lib/helper'
import { useTranslations } from 'next-intl'
import useApi from '@/hooks/useApi'
import { IUser } from '@/shared/interfaces/User'
import { AVATAR_IMAGE } from '@/lib/constant'
import { setUser } from '@/store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { socket } from '@/lib/socket'

function Header() {
  const [currentTitle, setcurrentTitle] = useState('')
  const { data } = useApi('/api/profile')
  const user = useAppSelector((state) => state.user)
  const { data: userData } = (data as { data: IUser }) || {}
  const pathname = usePathname()
  const t = useTranslations()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user._id) {
      socket.emit('joinRoom', user._id)
    }
  }, [user])

  useEffect(() => {
    setcurrentTitle(getTitleByPathname(pathname))
  }, [pathname])

  useEffect(() => {
    if (userData?._id) {
      dispatch(setUser(userData))
    }
  }, [dispatch, userData])

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
            <span className="text-lg">{user?.name}</span>
            <span className="text-xs">{user?.email}</span>
          </div>
          <Avatar>
            <AvatarImage src={user?.image || AVATAR_IMAGE} />
            <AvatarFallback>IM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
