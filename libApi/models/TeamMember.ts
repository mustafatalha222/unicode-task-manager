import { IRole } from '@/shared/interfaces/TeamMember'
import mongoose, { Schema } from 'mongoose'

const TeamMemberSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: Object.values(IRole), required: true, default: IRole.Member },
    message: { type: String, default: '' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
)

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema)

export default TeamMember
