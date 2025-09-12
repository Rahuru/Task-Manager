# Task Manager Project Status Checker
Write-Host "🚀 Task Manager Project Status Check" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

# Check Backend Status
Write-Host "🖥️  Checking Backend (Node.js/Express)..." -ForegroundColor Yellow
try {
    $backend = Invoke-RestMethod -Uri "http://localhost:5000" -Method Get -TimeoutSec 5
    Write-Host "✅ Backend is running at http://localhost:5000" -ForegroundColor Green
    Write-Host "   Response: $backend" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend not responding at http://localhost:5000" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check Auth Endpoint
Write-Host "🔐 Checking Authentication Endpoint..." -ForegroundColor Yellow
try {
    $auth = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/test" -Method Get -TimeoutSec 5
    Write-Host "✅ Auth endpoint working" -ForegroundColor Green
    Write-Host "   Response: $($auth.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Auth endpoint not responding" -ForegroundColor Red
}

Write-Host ""

# Check Frontend Status (Expo Metro)
Write-Host "📱 Checking Frontend (React Native/Expo)..." -ForegroundColor Yellow
try {
    # Check if Expo Metro bundler is running (usually on port 8081)
    $expo = Invoke-WebRequest -Uri "http://localhost:8081" -Method Get -TimeoutSec 3
    Write-Host "✅ Frontend Metro bundler is running at http://localhost:8081" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Frontend may still be starting up..." -ForegroundColor Yellow
    Write-Host "   Expected at http://localhost:8081" -ForegroundColor Gray
}

Write-Host ""

# Check process status
Write-Host "🔍 Process Status:" -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "✅ Found $($nodeProcesses.Count) Node.js process(es) running" -ForegroundColor Green
} else {
    Write-Host "❌ No Node.js processes found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Quick Access Links:" -ForegroundColor Cyan
Write-Host "   Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend (Web): http://localhost:8081" -ForegroundColor White
Write-Host "   API Test: http://localhost:5000/api/auth/test" -ForegroundColor White
Write-Host ""
Write-Host "📱 To test on mobile:" -ForegroundColor Cyan
Write-Host "   1. Install Expo Go app on your phone" -ForegroundColor White
Write-Host "   2. Scan QR code from the frontend terminal" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop servers:" -ForegroundColor Cyan
Write-Host "   Press Ctrl+C in each terminal window" -ForegroundColor White