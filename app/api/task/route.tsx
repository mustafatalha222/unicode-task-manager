import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper } from '@/libApi/helper'
import { ITaskDetail } from '@/shared/interfaces/Task'
import Task from '@/libApi/models/Task'
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
import { IRequest } from '@/libApi/interfaces/Auth'

// Create a new task
const createTask = async (request: IRequest): Promise<NextResponse> => {
  try {
    const session = await getSession({ req: { headers: { cookie: request.headers.get('cookie') || '' } } })
    if (!session || !session.user) {
      return createResponse(null, 'User not authenticated', API_STATUS.UNAUTHORIZED)
    }

    // Parse the JSON data from the request
    const data: ITaskDetail = await request.json()
    const { title, description, assignedTo, priority, dueDate } = data
    const createdBy = request.user.id

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy,
      priority,
      dueDate,
    })
    await newTask.save()
    return createResponse({ message: 'Task created successfully' }, null, API_STATUS.SUCCESS)
  } catch (err) {
    console.error('Error creating task:', err)
    return createResponse(null, 'Failed to create task', API_STATUS.BAD_REQUEST)
  }
}

// Get all tasks
const getTasks = async (): Promise<NextResponse> => {
  const tasks = await Task.find()
  return createResponse(tasks, null, API_STATUS.SUCCESS)
}

// Update a task
const updateTask = async (request: IRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const { id } = params
  const data: ITaskDetail = await request.json()
  const { title, description, assignedTo, priority, dueDate } = data

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, assignedTo, priority, dueDate },
    { new: true }
  )

  if (!updatedTask) {
    return createResponse({ error: 'Task not found' }, null, API_STATUS.NOT_FOUND)
  }

  return createResponse({ message: 'Task updated successfully', task: updatedTask }, null, API_STATUS.SUCCESS)
}

// Delete a task
const deleteTask = async (request: IRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  const { id } = params

  const deletedTask = await Task.findByIdAndDelete(id)

  if (!deletedTask) {
    return createResponse({ error: 'Task not found' }, null, API_STATUS.NOT_FOUND)
  }

  return createResponse({ message: 'Task deleted successfully' }, null, API_STATUS.SUCCESS)
}

// Export API functions based on HTTP method
export const POST = apiWrapper(createTask)
export const GET = apiWrapper(getTasks)
export const PUT = apiWrapper(updateTask)
export const DELETE = apiWrapper(deleteTask)
