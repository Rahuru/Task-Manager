# 🚀 Quick Start Guide

Your Task Manager project is now running!

## 🖥️ Current Status
- ✅ **Backend API**: http://localhost:5000
- ✅ **Frontend App**: http://localhost:8081
- ✅ **API Test**: http://localhost:5000/api/auth/test

## 📱 How to Access

### Web Browser
1. Open: http://localhost:8081
2. You'll see the Task Manager app in your browser
3. Register or login to start using it

### Mobile Device
1. Install "Expo Go" app from App Store/Google Play
2. Look at the frontend terminal window for QR code
3. Scan QR code with Expo Go app
4. App will load on your mobile device

## 🧪 Test the API
You can test the backend API endpoints:
```bash
# Test health
curl http://localhost:5000

# Test auth endpoint  
curl http://localhost:5000/api/auth/test

# Test registration (example)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🛑 To Stop Servers
1. Go to each PowerShell window running the servers
2. Press `Ctrl+C` to stop each server

## 🔄 To Restart
```bash
# Backend (in backend directory)
npm run test-local    # Test server (no MongoDB needed)
# OR
npm run dev          # Full server (requires MongoDB Atlas)

# Frontend (in frontend directory)
npm start
```

## 🎯 Features Available
- ✅ User Registration/Login
- ✅ Create, Edit, Delete Tasks
- ✅ Mark Tasks Complete/Incomplete
- ✅ Filter Tasks (All/Pending/Completed)
- ✅ Due Date Management
- ✅ Overdue Task Alerts
- ✅ Cross-Platform (Web + Mobile)

## 🆘 Troubleshooting
- **Backend not working**: Try `npm run test-local` instead of `npm run dev`
- **Frontend not loading**: Wait 30 seconds for Metro bundler to start
- **API errors**: Check if backend is running on port 5000
- **Mobile not connecting**: Ensure phone and computer on same WiFi network

---
**🎉 Enjoy your Task Manager app!**