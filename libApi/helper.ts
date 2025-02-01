import { NextResponse } from 'next/server'
import connect from './connect'
import { API_STATUS, saltRounds } from './constant'
import { auth } from './auth'
import { getServerSession } from 'next-auth'
import bcrypt from 'bcrypt'
import { IRequest, ISession } from './interfaces/Auth'
import { Logger } from './utils/logger'

export const apiWrapper = (handler: (request: IRequest, params?: any) => Promise<NextResponse>, checkAuth = true) => {
  return async (request: IRequest, params?: any) => {
    let user: any = null;

    try {
      if (checkAuth) {
        const session: ISession | null = await getServerSession(auth)
        if (!session) {
          const response = createResponse(null, 'UnAuthorized', API_STATUS.UNAUTHORIZED)
          await Logger.logApi({
            method: request.method,
            path: request.url,
            status: API_STATUS.UNAUTHORIZED,
            error: 'Unauthorized',
          })
          return response
        } else {
          user = session.user
        }
      }

      // Connect to database if not already connected
      await connect()

      // Add user to request object if authenticated
      const augmentedRequest: IRequest = Object.assign(request, { user })

      // Execute the handler
      const response = await handler(augmentedRequest, params)

      // Log successful API call
      await Logger.logApi({
        method: request.method,
        path: request.url,
        status: response.status,
        response: response.body,
        userId: user?.id,
      })

      return response
    } catch (error: any) {
      // Log error
      await Logger.logError({
        method: request.method,
        path: request.url,
        status: API_STATUS.SERVER_ERROR,
        error: error?.message || 'Unknown error',
        userId: user?.id
      })

      // Handle server errors
      return createResponse(null, 'Internal server error', API_STATUS.SERVER_ERROR)
    }
  }
}

interface ApiResponse<T = unknown> {
  status: number
  data?: T
  error?: string
}

export const createResponse = <T = unknown>(
  data: T | null,
  error: string | null = null,
  status: number = 200
): NextResponse => {
  const response: ApiResponse<T> = {
    status,
    data: data || undefined,
    error: error || undefined,
  }
  return NextResponse.json(response, { status })
}

// Function to hash the password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}
