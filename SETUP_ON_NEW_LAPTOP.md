# 🚀 Setup Movie App on Any New Laptop

This guide will help you clone and run your movie recommendation app on any laptop from your GitHub repository.

## 📋 Prerequisites

Before starting, make sure the new laptop has:

### 1. Install Node.js
- Go to https://nodejs.org/
- Download and install the **LTS version** (recommended)
- Verify installation:
```bash
node --version
npm --version
```

### 2. Install Git
- Go to https://git-scm.com/
- Download and install Git
- Verify installation:
```bash
git --version
```

### 3. Choose a Code Editor (Optional but recommended)
- **VS Code**: https://code.visualstudio.com/
- **Atom**: https://atom.io/
- Or any editor you prefer

## 🔄 Step-by-Step Setup Process

### Step 1: Clone Your Repository

Open terminal/command prompt and run:

```bash
# Clone your repository
git clone https://github.com/khanyasir40/moviefinal.git

# Navigate to the project folder
cd moviefinal
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file (Windows)
echo. > .env

# Create .env file (Mac/Linux)
touch .env
```

Add your MongoDB connection string to the `.env` file:
```
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

### Step 3: Install Dependencies

#### Install Backend Dependencies:
```bash
# Navigate to backend folder
cd backend

# Install all backend dependencies
npm install

# Go back to root directory
cd ..
```

#### Install Frontend Dependencies:
```bash
# Navigate to frontend folder
cd frontend

# Install all frontend dependencies
npm install

# Go back to root directory
cd ..
```

### Step 4: Run the Application

You have two options to run the app:

#### Option A: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on: http://localhost:3000

#### Option B: Run Both Together (if you have concurrently installed)

From the root directory:
```bash
npm run dev
```

## 🌐 Access Your App

Once both servers are running:

1. **Frontend (User Interface)**: http://localhost:3000
2. **Backend API**: http://localhost:5000
3. **Health Check**: http://localhost:5000/health

## 🔧 Troubleshooting Common Issues

### Issue 1: Port Already in Use
If you get "port already in use" error:

**For Backend (Port 5000):**
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux - Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**For Frontend (Port 3000):**
```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux - Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue 2: npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 3: Database Connection Issues
- Make sure your `.env` file has the correct MongoDB URI
- Check if your IP address is whitelisted in MongoDB Atlas
- Verify internet connection

### Issue 4: CORS Issues
If you get CORS errors, make sure both frontend and backend are running on the specified ports.

## 📁 Project Structure Overview

```
moviefinal/
├── backend/                 # Node.js Express server
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/               # React source code
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── .env                   # Environment variables
└── README.md             # Project documentation
```

## 🔑 Important Files to Check

1. **`.env`** - Contains database connection string
2. **`backend/server.js`** - Main backend server
3. **`frontend/src/App.js`** - Main React component
4. **`package.json`** files - Dependencies and scripts

## 🚀 Quick Start Commands Summary

```bash
# 1. Clone repository
git clone https://github.com/khanyasir40/moviefinal.git
cd moviefinal

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. Install frontend dependencies
cd frontend && npm install && cd ..

# 4. Create .env file with your MongoDB URI

# 5. Start backend (Terminal 1)
cd backend && npm start

# 6. Start frontend (Terminal 2)
cd frontend && npm start

# 7. Open browser to http://localhost:3000
```

## 🌍 Features You Can Use

Once running, you can:
- ✅ Browse movies
- ✅ Search for movies
- ✅ Create user accounts
- ✅ Login/logout
- ✅ Add movies to favorites
- ✅ Get movie recommendations
- ✅ View movie details

## 🆘 Need Help?

If you encounter any issues:
1. Check the terminal for error messages
2. Make sure all dependencies are installed
3. Verify your `.env` file is correct
4. Ensure both backend and frontend are running
5. Check if ports 3000 and 5000 are available

## 🔄 Updating Your Local Copy

To get the latest changes from GitHub:

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies if package.json changed
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

---

**🎉 That's it! Your movie app should now be running on the new laptop!**

The app will have the same features and database as your original setup since it connects to the same MongoDB Atlas database.