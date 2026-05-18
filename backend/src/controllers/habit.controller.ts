import { Request, Response } from 'express';
import { db } from '../mockDb';

export const getHabits = async (req: any, res: Response) => {
  try {
    const habits = await db.find('habits', { userId: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits' });
  }
};

export const createHabit = async (req: any, res: Response) => {
  try {
    const newHabit = await db.create('habits', { ...req.body, userId: req.user.id, streak: 0, completedDates: [] });
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating habit' });
  }
};

export const toggleHabit = async (req: any, res: Response) => {
  try {
    const habit = await db.findOne('habits', { _id: req.params.id, userId: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const today = new Date().toDateString();
    const completedDates = habit.completedDates || [];
    const dateIndex = completedDates.findIndex((d: string) => new Date(d).toDateString() === today);

    let streak = habit.streak || 0;
    if (dateIndex > -1) {
      completedDates.splice(dateIndex, 1);
      streak = Math.max(0, streak - 1);
    } else {
      completedDates.push(new Date().toISOString());
      streak += 1;
      // Award XP
      const user = await db.findOne('users', { _id: req.user.id });
      if (user) {
        await db.update('users', user._id, { xp: user.xp + 5 });
      }
    }

    const updated = await db.update('habits', habit._id, { completedDates, streak });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling habit' });
  }
};

export const deleteHabit = async (req: any, res: Response) => {
  try {
    await db.delete('habits', req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit' });
  }
};
