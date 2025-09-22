@echo off
echo 🚀 Deploying Movie Recommendation App to Railway...

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Railway CLI not found. Installing...
    npm install -g @railway/cli
)

REM Login to Railway
echo 🔐 Logging in to Railway...
railway login

REM Create new Railway project
echo 📦 Creating new Railway project...
railway new

REM Display environment variables info
echo ⚙️ Setting up environment variables...
echo Please set the following environment variables in Railway dashboard:
echo - MONGO_URI: Your MongoDB Atlas connection string
echo - JWT_SECRET: A secure random string
echo - TMDB_API_KEY: Your TMDB API key
echo - NODE_ENV: production

REM Deploy the application
echo 🌐 Deploying application...
railway up

echo ✅ Deployment initiated!
echo 🔗 Check your Railway dashboard for the deployment URL
pause