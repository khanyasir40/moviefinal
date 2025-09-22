@echo off
echo =====================================
echo     Railway Deployment Monitor
echo     for khanyasir40's Movie App
echo =====================================
echo.

set URL=https://zestful-enchantment-production.up.railway.app
set HEALTH_URL=%URL%/health

echo 🔍 Checking deployment status...
echo.

echo [1/3] Testing main API endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Main API: HTTP' $response.StatusCode $response.StatusDescription } catch { Write-Host '❌ Main API: Not accessible yet' }"

echo.
echo [2/3] Testing health endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 10; Write-Host '✅ Health Check: HTTP' $response.StatusCode $response.StatusDescription; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Health Check: Not accessible yet' }"

echo.
echo [3/3] Checking GitHub repository...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://api.github.com/repos/khanyasir40/moviefinal/commits/main' -UseBasicParsing -TimeoutSec 10; $json = $response.Content | ConvertFrom-Json; Write-Host '✅ Latest Commit:' $json.sha.Substring(0,7) $json.commit.message.Split([Environment]::NewLine)[0] } catch { Write-Host '❌ GitHub: Unable to check' }"

echo.
echo =====================================
echo.
echo 🌐 Your App URLs:
echo    Main API: %URL%
echo    Health:   %HEALTH_URL%
echo    GitHub:   https://github.com/khanyasir40/moviefinal
echo.
echo 📊 Railway Dashboard:
echo    https://railway.app/project/2d8e9cec-32c1-4157-956e-3a65ae67ad90
echo.
echo =====================================
echo.
echo 🔄 Run this script again to check updates
echo.
pause