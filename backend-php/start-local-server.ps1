# Start PHP Development Server for Local Testing
# This will run the PHP backend on http://localhost:8000

Write-Host "=== Starting PHP Backend Server ===" -ForegroundColor Cyan
Write-Host ""

# Check if PHP is available
try {
    $phpVersion = php -v 2>&1 | Select-Object -First 1
    Write-Host "✅ PHP found: $phpVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ PHP not found. Please install PHP first." -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    
    if (Test-Path "..\backend\.env") {
        Copy-Item "..\backend\.env" ".env"
        Write-Host "✅ Copied .env from backend folder" -ForegroundColor Green
        Write-Host "⚠️  Please edit .env with your credentials" -ForegroundColor Yellow
    } else {
        Write-Host "❌ No .env template found. Please create .env manually." -ForegroundColor Red
        Write-Host "See .env.example for reference" -ForegroundColor Yellow
    }
}

# Check if vendor folder exists
if (-not (Test-Path "vendor\autoload.php")) {
    Write-Host "⚠️  Dependencies not installed!" -ForegroundColor Yellow
    Write-Host "Running composer install..." -ForegroundColor Yellow
    
    if (Test-Path "composer.phar") {
        php composer.phar install
    } else {
        Write-Host "❌ composer.phar not found. Please run: composer install" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 Starting PHP server on http://localhost:8000" -ForegroundColor Green
Write-Host "📝 Backend API will be available at: http://localhost:8000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start PHP built-in server
# Note: PHP server doesn't support .htaccess, so we need to handle routing differently
# For local testing, we'll use a router script
php -S localhost:8000 -t . router.php
