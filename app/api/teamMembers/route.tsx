import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper } from '@/libApi/helper'
import { IRequest } from '@/libApi/interfaces/Auth'
import TeamMember from '@/libApi/models/TeamMember'
import { ITeamMemberDetail } from '@/shared/interfaces/TeamMember'
import { NextResponse } from 'next/server'

const createTeamMember = async (request: IRequest): Promise<NextResponse> => {
  try {
    const { user, role, message } = await request.json()
    await new TeamMember({
      user,
      role,
      message,
      createdBy: request.user.id,
    }).save()

    return createResponse({ message: 'Team member created successfully' }, null, API_STATUS.SUCCESS)
  } catch (err) {
    return createResponse(null, 'Failed to create team members', API_STATUS.BAD_REQUEST)
  }
}

const updateTeamMember = async (request: IRequest): Promise<NextResponse> => {
  const { _id, role, message, user } = (await request.json()) as Partial<ITeamMemberDetail>
  // Find the team member by ID and update
  const updatedTeamMember = await TeamMember.findByIdAndUpdate(
    _id,
    { role, message, user },
    { new: true } // Return the updated document
  )

  if (!updatedTeamMember) return createResponse({ error: 'Team member not found' }, null, API_STATUS.NOT_FOUND)
  return createResponse({ message: 'Team member updated successfully' }, null, API_STATUS.SUCCESS)
}

// Get My Team Members
const getMyTeamMembers = async (request: IRequest): Promise<NextResponse> => {
  const myUserId = request.user.id
  // Populate User details
  const members = await TeamMember.find({ createdBy: myUserId }).populate('user', 'name email')
  return createResponse(members, null, API_STATUS.SUCCESS)
}

export const GET = apiWrapper(getMyTeamMembers)
export const POST = apiWrapper(createTeamMember)
export const PUT = apiWrapper(updateTeamMember)
