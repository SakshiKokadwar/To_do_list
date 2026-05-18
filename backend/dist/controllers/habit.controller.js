"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabit = exports.toggleHabit = exports.createHabit = exports.getHabits = void 0;
const mockDb_1 = require("../mockDb");
const getHabits = async (req, res) => {
    try {
        const habits = await mockDb_1.db.find('habits', { userId: req.user.id });
        res.json(habits);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching habits' });
    }
};
exports.getHabits = getHabits;
const createHabit = async (req, res) => {
    try {
        const newHabit = await mockDb_1.db.create('habits', { ...req.body, userId: req.user.id, streak: 0, completedDates: [] });
        res.status(201).json(newHabit);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating habit' });
    }
};
exports.createHabit = createHabit;
const toggleHabit = async (req, res) => {
    try {
        const habit = await mockDb_1.db.findOne('habits', { _id: req.params.id, userId: req.user.id });
        if (!habit)
            return res.status(404).json({ message: 'Habit not found' });
        const today = new Date().toDateString();
        const completedDates = habit.completedDates || [];
        const dateIndex = completedDates.findIndex((d) => new Date(d).toDateString() === today);
        let streak = habit.streak || 0;
        if (dateIndex > -1) {
            completedDates.splice(dateIndex, 1);
            streak = Math.max(0, streak - 1);
        }
        else {
            completedDates.push(new Date().toISOString());
            streak += 1;
            // Award XP
            const user = await mockDb_1.db.findOne('users', { _id: req.user.id });
            if (user) {
                await mockDb_1.db.update('users', user._id, { xp: user.xp + 5 });
            }
        }
        const updated = await mockDb_1.db.update('habits', habit._id, { completedDates, streak });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: 'Error toggling habit' });
    }
};
exports.toggleHabit = toggleHabit;
const deleteHabit = async (req, res) => {
    try {
        await mockDb_1.db.delete('habits', req.params.id);
        res.json({ message: 'Habit deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting habit' });
    }
};
exports.deleteHabit = deleteHabit;
