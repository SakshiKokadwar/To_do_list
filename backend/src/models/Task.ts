import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  dueDate?: Date;
  isPinned: boolean;
  isArchived: boolean;
  subtasks: { title: string; completed: boolean }[];
  tags: string[];
  xpReward: number;
}

const TaskSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'review', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  category: { type: String, default: 'Personal' },
  dueDate: { type: Date },
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  subtasks: [{ title: String, completed: { type: Boolean, default: false } }],
  tags: [String],
  xpReward: { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);
