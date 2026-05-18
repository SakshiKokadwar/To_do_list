import mongoose from 'mongoose';
import User from './models/User';
import Task from './models/Task';
import Habit from './models/Habit';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb://localhost:27017/todoitx';

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected for seeding...');

    await User.deleteMany({});
    await Task.deleteMany({});
    await Habit.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = new User({
      name: 'Digvijay Patil',
      email: 'digvijay@example.com',
      password: hashedPassword,
      xp: 1240,
      level: 12,
    });
    await user.save();

    const tasks = [
      { userId: user._id, title: 'Design TO-DOIT X Landing Page', priority: 'high', category: 'Design', xpReward: 50 },
      { userId: user._id, title: 'Implement AI Task Parser', priority: 'high', category: 'Coding', xpReward: 100 },
      { userId: user._id, title: 'Research Gamification Mechanics', priority: 'medium', category: 'Research', xpReward: 30 },
      { userId: user._id, title: 'Write Documentation', priority: 'low', category: 'Admin', xpReward: 20 },
    ];
    await Task.insertMany(tasks);

    const habits = [
      { userId: user._id, name: 'Reading', color: '#f97316', streak: 5 },
      { userId: user._id, name: 'Workout', color: '#3b82f6', streak: 2 },
      { userId: user._id, name: 'Coding', color: '#7c3aed', streak: 12 },
    ];
    await Habit.insertMany(habits);

    console.log('✅ Seeding complete!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
