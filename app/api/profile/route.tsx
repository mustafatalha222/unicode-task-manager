import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper } from '@/libApi/helper'
import User from '@/libApi/models/User'
import { NextResponse } from 'next/server'
import { IRequest } from '@/libApi/interfaces/Auth'

// Update user name
const updateName = async (request: IRequest): Promise<NextResponse> => {
  try {
    const { name } = await request.json()
    const userId = request.user.id

    if (!name) return createResponse(null, 'Name is required', API_STATUS.BAD_REQUEST)

    const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true })
    if (!updatedUser) return createResponse({ error: 'User not found' }, null, API_STATUS.NOT_FOUND)

    return createResponse({ message: 'Name updated successfully', user: updatedUser }, null, API_STATUS.SUCCESS)
  } catch (err) {
    return createResponse(null, 'Failed to update name', API_STATUS.SERVER_ERROR)
  }
}

// Get the current user
const getCurrentUser = async (request: IRequest): Promise<NextResponse> => {
  const userId = request.user.id
  const user = await User.findById(userId)
  if (!user) {
    return createResponse({ error: 'User not found' }, null, API_STATUS.NOT_FOUND)
  }

  return createResponse(user, null, API_STATUS.SUCCESS)
}

// Export API functions based on request path or method
export const PUT = apiWrapper(updateName)
export const GET = apiWrapper(getCurrentUser)
