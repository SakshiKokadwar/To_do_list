import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin: Date;
  unlockedThemes: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now },
  unlockedThemes: { type: [String], default: ['light', 'dark', 'glass'] },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
