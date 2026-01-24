@echo off
echo ========================================
echo   Full Deployment Script
echo   Frontend + Backend for GoDaddy
echo ========================================
echo.

echo [1/4] Building Frontend...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend dependencies failed
    pause
    exit /b 1
)

call npm run build
if errorlevel 1 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)
cd ..

echo.
echo [2/4] Preparing Backend...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend dependencies failed
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Copying .htaccess file...
copy frontend\dist\.htaccess.production frontend\dist\.htaccess
if errorlevel 1 (
    echo WARNING: Could not copy .htaccess file
    echo Please manually copy .htaccess.production to .htaccess
)

echo.
echo [4/4] Deployment files ready!
echo.
echo ========================================
echo   NEXT STEPS FOR GODADDY:
echo ========================================
echo.
echo FRONTEND:
echo 1. Go to GoDaddy cPanel
echo 2. Open File Manager
echo 3. Navigate to public_html
echo 4. Upload ALL files from: frontend\dist\
echo 5. Make sure .htaccess is uploaded
echo.
echo BACKEND:
echo 1. In cPanel, go to Node.js Selector
echo 2. Create Node.js application
echo 3. Upload backend files to: /api (or your chosen folder)
echo 4. Set environment variables
echo 5. Run npm install
echo 6. Start the application
echo.
echo See GODADDY_FULL_DEPLOYMENT.md for detailed instructions
echo.
echo Files ready:
echo - Frontend: frontend\dist\
echo - Backend: backend\
echo.
pause
