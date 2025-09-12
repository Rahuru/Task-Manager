# 🚀 Task Manager Deployment Guide

This guide provides step-by-step instructions for deploying your Task Manager application to various cloud platforms.

## 📋 Pre-Deployment Checklist

### Backend Requirements
- ✅ MongoDB Atlas database created
- ✅ Environment variables configured
- ✅ Dependencies installed (`npm install`)
- ✅ Server runs locally (`npm run dev`)

### Frontend Requirements
- ✅ Expo CLI installed (`npm install -g @expo/cli`)
- ✅ Dependencies installed (`npm install`)
- ✅ App runs locally (`npm start`)

## 🖥️ Backend Deployment

### Option 1: Heroku (Recommended for beginners)

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd task-manager-backend
   heroku create your-task-manager-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="your_mongodb_atlas_uri"
   heroku config:set JWT_SECRET="your_secure_jwt_secret_key"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-frontend-domain.com"
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push heroku main
   ```

6. **Verify Deployment**
   ```bash
   heroku open
   heroku logs --tail
   ```

### Option 2: Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose `task-manager-backend` folder

3. **Configure Build Settings**
   ```
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**
   - Add all variables from your `.env` file
   - Set `NODE_ENV=production`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Option 3: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   cd task-manager-backend
   railway login
   railway init
   railway add-variables
   # Add your environment variables
   railway deploy
   ```

## 📱 Frontend Deployment

### Option 1: Vercel (Web)

1. **Build for Web**
   ```bash
   cd task-manager-frontend
   npx expo export:web
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Update API Base URL**
   - Set `EXPO_PUBLIC_API_HOST` to your backend domain
   - Rebuild and redeploy

### Option 2: Netlify (Web)

1. **Build for Web**
   ```bash
   cd task-manager-frontend
   npx expo export:web
   ```

2. **Deploy**
   - Drag and drop `dist/` folder to Netlify
   - Or connect GitHub repository

### Option 3: Expo Hosting (Native + Web)

1. **Configure Expo**
   ```bash
   cd task-manager-frontend
   eas build:configure
   ```

2. **Build for Production**
   ```bash
   # For Android
   eas build --platform android
   
   # For iOS  
   eas build --platform ios
   
   # For Web
   expo export:web
   ```

3. **Publish**
   ```bash
   expo publish
   ```

## 🔧 Environment Configuration

### Backend Environment Variables

```env
# Production .env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_very_secure_jwt_secret_key_with_minimum_32_characters
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables

```env
# For mobile builds
EXPO_PUBLIC_API_HOST=your-backend-domain.com
```

## 🧪 Testing Deployed Application

### Backend Testing
```bash
# Test health endpoint
curl https://your-backend-domain.com

# Test auth endpoint
curl https://your-backend-domain.com/api/auth/test

# Test registration
curl -X POST https://your-backend-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"testpass123"}'
```

### Frontend Testing
1. Open deployed web app URL
2. Test registration flow
3. Test login flow
4. Test task creation, editing, deletion
5. Test filtering functionality

## 📊 Monitoring and Maintenance

### Backend Monitoring
- **Heroku**: Use Heroku dashboard and logs
- **Render**: Built-in monitoring dashboard
- **Railway**: Railway dashboard metrics

### Common Issues and Solutions

1. **Database Connection Errors**
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas network access settings
   - Ensure database user has correct permissions

2. **CORS Errors**
   - Update FRONTEND_URL environment variable
   - Check CORS configuration in server.js

3. **JWT Errors**
   - Verify JWT_SECRET is set and matches between environments
   - Check token expiration (currently set to 7 days)

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Clear npm cache: `npm cache clean --force`

## 🎥 Demo Video Creation

### Recording Setup
1. **Screen Recording Tools**
   - OBS Studio (Free, cross-platform)
   - Loom (Easy, web-based)
   - QuickTime (Mac)
   - Windows Game Bar (Windows)

2. **Mobile Recording**
   - iOS: Built-in screen recording
   - Android: Use ADB or built-in recorder
   - Expo Go app for real device testing

### Demo Script (2 minutes)

```
0:00-0:15 - Introduction
- "Welcome to Task Manager, a full-stack app built with Node.js and React Native"
- Show both web and mobile versions

0:15-0:30 - Registration
- Create new account
- Show successful registration and auto-login

0:30-0:45 - Authentication
- Log out and log back in
- Show token persistence (auto-login)

0:45-1:15 - Task Management
- Create task with title, description, due date
- Edit existing task
- Mark task as completed
- Delete task with confirmation

1:15-1:30 - Advanced Features
- Show task filtering (All/Pending/Completed)
- Demonstrate overdue task highlighting
- Show pull-to-refresh

1:30-1:45 - Cross-Platform Demo
- Show same app running on web and mobile
- Demonstrate responsive design

1:45-2:00 - Conclusion
- Recap key features
- Show GitHub repository
- Thank viewers
```

## 🔗 Final Submission Links

### Required Links
1. **GitHub Repository**: `https://github.com/yourusername/task-manager`
2. **Backend API**: `https://your-backend-domain.com`
3. **Frontend Web App**: `https://your-frontend-domain.com`
4. **Demo Video**: Upload to YouTube/Loom and share link

### Submission Checklist
- ✅ All assignment requirements implemented
- ✅ Backend deployed and accessible
- ✅ Frontend deployed and functional
- ✅ Environment variables properly configured
- ✅ Database connected and working
- ✅ Authentication flow working
- ✅ CRUD operations functional
- ✅ Demo video recorded (2 minutes max)
- ✅ README documentation complete
- ✅ GitHub repository public and organized

## 🆘 Need Help?

### Common Commands Reference
```bash
# Backend
npm install          # Install dependencies
npm run dev         # Start development server
npm start           # Start production server
heroku logs --tail  # View Heroku logs

# Frontend
npm install         # Install dependencies
npm start           # Start Expo dev server
expo doctor         # Check for issues
expo r -c           # Reset cache
```

### Support Resources
- **Heroku Docs**: https://devcenter.heroku.com/
- **Render Docs**: https://render.com/docs
- **Expo Docs**: https://docs.expo.dev/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/

---

🎉 **Your Task Manager app is ready for submission with all requirements met!**