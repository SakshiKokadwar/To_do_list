import { Router } from 'express';
import { getMoods, logMood } from '../controllers/mood.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);
router.get('/', getMoods);
router.post('/', logMood);

export default router;