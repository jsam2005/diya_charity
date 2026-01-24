@echo off
echo ========================================
echo   GoDaddy Deployment Script
echo   Diya Charitable Trust Website
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Building production version...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/3] Build completed successfully!
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo 1. Go to GoDaddy cPanel
echo 2. Open File Manager
echo 3. Navigate to public_html folder
echo 4. Upload ALL files from: frontend\dist\
echo 5. Make sure .htaccess file is uploaded
echo 6. Visit your domain to verify
echo.
echo Files are ready in: frontend\dist\
echo.
pause
