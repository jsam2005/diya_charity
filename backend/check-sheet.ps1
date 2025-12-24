# PowerShell script to check Google Sheet status

Write-Host "=== Google Sheets Configuration Check ===" -ForegroundColor Cyan
Write-Host ""

# Read .env file
$envFile = ".env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile
    
    $sheetId = ($envContent | Select-String "GOOGLE_SHEET_ID=").ToString().Split("=")[1]
    $sheetName = ($envContent | Select-String "GOOGLE_SHEET_NAME=").ToString().Split("=")[1]
    $serviceEmail = ($envContent | Select-String "GOOGLE_SERVICE_ACCOUNT_EMAIL=").ToString().Split("=")[1]
    
    Write-Host "Current Configuration:" -ForegroundColor Yellow
    Write-Host "  Sheet ID: $sheetId" -ForegroundColor White
    Write-Host "  Sheet Name (Tab): $sheetName" -ForegroundColor White
    Write-Host "  Service Account: $serviceEmail" -ForegroundColor White
    Write-Host ""
    Write-Host "Your Google Sheet URL:" -ForegroundColor Yellow
    Write-Host "  https://docs.google.com/spreadsheets/d/$sheetId/edit" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⚠️  IMPORTANT:" -ForegroundColor Yellow
    Write-Host "  Data is being written to the '$sheetName' tab, NOT 'Sheet1'!" -ForegroundColor White
    Write-Host "  Click on the '$sheetName' tab at the bottom of your Google Sheet to see the data." -ForegroundColor White
    Write-Host ""
    Write-Host "If you want to use 'Sheet1' instead, change GOOGLE_SHEET_NAME=Sheet1 in .env" -ForegroundColor Gray
    
} else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
}

