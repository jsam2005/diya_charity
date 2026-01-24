# Start Both Backend and Frontend for Local Testing
# This script starts both servers in separate windows

Write-Host "=== Starting Local Development Environment ===" -ForegroundColor Cyan
Write-Host ""

# Start PHP Backend
Write-Host "🚀 Starting PHP Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend-php'; .\start-local-server.ps1"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🚀 Starting React Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend: http://localhost:8000/api" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (servers will keep running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
