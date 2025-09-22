@echo off
echo 🚀 Automated Deployment Script for khanyasir40
echo ===============================================

echo 📤 Step 1: Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub. Please check if repository exists.
    pause
    exit /b 1
)

echo ✅ Successfully pushed to GitHub!
echo 🔗 Repository: https://github.com/khanyasir40/movie-recommendation-app

echo.
echo 🌐 Step 2: Opening deployment platforms...
echo Opening Railway for backend deployment...
start https://railway.app/new

echo Opening Vercel for frontend deployment...
start https://vercel.com/new

echo.
echo 📋 DEPLOYMENT INSTRUCTIONS:
echo.
echo 🚂 RAILWAY (Backend):
echo 1. Click "Deploy from GitHub repo"
echo 2. Select: khanyasir40/movie-recommendation-app
echo 3. Set Root Directory: /backend
echo 4. Add environment variables:
echo    - MONGO_URI: (MongoDB Atlas connection string)
echo    - JWT_SECRET: (any secure random string)
echo    - TMDB_API_KEY: (get from themoviedb.org)
echo    - NODE_ENV: production
echo.
echo ▲ VERCEL (Frontend):
echo 1. Import from GitHub: khanyasir40/movie-recommendation-app
echo 2. Set Root Directory: /client
echo 3. Framework: React
echo 4. Build Command: npm run build
echo 5. Output Directory: build
echo.
echo 🎯 Both deployments will be live in 5-10 minutes!

pause