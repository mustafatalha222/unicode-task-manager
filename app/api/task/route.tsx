import { API_STATUS } from '@/libApi/constant'
import { createResponse, apiWrapper } from '@/libApi/helper'
import { ITask, ITaskDetail } from '@/shared/interfaces/Task'
import Task from '@/libApi/models/Task'
import { NextResponse } from 'next/server'
import { IRequest } from '@/libApi/interfaces/Auth'

// Create a new task
const createTask = async (request: IRequest): Promise<NextResponse> => {
  try {
    // Parse the JSON data from the request
    const data: ITaskDetail = await request.json()
    const { title, description, assignedTo, priority, dueDate, status } = data

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy: request.user.id,
      priority,
      status,
      dueDate,
    })
    await newTask.save()
    return createResponse({ message: 'Task created successfully' }, null, API_STATUS.SUCCESS)
  } catch (err) {
    console.error('Error creating task:', err)
    return createResponse(null, 'Failed to create task', API_STATUS.BAD_REQUEST)
  }
}

// Get all tasks belongs to user
const getTasks = async (request: IRequest): Promise<NextResponse> => {
  const userId = request.user.id
  // Sort by decending date
  const tasks = await Task.find({
    $or: [{ createdBy: userId }, { assignTo: userId }],
  }).sort({ updatedAt: -1 })
  return createResponse(tasks, null, API_STATUS.SUCCESS)
}

// Get a single task by ID
const getTaskById = async (request: IRequest, params: { id: string }): Promise<NextResponse> => {
  const { id } = params
  const task = await Task.findById(id)

  if (!task) return createResponse({ error: 'Task not found' }, null, API_STATUS.NOT_FOUND)
  return createResponse(task, null, API_STATUS.SUCCESS)
}

// Update a task
const updateTask = async (request: IRequest): Promise<NextResponse> => {
  const data: ITask = await request.json()
  const { title, description, assignedTo, priority, dueDate, _id, status } = data

  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    { title, description, assignedTo, priority, dueDate, status },
    { new: true }
  )

  if (!updatedTask) return createResponse({ error: 'Task not found' }, null, API_STATUS.NOT_FOUND)
  return createResponse({ message: 'Task updated successfully', task: updatedTask }, null, API_STATUS.SUCCESS)
}

// Delete a task
const deleteTask = async (request: IRequest): Promise<NextResponse> => {
  const data: ITask = await request.json()
  const deletedTask = await Task.findByIdAndDelete(data._id)

  if (!deletedTask) return createResponse({ error: 'Task not found' }, null, API_STATUS.NOT_FOUND)

  return createResponse({ message: 'Task deleted successfully' }, null, API_STATUS.SUCCESS)
}

// Export API functions based on HTTP method
export const POST = apiWrapper(createTask)
export const GET = apiWrapper(getTasks)
export const GET_SINGLE = apiWrapper(getTaskById)
export const PUT = apiWrapper(updateTask)
export const DELETE = apiWrapper(deleteTask)
