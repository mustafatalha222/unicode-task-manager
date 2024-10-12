import mongoose from 'mongoose'

export interface ITaskDetail {
  title: string
  description?: string
  assignedTo: mongoose.Types.ObjectId
  createdBy: mongoose.Types.ObjectId
  status: ITaskStatus
  priority: ITaskPriority
  dueDate?: Date
}

export type ITask = Omit<ITaskDetail, 'assignedTo' | 'createdBy'> & {
  assignedTo: string
  createdBy?: string
  _id?: string
}

export enum ITaskStatus {
  Todo = 'todo',
  Pending = 'pending',
  InProgress = 'inprogress',
  Completed = 'completed',
}

export enum ITaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}
