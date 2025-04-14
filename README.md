# 💬 Real-Time Chat Application

A real-time one-to-one chat application built with **Angular (Frontend)**, **Node.js (Backend)**, **MongoDB**, **Socket.IO**, and **JWT Authentication**. This app supports features like real-time messaging, user authentication, typing indicators, user online/offline status, and more.

---

## 🧰 Tech Stack

- **Frontend:** Angular
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Real-Time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Token)

---

## ⚙️ Features

- 🔐 User Registration & Login (JWT-based)
- 💬 One-to-One Real-Time Messaging
- 🟢 Online/Offline User Status
- ✍️ Typing Indicator
- 🧾 Chat History (Messages stored in MongoDB)

---

## 🛠️ Setup Instructions

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

### 🔁 Clone the Repository

```bash
git clone  https://github.com/shaikh7295/Chat-Application
cd chat-app
```

---

## 📦 Backend Setup

```bash
cd backend
npm install
```

### ➕ Create `.env` file

Create a `.env` file in the `backend/` directory and add the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatsystem
JWT_SECRET=123456789faisal
```

### ▶️ Start Backend Server

```bash
npm run src/server.js
```

Server will run on `http://localhost:5001`.

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
```

### ▶️ Run Angular App

```bash
ng serve
```

Frontend will run on `http://localhost:4200`.

---

## 🔐 Login Credentials (optional)

Register new users via the registration form or use pre-seeded credentials if provided in the DB.

---

## 🧪 Test It

- Open `http://localhost:4200` in two browser tabs.
- Login with two different users.
- Start a chat and test real-time messaging and typing indicators.

---

## 📁 Folder Structure

```
chat-app/
├/backend
  └── src/
      ├── config/         # DB and environment config
      ├── controller/     # Express controllers
      ├── middleware/     # Auth middleware (JWT)
      ├── model/          # Mongoose models (User, Message)
      ├── route/          # API routes
      ├── socket/         # Socket.IO event handling
      ├── utils/          # Helper functions
      ├── app.js          # Express setup
      └── server.js       # Entry point

/frontend
  └── src/app/
      ├── login/          # Login Component
      ├── chat-panel/     # Chat Component
      ├── services/       # API and Socket services
      ├── app.module.ts   # Root Angular module

```

---

## 🚀 Future Improvements

- Group Chats
- File Sharing
- Push Notifications
- Dark Mode UI

---

## 🙌 Credits

Developed with ❤️ using Angular, Node.js, and MongoDB.

---
