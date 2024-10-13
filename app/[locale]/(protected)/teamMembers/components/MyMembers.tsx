'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'
import { ITeamMemberPopulated } from '@/shared/interfaces/TeamMember'
import { setCurrentMember } from '@/store/slices/teamMemberSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

type IMyMembers = {
  members: ITeamMemberPopulated[]
}

const MyMembers = ({ members }: IMyMembers) => {
  const t = useTranslations()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  const onClickMember = (task: ITeamMemberPopulated) => {
    dispatch(setCurrentMember(task))
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('Team Members')}</h2>

      <ul className="space-y-4">
        {members?.map((member) => {
          // Check if the current user is the creator
          const isCreator = member.createdBy._id === user._id
          const teamMember = isCreator ? member.user : member.createdBy

          return (
            <li
              onClick={() => onClickMember(member)}
              key={member._id}
              className="flex items-center gap-2 p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>IM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{teamMember?.name}</h3>
                <p className="text-gray-500 text-sm capitalize">{member.role} </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MyMembers
