import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import habitRoutes from './routes/habit.routes';
import moodRoutes from './routes/mood.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/mood', moodRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', db: 'mock' }));

app.listen(PORT, () => {
  console.log(`🚀 Mock Server running on http://localhost:${PORT}`);
});
