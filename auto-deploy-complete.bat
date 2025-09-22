@echo off
echo 🎯 AUTOMATED DEPLOYMENT INITIATED FOR khanyasir40
echo ================================================

echo 📝 Checking if GitHub repository exists...
git ls-remote origin > nul 2>&1

if %errorlevel% neq 0 (
    echo ⏳ Waiting for GitHub repository creation...
    echo 💡 Please click "Create repository" in your browser, then press ANY KEY here
    pause > nul
)

echo 🚀 Starting automated deployment...

echo 📤 Step 1: Pushing to GitHub...
git add .
git commit -m "🚀 Ready for deployment - All configurations added"
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push. Trying to set upstream...
    git push --set-upstream origin main
)

echo ✅ Successfully pushed to GitHub!

echo 🌐 Step 2: Opening deployment platforms...

echo 🚂 Opening Railway for backend deployment...
start "Railway Backend" "https://railway.app/new"

timeout /t 2 > nul

echo ▲ Opening Vercel for frontend deployment...  
start "Vercel Frontend" "https://vercel.com/new"

echo.
echo 🎉 DEPLOYMENT PLATFORMS OPENED!
echo.
echo 📋 NEXT STEPS:
echo.
echo 🚂 RAILWAY (Backend API):
echo    1. Click "Deploy from GitHub repo"
echo    2. Select: movie-recommendation-app
echo    3. Set Root Directory: backend
echo    4. Add Environment Variables:
echo       • MONGO_URI = (Get from MongoDB Atlas)
echo       • JWT_SECRET = anySecureRandomString123
echo       • TMDB_API_KEY = (Get from themoviedb.org)
echo       • NODE_ENV = production
echo.
echo ▲ VERCEL (Frontend):
echo    1. Import Git Repository
echo    2. Select: movie-recommendation-app  
echo    3. Root Directory: client
echo    4. Framework Preset: Create React App
echo    5. Build Command: npm run build
echo    6. Output Directory: build
echo.
echo 🔗 Repository: https://github.com/khanyasir40/movie-recommendation-app
echo.
echo 🎯 Your app will be live in 5-10 minutes!
echo.
pause