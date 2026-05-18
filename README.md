# 🚀 TO-DOIT X — AI-Powered Premium Productivity Suite

TO-DOIT X is a next-generation, full-stack productivity platform designed with a high-end **Glassmorphic Bento Grid** interface. It combines advanced task management with AI-driven natural language parsing, gamification (RPG-style leveling), and deep-work tools to help you conquer your day.

![Premium Dashboard](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

---

## ✨ Key Features

### 🧠 AI Smart Entry
Type tasks naturally like `!high #work Complete project audit @tomorrow`. Our smart parser automatically detects priority, categories, and deadlines.

### 📋 Workflow Management
- **Bento Dashboard**: A unified view of your focus, habits, and digital growth.
*   **Kanban Board**: Drag-and-drop tasks through stages (Pending ➜ In Progress ➜ Review ➜ Completed).
*   **Subtasks & Details**: Break down complex objectives into manageable steps.

### 🎮 Gamification & Digital Garden
*   **XP & Leveling**: Earn experience points for every task and habit completed.
*   **Digital Garden**: Watch your virtual plant grow as you gain XP and level up.
*   **Habit Tracker**: Build consistency with daily streaks and visual progress bars.

### ⏱️ Deep Work Tools
*   **Pomodoro Timer**: Functional focus timer with customizable sessions.
*   **Mood Journal**: Track your daily emotional state with notes and history.
*   **Analytics Hub**: Real-time velocity and distribution charts via Chart.js.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS v3 + DaisyUI v4
- **Animations**: Framer Motion + GSAP
- **State Management**: Zustand
- **Visualization**: Chart.js

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Auth**: JWT (JSON Web Tokens) + Bcryptjs
- **Database**: Zero-Config JSON Mock DB (easily switchable to MongoDB)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### 2. Installation
Clone the repository and install dependencies for both frontend and backend:

```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 3. Running the Application
The project is configured with a **Mock Database**, so no external database installation is required for local development.

**Start the Backend:**
```bash
cd backend
npm run dev
```
*Server will run on `http://localhost:5000`*

**Start the Frontend:**
```bash
cd frontend
npm run dev
```
*App will run on `http://localhost:5173` (or `5174` if 5173 is busy)*

---

## 🔒 Security & Performance
- **JWT Auth**: Secure session management via localized tokens.
- **PWA Support**: Installable on desktop/mobile with offline asset caching.
- **Glassmorphism**: Optimized backdrop-blur effects for a premium feel without performance lag.

## 📝 License
MIT License. Built with ❤️ for extreme productivity.
