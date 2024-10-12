import { IRole, ITeamMemberDetail } from '@/shared/interfaces/TeamMember'
import mongoose, { Schema, Document } from 'mongoose'

interface TeamMemberDocument extends ITeamMemberDetail, Document {}

const TeamMemberSchema = new Schema<TeamMemberDocument>(
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

const TeamMember = mongoose.models.TeamMember || mongoose.model<TeamMemberDocument>('TeamMember', TeamMemberSchema)

export default TeamMember
