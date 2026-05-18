import { Router } from 'express';
import { getHabits, createHabit, toggleHabit, deleteHabit } from '../controllers/habit.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get('/', getHabits);
router.post('/', createHabit);
router.patch('/:id/toggle', toggleHabit);
router.delete('/:id', deleteHabit);

export default router;