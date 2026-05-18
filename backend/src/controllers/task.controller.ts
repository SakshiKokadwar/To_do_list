import { Request, Response } from 'express';
import { db } from '../mockDb';

export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await db.find('tasks', { userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Fetch error' });
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const task = await db.create('tasks', { ...req.body, userId: req.user.id, xpReward: 10, status: 'pending' });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Create error' });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await db.update('tasks', req.params.id, req.body);
    
    if (req.body.status === 'completed' && task) {
       const user = await db.findOne('users', { _id: req.user.id });
       if (user) {
          const newXp = user.xp + (task.xpReward || 10);
          const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
          await db.update('users', user._id, { xp: newXp, level: newLevel });
       }
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Update error' });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    await db.delete('tasks', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete error' });
  }
};
