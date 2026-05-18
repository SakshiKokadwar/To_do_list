import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../mockDb';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existing = await db.findOne('users', { email });
    if (existing) return res.status(400).json({ message: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.create('users', { 
      name, email, password: hashedPassword, xp: 0, level: 1, streak: 0 
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, name, email, xp: 0, level: 1 } });
  } catch (error) {
    res.status(500).json({ message: 'Register error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await db.findOne('users', { email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email, xp: user.xp, level: user.level } });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await db.findOne('users', { _id: req.user.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user._id, name: user.name, email: user.email, xp: user.xp, level: user.level });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
