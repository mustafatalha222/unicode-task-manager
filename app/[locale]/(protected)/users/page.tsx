'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'
import { CustomSkeleton } from '@/components/ui/skeleton'
import useApi from '@/hooks/useApi'
import { IUser } from '@/shared/interfaces/User'

const Users = () => {
  const { data, loading } = useApi('/api/users')
  const t = useTranslations()

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('All Users')}</h2>

      <CustomSkeleton className="h-16" loading={loading} length={data?.data?.length} />
      <ul className="space-y-4">
        {data?.data?.map((user: IUser) => (
          <li
            key={user._id}
            className="flex items-center gap-2 p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>IM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
