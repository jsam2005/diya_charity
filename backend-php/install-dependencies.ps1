# PowerShell script to help install PHP and Composer dependencies
# For Diya NGO Backend PHP

Write-Host "=== Diya NGO Backend - Dependency Installation ===" -ForegroundColor Cyan
Write-Host ""

# Check if PHP is installed
Write-Host "Checking for PHP..." -ForegroundColor Yellow
try {
    $phpVersion = php -v 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ PHP is installed!" -ForegroundColor Green
        Write-Host $phpVersion[0]
    }
} catch {
    Write-Host "❌ PHP is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need to install PHP first. Options:" -ForegroundColor Yellow
    Write-Host "1. Install XAMPP (easiest): https://www.apachefriends.org/download.html" -ForegroundColor Cyan
    Write-Host "2. Install PHP directly: https://windows.php.net/download/" -ForegroundColor Cyan
    Write-Host "3. Use Chocolatey: choco install php -y" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing PHP, add it to your PATH and run this script again." -ForegroundColor Yellow
    exit 1
}

# Check if Composer is installed
Write-Host ""
Write-Host "Checking for Composer..." -ForegroundColor Yellow
try {
    $composerVersion = composer --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Composer is installed!" -ForegroundColor Green
        Write-Host $composerVersion[0]
    }
} catch {
    Write-Host "❌ Composer is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installing Composer..." -ForegroundColor Yellow
    
    # Try to download composer.phar
    $composerPhar = "$PSScriptRoot\composer.phar"
    if (-not (Test-Path $composerPhar)) {
        Write-Host "Downloading Composer..." -ForegroundColor Yellow
        try {
            Invoke-WebRequest -Uri "https://getcomposer.org/download/latest-stable/composer.phar" -OutFile $composerPhar
            Write-Host "✅ Composer downloaded!" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to download Composer" -ForegroundColor Red
            Write-Host "Please download manually from: https://getcomposer.org/download/" -ForegroundColor Yellow
            exit 1
        }
    }
    
    Write-Host ""
    Write-Host "Using composer.phar..." -ForegroundColor Yellow
    $composerCommand = "php $composerPhar"
} else {
    $composerCommand = "composer"
}

# Install dependencies
Write-Host ""
Write-Host "Installing PHP dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

Set-Location $PSScriptRoot

try {
    if ($composerCommand -eq "composer") {
        composer install
    } else {
        php composer.phar install
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Copy .env.example to .env" -ForegroundColor White
        Write-Host "2. Edit .env with your credentials" -ForegroundColor White
        Write-Host "3. Upload all files to GoDaddy" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Installation failed. Check errors above." -ForegroundColor Red
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host "Please install dependencies manually." -ForegroundColor Yellow
}
