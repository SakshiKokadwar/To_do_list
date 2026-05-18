"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const Task_1 = __importDefault(require("./models/Task"));
const Habit_1 = __importDefault(require("./models/Habit"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const MONGODB_URI = 'mongodb://localhost:27017/todoitx';
const seed = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected for seeding...');
        await User_1.default.deleteMany({});
        await Task_1.default.deleteMany({});
        await Habit_1.default.deleteMany({});
        const hashedPassword = await bcryptjs_1.default.hash('password123', 12);
        const user = new User_1.default({
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
        await Task_1.default.insertMany(tasks);
        const habits = [
            { userId: user._id, name: 'Reading', color: '#f97316', streak: 5 },
            { userId: user._id, name: 'Workout', color: '#3b82f6', streak: 2 },
            { userId: user._id, name: 'Coding', color: '#7c3aed', streak: 12 },
        ];
        await Habit_1.default.insertMany(habits);
        console.log('✅ Seeding complete!');
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seed();
