import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  color: string;
  streak: number;
  completedDates: Date[];
}

const HabitSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  color: { type: String, default: '#7c3aed' },
  streak: { type: Number, default: 0 },
  completedDates: [Date],
}, { timestamps: true });

export default mongoose.model<IHabit>('Habit', HabitSchema);
