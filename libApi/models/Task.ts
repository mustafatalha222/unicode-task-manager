import { ITaskDetail, ITaskPriority, ITaskStatus } from '@/shared/interfaces/Task'
import mongoose, { Schema } from 'mongoose'

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: Object.values(ITaskStatus), default: ITaskStatus.Todo },
  priority: { type: String, enum: Object.values(ITaskPriority), default: ITaskPriority.Medium },
  dueDate: { type: Date },
})

export default mongoose.model<ITaskDetail>('Task', TaskSchema)
