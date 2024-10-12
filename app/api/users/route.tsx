import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper } from '@/libApi/helper'
import User from '@/libApi/models/User'
import { NextResponse } from 'next/server'

// Get all users
const getUsers = async (): Promise<NextResponse> => {
  const users = await User.find()

  return createResponse(users, null, API_STATUS.SUCCESS)
}

// Export API functions based on HTTP
export const GET = apiWrapper(getUsers)
