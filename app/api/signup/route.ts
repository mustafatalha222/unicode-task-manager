import { API_STATUS, saltRounds } from '@/libApi/constant'
import User from '@/libApi/models/User'
import { createResponse, apiWrapper } from '@/libApi/helper'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

interface UserRegistrationRequest {
  name: string
  email: string
  password: string
}

// Function to hash the password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}

const registerUser = async (request: Request): Promise<NextResponse> => {
  const { name, email, password }: UserRegistrationRequest = await request.json()

  // Check if user already exists
  if (await User.exists({ email })) {
    return createResponse(null, 'Email is already in use', API_STATUS.BAD_REQUEST)
  }

  // Hash password and create new user
  const hashedPassword = await hashPassword(password)
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  })

  await newUser.save()
  return createResponse({ message: 'User successfully registered' }, null, API_STATUS.SUCCESS)
}

// Exporting the POST method with database connection handling
export const POST = apiWrapper(registerUser, false)
