@echo off
echo 🚀 Starting GitHub Pages deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the frontend directory.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building the project...
call npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Error: Build failed. dist directory not found.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Build files are in the 'dist' directory
echo.
echo 🌐 To deploy to GitHub Pages:
echo 1. Push your code to GitHub
echo 2. Go to your repository settings
echo 3. Navigate to 'Pages' section
echo 4. Select 'GitHub Actions' as source
echo 5. The workflow will automatically deploy your site
echo.
echo 🔗 Your site will be available at:
echo https://[your-username].github.io/DiyaWeb/
echo.
echo 📝 Note: Make sure to update the 'base' path in vite.config.ts
echo    if your repository name is different from 'DiyaWeb'
echo.
pause
