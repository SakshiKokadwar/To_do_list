import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, '../data.json');

// Simple In-Memory / JSON Store
class MockDb {
  data: any = { users: [], tasks: [], habits: [], moods: [] };

  constructor() {
    this.load();
  }

  load() {
    if (fs.existsSync(DB_PATH)) {
      this.data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }
  }

  save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  async find(collection: string, query: any = {}) {
    return this.data[collection].filter((item: any) => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async findOne(collection: string, query: any = {}) {
    return this.data[collection].find((item: any) => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async create(collection: string, payload: any) {
    const newItem = { _id: Math.random().toString(36).substr(2, 9), ...payload, createdAt: new Date() };
    this.data[collection].push(newItem);
    this.save();
    return newItem;
  }

  async update(collection: string, id: string, updates: any) {
    const index = this.data[collection].findIndex((item: any) => item._id === id);
    if (index > -1) {
      this.data[collection][index] = { ...this.data[collection][index], ...updates };
      this.save();
      return this.data[collection][index];
    }
    return null;
  }

  async delete(collection: string, id: string) {
    this.data[collection] = this.data[collection].filter((item: any) => item._id !== id);
    this.save();
  }
}

export const db = new MockDb();
