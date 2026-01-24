# Fix SSL Certificate Issue for Google API
# This script configures PHP to use CA certificates

Write-Host "=== Fixing SSL Certificate Issue ===" -ForegroundColor Cyan
Write-Host ""

$phpIni = "C:\php\php.ini"
$caCertPath = "C:\php\cacert.pem"

# Check if php.ini exists
if (-not (Test-Path $phpIni)) {
    Write-Host "❌ php.ini not found at: $phpIni" -ForegroundColor Red
    Write-Host "Please update php.ini manually:" -ForegroundColor Yellow
    Write-Host "  curl.cainfo = $caCertPath" -ForegroundColor White
    Write-Host "  openssl.cafile = $caCertPath" -ForegroundColor White
    exit 1
}

# Download CA certificate if not exists
if (-not (Test-Path $caCertPath)) {
    Write-Host "Downloading CA certificate bundle..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri "https://curl.se/ca/cacert.pem" -OutFile $caCertPath
        Write-Host "✅ Downloaded to $caCertPath" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to download CA certificate: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ CA certificate bundle exists" -ForegroundColor Green
}

# Read php.ini
$content = Get-Content $phpIni -Raw
$updated = $false

# Configure curl.cainfo
if ($content -notmatch "^\s*curl\.cainfo\s*=") {
    Write-Host "Adding curl.cainfo configuration..." -ForegroundColor Yellow
    # Find the curl section or add at end
    if ($content -match ";curl\.cainfo") {
        $content = $content -replace ";curl\.cainfo", "curl.cainfo = `"$caCertPath`""
    } else {
        # Add after [curl] section or at end
        if ($content -match "\[curl\]") {
            $content = $content -replace "(\[curl\][^\r\n]*)", "`$1`r`ncurl.cainfo = `"$caCertPath`""
        } else {
            $content += "`r`n`r`n; CA Certificate for cURL`r`ncurl.cainfo = `"$caCertPath`"`r`n"
        }
    }
    $updated = $true
} else {
    Write-Host "curl.cainfo already configured" -ForegroundColor Green
}

# Configure openssl.cafile
if ($content -notmatch "^\s*openssl\.cafile\s*=") {
    Write-Host "Adding openssl.cafile configuration..." -ForegroundColor Yellow
    if ($content -match ";openssl\.cafile") {
        $content = $content -replace ";openssl\.cafile", "openssl.cafile = `"$caCertPath`""
    } else {
        if ($content -match "\[openssl\]") {
            $content = $content -replace "(\[openssl\][^\r\n]*)", "`$1`r`nopenssl.cafile = `"$caCertPath`""
        } else {
            $content += "`r`n`r`n; CA Certificate for OpenSSL`r`nopenssl.cafile = `"$caCertPath`"`r`n"
        }
    }
    $updated = $true
} else {
    Write-Host "openssl.cafile already configured" -ForegroundColor Green
}

# Save php.ini if updated
if ($updated) {
    Set-Content $phpIni -Value $content -NoNewline
    Write-Host ""
    Write-Host "✅ php.ini updated!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Restart the PHP server for changes to take effect!" -ForegroundColor Yellow
    Write-Host "   Stop the current server (Ctrl+C) and restart it." -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✅ php.ini already configured correctly" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Manual Configuration (if needed) ===" -ForegroundColor Cyan
Write-Host "If the script didn't work, manually edit C:\php\php.ini and add:" -ForegroundColor Yellow
Write-Host "  curl.cainfo = `"$caCertPath`"" -ForegroundColor White
Write-Host "  openssl.cafile = `"$caCertPath`"" -ForegroundColor White
