import { NextResponse } from 'next/server'
import connect from './connect'
import { API_STATUS } from './constant'

// A higher-order function to handle database connections and errors
export const withDb = (handler: (request: Request) => Promise<NextResponse>) => {
  return async (request: Request) => {
    try {
      await connect() // Ensure the database connection
      return await handler(request)
    } catch (error) {
      console.error('Database connection error:', error)
      return createResponse(null, 'Internal Server Error', API_STATUS.SERVER_ERROR)
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
