import { NextResponse } from 'next/server'
import connect from './connect'
import { API_STATUS } from './constant'
import { authOptions } from './auth'
import { getServerSession } from 'next-auth'
import { IRequest, ISession } from './interfaces/Auth'

export const apiWrapper = (handler: (request: IRequest, params?: any) => Promise<NextResponse>, checkAuth = true) => {
  return async (request: IRequest, params?: any) => {
    try {
      await connect() // Ensure the database connection

      // Allowed HTTP methods
      const allowedMethods = ['POST', 'PUT', 'DELETE', 'GET']

      // Check if the request method is allowed
      if (!allowedMethods.includes(request.method as string)) {
        return createResponse(null, 'Method Not Allowed', API_STATUS.METHOD_NOT_ALLOWED)
      }

      // Check if the request method is Authorized
      if (checkAuth) {
        const session: ISession | null = await getServerSession(authOptions)
        if (!session) {
          return createResponse(null, 'UnAuthorized', API_STATUS.UNAUTHORIZED)
        } else {
          request.user = session.user
        }
      }

      return await handler(request, params) // Pass params to the handler
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      // Handle server errors
      return createResponse(null, 'Something Went Wrong', API_STATUS.SERVER_ERROR)
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
