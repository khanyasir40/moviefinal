@echo off
echo =====================================
echo   Movie App Quick Setup Script
echo =====================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo Please install Git from https://git-scm.com/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js and Git are installed!
echo.

:: Check if .env file exists
if not exist ".env" (
    echo 📝 Creating .env file...
    echo MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true^&w=majority^&appName=Cluster0 > .env
    echo NODE_ENV=development >> .env
    echo ✅ .env file created!
) else (
    echo ✅ .env file already exists!
)
echo.

:: Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if exist "package.json" (
    npm install
    if %errorlevel% equ 0 (
        echo ✅ Backend dependencies installed!
    ) else (
        echo ❌ Failed to install backend dependencies!
        cd ..
        pause
        exit /b 1
    )
) else (
    echo ❌ backend/package.json not found!
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
if exist "package.json" (
    npm install
    if %errorlevel% equ 0 (
        echo ✅ Frontend dependencies installed!
    ) else (
        echo ❌ Failed to install frontend dependencies!
        cd ..
        pause
        exit /b 1
    )
) else (
    echo ❌ frontend/package.json not found!
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo =====================================
echo   ✅ Setup Complete!
echo =====================================
echo.
echo To run your movie app:
echo.
echo 1. Open TWO terminals/command prompts
echo.
echo 2. In Terminal 1 (Backend):
echo    cd backend
echo    npm start
echo.
echo 3. In Terminal 2 (Frontend):
echo    cd frontend
echo    npm start
echo.
echo 4. Open browser to: http://localhost:3000
echo.
echo =====================================
echo.
pause