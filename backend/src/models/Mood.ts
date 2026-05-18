import mongoose, { Schema, Document } from 'mongoose';

export interface IMood extends Document {
  userId: mongoose.Types.ObjectId;
  score: number; // 1-5
  note?: string;
  date: Date;
}

const MoodSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  note: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IMood>('Mood', MoodSchema);
