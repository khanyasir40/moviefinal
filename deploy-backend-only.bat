@echo off
echo 🚂 RAILWAY BACKEND DEPLOYMENT FOR khanyasir40
echo =============================================

echo 📁 Current directory structure check:
echo ✅ backend/ folder exists
echo ✅ backend/package.json ready
echo ✅ backend/server.js ready

echo.
echo 🔧 RAILWAY CONFIGURATION STEPS:
echo.
echo 1. Go to Railway dashboard: https://railway.app/dashboard
echo 2. Find your project: moviefinal
echo 3. Click on the service
echo 4. Go to Settings tab
echo 5. Find "Root Directory" or "Source Directory"
echo 6. Change from "/" to "backend"
echo 7. Save the changes
echo.
echo 🌐 ENVIRONMENT VARIABLES TO ADD:
echo MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true^&w=majority^&appName=Cluster0
echo JWT_SECRET=movieapp_super_secret_key_2024_change_in_production
echo TMDB_API_KEY=e76573d78b5046bbab827df2265a6940
echo NODE_ENV=production
echo.
echo 📤 After configuration, trigger redeploy:
echo 1. Go to Deployments tab
echo 2. Click "Redeploy" button
echo 3. Monitor build logs
echo.
echo 🎯 EXPECTED RESULT:
echo ✅ Build will use backend/package.json
echo ✅ Server starts with "node server.js"
echo ✅ Health check at /health endpoint
echo ✅ Backend API available at https://[service-name].railway.app
echo.
echo 📋 IF RAILWAY INTERFACE DOESN'T HAVE ROOT DIRECTORY OPTION:
echo 1. Delete current service
echo 2. Create new service
echo 3. Select GitHub repo: khanyasir40/moviefinal
echo 4. Set Root Directory to "backend" during setup
echo.
echo 🚀 Your backend will be live at: https://[your-service-name].railway.app
echo 🔗 Test with: https://[your-service-name].railway.app/health

pause