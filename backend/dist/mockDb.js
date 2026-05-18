"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, '../data.json');
// Simple In-Memory / JSON Store
class MockDb {
    data = { users: [], tasks: [], habits: [], moods: [] };
    constructor() {
        this.load();
    }
    load() {
        if (fs_1.default.existsSync(DB_PATH)) {
            this.data = JSON.parse(fs_1.default.readFileSync(DB_PATH, 'utf-8'));
        }
    }
    save() {
        fs_1.default.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
    }
    async find(collection, query = {}) {
        return this.data[collection].filter((item) => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }
    async findOne(collection, query = {}) {
        return this.data[collection].find((item) => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }
    async create(collection, payload) {
        const newItem = { _id: Math.random().toString(36).substr(2, 9), ...payload, createdAt: new Date() };
        this.data[collection].push(newItem);
        this.save();
        return newItem;
    }
    async update(collection, id, updates) {
        const index = this.data[collection].findIndex((item) => item._id === id);
        if (index > -1) {
            this.data[collection][index] = { ...this.data[collection][index], ...updates };
            this.save();
            return this.data[collection][index];
        }
        return null;
    }
    async delete(collection, id) {
        this.data[collection] = this.data[collection].filter((item) => item._id !== id);
        this.save();
    }
}
exports.db = new MockDb();
