import { API_STATUS } from '@/libApi/constant'
import User from '@/libApi/models/User'
import { createResponse, apiWrapper, hashPassword } from '@/libApi/helper'

import { NextResponse } from 'next/server'

interface UserRegistrationRequest {
  name: string
  email: string
  password: string
  provider?: string
}

const registerUser = async (request: Request): Promise<NextResponse> => {
  const { name, email, password }: UserRegistrationRequest = await request.json()

  // Check if user already exists
  if (await User.exists({ email })) {
    return createResponse(null, 'Email is already in use', API_STATUS.BAD_REQUEST)
  }

  // Hash password and create new user
  const hashedPassword = await hashPassword(password)
  await new User({
    name,
    email,
    password: hashedPassword,
  }).save()
  return createResponse({ message: 'User successfully registered' }, null, API_STATUS.SUCCESS)
}

// Exporting the POST method with database connection handling
export const POST = apiWrapper(registerUser, false)
