"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mockDb_1 = require("../mockDb");
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await mockDb_1.db.findOne('users', { email });
        if (existing)
            return res.status(400).json({ message: 'User exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await mockDb_1.db.create('users', {
            name, email, password: hashedPassword, xp: 0, level: 1, streak: 0
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        res.status(201).json({ token, user: { id: user._id, name, email, xp: 0, level: 1 } });
    }
    catch (error) {
        res.status(500).json({ message: 'Register error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mockDb_1.db.findOne('users', { email });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, email, xp: user.xp, level: user.level } });
    }
    catch (error) {
        res.status(500).json({ message: 'Login error' });
    }
};
exports.login = login;
