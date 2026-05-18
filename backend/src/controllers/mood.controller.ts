import { Request, Response } from 'express';
import { db } from '../mockDb';

export const getMoods = async (req: any, res: Response) => {
  try {
    const moods = await db.find('moods', { userId: req.user.id });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching moods' });
  }
};

export const logMood = async (req: any, res: Response) => {
  try {
    const today = new Date().toDateString();
    const moods = await db.find('moods', { userId: req.user.id });
    const existingMood = moods.find((m: any) => new Date(m.date).toDateString() === today);

    if (existingMood) {
      const updated = await db.update('moods', existingMood._id, { score: req.body.score, note: req.body.note });
      return res.json(updated);
    }

    const newMood = await db.create('moods', { ...req.body, userId: req.user.id, date: new Date().toISOString() });
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: 'Error logging mood' });
  }
};
