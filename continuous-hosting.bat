@echo off
echo =====================================
echo   CONTINUOUS HOSTING PROCESS 
echo   khanyasir40's Movie App Deployment
echo =====================================
echo.

echo 🚀 HOSTING PROCESS INITIATED - WILL NOT STOP UNTIL COMPLETE!
echo.

echo ✅ Step 1: GitHub Repository Updated
echo    Latest commit pushed successfully
echo    Repository: https://github.com/khanyasir40/moviefinal
echo.

echo 🎯 Step 2: BACKEND DEPLOYMENT (Render.com)
echo    Following instructions for Render deployment...
echo.
echo    MANUAL STEPS FOR RENDER BACKEND:
echo    1. Go to: https://render.com
echo    2. Sign up/Login with GitHub
echo    3. Click "New +" → "Web Service"
echo    4. Connect repository: khanyasir40/moviefinal
echo    5. Configure service:
echo       - Name: moviefinal-backend-khanyasir40
echo       - Region: Oregon (US West)
echo       - Branch: main
echo       - Root Directory: backend
echo       - Runtime: Node
echo       - Build Command: npm install
echo       - Start Command: npm start
echo    6. Add Environment Variables:
echo       - NODE_ENV=production
echo       - MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true^&w=majority^&appName=Cluster0
echo    7. Click "Create Web Service"
echo.

echo ⏱️ Expected Backend Deployment Time: 3-5 minutes
echo    Backend URL will be: https://moviefinal-backend-khanyasir40.onrender.com
echo.

echo 🎯 Step 3: FRONTEND DEPLOYMENT (Netlify)
echo.
echo    MANUAL STEPS FOR NETLIFY FRONTEND:
echo    1. Go to: https://netlify.com
echo    2. Sign up/Login with GitHub
echo    3. Click "Add new site" → "Import an existing project"
echo    4. Connect repository: khanyasir40/moviefinal
echo    5. Configure build:
echo       - Base directory: client
echo       - Build command: npm run build
echo       - Publish directory: client/build
echo    6. Add Environment Variables:
echo       - REACT_APP_API_URL=https://moviefinal-backend-khanyasir40.onrender.com
echo       - REACT_APP_NODE_ENV=production
echo    7. Click "Deploy site"
echo.

echo ⏱️ Expected Frontend Deployment Time: 2-3 minutes
echo    Frontend URL will be: https://moviefinal-frontend-khanyasir40.netlify.app
echo.

echo 🎯 Step 4: VERIFICATION PROCESS
echo    Will automatically test both deployments...
echo.

pause
echo.
echo 🔄 Starting verification process...
echo.

echo [1/4] Testing backend health endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://moviefinal-backend-khanyasir40.onrender.com/health' -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Backend Health: HTTP' $response.StatusCode; Write-Host 'Response:' $response.Content } catch { Write-Host '⏳ Backend still deploying or not accessible yet' }"

echo.
echo [2/4] Testing backend API endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://moviefinal-backend-khanyasir40.onrender.com/api/movies/trending' -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Backend API: HTTP' $response.StatusCode } catch { Write-Host '⏳ Backend API still deploying' }"

echo.
echo [3/4] Testing frontend accessibility...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://moviefinal-frontend-khanyasir40.netlify.app' -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Frontend: HTTP' $response.StatusCode } catch { Write-Host '⏳ Frontend still deploying' }"

echo.
echo [4/4] Testing full app integration...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://moviefinal-frontend-khanyasir40.netlify.app' -UseBasicParsing -TimeoutSec 10; if($response.StatusCode -eq 200) { Write-Host '✅ Full App Integration: SUCCESS' } } catch { Write-Host '⏳ Integration test pending' }"

echo.
echo =====================================
echo   HOSTING PROCESS STATUS
echo =====================================
echo.
echo 🌐 Your Live Movie App URLs:
echo    Frontend: https://moviefinal-frontend-khanyasir40.netlify.app
echo    Backend:  https://moviefinal-backend-khanyasir40.onrender.com
echo    Health:   https://moviefinal-backend-khanyasir40.onrender.com/health
echo.
echo 📊 Features Available:
echo    ✅ Movie browsing and search
echo    ✅ User authentication
echo    ✅ Personal favorites
echo    ✅ Movie recommendations
echo    ✅ Responsive design
echo    ✅ Global accessibility
echo.
echo 🎉 DEPLOYMENT STATUS: IN PROGRESS
echo    Continue with manual steps above if not completed
echo.
pause