# PowerShell script to test the volunteer form submission API

Write-Host "Testing Volunteer Form Submission API..." -ForegroundColor Cyan
Write-Host ""

# Test data
$body = @{
    firstName = "Test"
    lastName = "User"
    email = "test@example.com"
    phone = "+91 1234567890"
    gender = "Male"
    volunteerPreferences = @("Teaching", "Event Setup")
    availability = @("Weekends", "Evening")
    message = "This is a test submission"
} | ConvertTo-Json

try {
    Write-Host "Sending POST request to http://localhost:3001/api/volunteer/submit..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/volunteer/submit" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body
    
    Write-Host ""
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
    
    Write-Host ""
    Write-Host "Check your Google Sheet to see the new entry!" -ForegroundColor Cyan
    Write-Host "Sheet URL: https://docs.google.com/spreadsheets/d/1FvSO7x0TJDIyaHkDi-VhSNER6nIUKGO5r6A7td6N5PU/edit" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "❌ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "Details:" -ForegroundColor Red
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Make sure:" -ForegroundColor Yellow
    Write-Host "1. Backend server is running (npm start)" -ForegroundColor Yellow
    Write-Host "2. Google Sheet is shared with: diya-sheets-service@diya-ngo-backend.iam.gserviceaccount.com" -ForegroundColor Yellow
    Write-Host "3. .env file has correct GOOGLE_SHEET_ID" -ForegroundColor Yellow
}




