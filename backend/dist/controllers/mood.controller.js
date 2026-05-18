"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMood = exports.getMoods = void 0;
const mockDb_1 = require("../mockDb");
const getMoods = async (req, res) => {
    try {
        const moods = await mockDb_1.db.find('moods', { userId: req.user.id });
        res.json(moods);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching moods' });
    }
};
exports.getMoods = getMoods;
const logMood = async (req, res) => {
    try {
        const today = new Date().toDateString();
        const moods = await mockDb_1.db.find('moods', { userId: req.user.id });
        const existingMood = moods.find((m) => new Date(m.date).toDateString() === today);
        if (existingMood) {
            const updated = await mockDb_1.db.update('moods', existingMood._id, { score: req.body.score, note: req.body.note });
            return res.json(updated);
        }
        const newMood = await mockDb_1.db.create('moods', { ...req.body, userId: req.user.id, date: new Date().toISOString() });
        res.status(201).json(newMood);
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging mood' });
    }
};
exports.logMood = logMood;
