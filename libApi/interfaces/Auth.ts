import { DefaultSession, User as AuthUser } from 'next-auth'

export interface ISession {
  user: {
    id: string
  } & DefaultSession['user']
}

export interface IAuthUser extends AuthUser {
  id: string // Add other properties if necessary
}

export interface IRequest extends Request {
  user: ISession['user']
}
