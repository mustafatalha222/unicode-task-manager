import { Types } from 'mongoose'
import { IUser } from './User'

export enum IRole {
  Member = 'member',
  Manager = 'manager',
  Employee = 'employee',
  Other = 'other',
}

export interface ITeamMemberDetail {
  _id?: string
  user: Types.ObjectId
  role: IRole
  message?: string
  createdBy: Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
}

export type ITeamMember = Omit<ITeamMemberDetail, 'user' | 'createdBy'> & {
  user: string
  createdBy?: StringConstructor
}

export type ITeamMemberPopulated = Omit<ITeamMember, 'user'> & {
  user: IUser
}
