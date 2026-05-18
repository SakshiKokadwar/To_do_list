"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const mockDb_1 = require("../mockDb");
const getTasks = async (req, res) => {
    try {
        const tasks = await mockDb_1.db.find('tasks', { userId: req.user.id });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Fetch error' });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    try {
        const task = await mockDb_1.db.create('tasks', { ...req.body, userId: req.user.id, xpReward: 10, status: 'pending' });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Create error' });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const task = await mockDb_1.db.update('tasks', req.params.id, req.body);
        if (req.body.status === 'completed' && task) {
            const user = await mockDb_1.db.findOne('users', { _id: req.user.id });
            if (user) {
                const newXp = user.xp + (task.xpReward || 10);
                const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
                await mockDb_1.db.update('users', user._id, { xp: newXp, level: newLevel });
            }
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Update error' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        await mockDb_1.db.delete('tasks', req.params.id);
        res.json({ message: 'Deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Delete error' });
    }
};
exports.deleteTask = deleteTask;
