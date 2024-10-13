import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper, hashPassword } from '@/libApi/helper'
import User from '@/libApi/models/User'
import { NextResponse } from 'next/server'
import { IRequest } from '@/libApi/interfaces/Auth'
import bcrypt from 'bcrypt'

// Update user password
const updatePassword = async (request: IRequest): Promise<NextResponse> => {
  try {
    const { oldPassword, newPassword } = await request.json()
    const userId = request.user.id

    const user = await User.findById(userId)
    if (!user) return createResponse({ error: 'User not found' }, null, API_STATUS.NOT_FOUND)

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) return createResponse({ error: 'Old password is incorrect' }, null, API_STATUS.BAD_REQUEST)

    user.password = await hashPassword(newPassword)
    await user.save()

    return createResponse({ message: 'Password updated successfully' }, null, API_STATUS.SUCCESS)
  } catch (err) {
    return createResponse(null, 'Failed to update password', API_STATUS.BAD_REQUEST)
  }
}

// Export API function
export const PUT = apiWrapper(updatePassword)
