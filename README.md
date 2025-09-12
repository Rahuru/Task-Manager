# 📱 Task Manager - Full Stack Application

A complete task management application built with Node.js, Express, MongoDB, and React Native (Expo). Features user authentication, CRUD operations, and cross-platform support.

## 🚀 Live Demo

- **Backend API**: [Deploy to Render/Heroku and add URL here]
- **Frontend Web**: [Deploy to Vercel/Netlify and add URL here]
- **Mobile App**: Use Expo Go to scan QR code

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT
- Secure password hashing with bcrypt
- Token-based authentication
- Auto-logout on token expiration

### 📋 Task Management
- Create, read, update, and delete tasks
- Toggle task completion status
- Add task descriptions and due dates
- Filter tasks (All, Pending, Completed)
- Overdue task highlighting

### 🎨 User Experience
- Cross-platform support (iOS, Android, Web)
- Modern, responsive UI design
- Loading indicators and error handling
- Pull-to-refresh functionality
- Intuitive navigation flow

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- Expo CLI: `npm install -g @expo/cli`

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager/task-manager-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=your_secure_jwt_secret_key_here
   FRONTEND_URL=http://localhost:8081
   ```
   
   **🔒 SECURITY WARNING**: 
   - Copy `.env.example` to `.env` and fill in your REAL values
   - NEVER commit `.env` files to version control
   - Use strong, unique passwords and secrets
   - Keep your MongoDB Atlas credentials secure

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../task-manager-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:5000
   ```
   
   **🔒 SECURITY WARNING**: 
   - Use placeholder URLs in documentation
   - Set real URLs only in your local `.env` file
   - Never commit `.env` files to version control

4. **Start the application**
   ```bash
   npm start
   ```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Select `task-manager-backend` folder
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `NODE_ENV=production`
     - `FRONTEND_URL`

### Frontend Deployment (Vercel)

1. **Build for web**
   ```bash
   cd task-manager-frontend
   npx expo export:web
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Update API URL**
   - Set `EXPO_PUBLIC_API_URL` to your deployed backend URL
   - Rebuild and redeploy

## 📱 Usage

### Authentication Flow
1. **App Start** → Login screen appears
2. **New Users** → Register → Success message → Login screen
3. **Existing Users** → Login → Task Manager dashboard
4. **Auto-logout** → Invalid/expired token redirects to Login

### Task Management
1. **Add Task** → Click "+ Add" button
2. **Edit Task** → Click "Edit" on any task
3. **Toggle Status** → Click "Done/Undo" button
4. **Delete Task** → Click "Delete" with confirmation
5. **Filter Tasks** → Use All/Pending/Completed tabs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/test` - Test endpoint

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

**Headers Required:**
```
x-auth-token: <jwt_token>
OR
Authorization: Bearer <jwt_token>
```

## 🧪 Testing

### Backend Testing
```bash
cd task-manager-backend
npm run test-local  # Test without database
```

### Frontend Testing
```bash
cd task-manager-frontend
npm start  # Test on multiple platforms
```

## 📁 Project Structure

```
task-manager/
├── 📁 task-manager-backend/
│   ├── 📁 config/
│   │   └── db.js                 # Database connection
│   ├── 📁 controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task management logic
│   ├── 📁 middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── 📁 models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── 📁 routes/
│   │   ├── auth.js              # Auth routes
│   │   └── tasks.js             # Task routes
│   ├── server.js                # Main server file
│   ├── package.json             # Dependencies
│   └── Procfile                 # Heroku configuration
├── 📁 task-manager-frontend/
│   ├── 📁 components/
│   │   └── TaskItem.js          # Task display component
│   ├── 📁 navigation/
│   │   └── AppNavigator.js      # App navigation
│   ├── 📁 screens/
│   │   ├── LoginScreen.js       # Login interface
│   │   ├── RegisterScreen.js    # Registration interface
│   │   ├── TaskListScreen.js    # Main task interface
│   │   ├── AddTaskScreen.js     # Add/edit task interface
│   │   └── SplashScreen.js      # Loading screen
│   ├── 📁 utils/
│   │   ├── api.js               # HTTP client
│   │   └── auth.js              # Token management
│   ├── App.js                   # Main app component
│   └── package.json             # Dependencies
└── README.md                    # This file
```

## 🔒 Security Features

- JWT authentication with 7-day expiration
- Password hashing with bcrypt (10 rounds)
- Input validation and sanitization
- CORS protection with configurable origins
- MongoDB injection protection
- Secure token storage with AsyncStorage

## 🛡️ Security Best Practices

### Environment Variables
- **NEVER commit `.env` files** to version control
- Use `.env.example` as a template
- Set real values only in your local `.env` file
- Use strong, unique passwords and secrets

### Production Deployment
- Set environment variables in your hosting platform
- Use secure MongoDB Atlas credentials
- Generate new JWT secrets for production
- Configure CORS for your specific domain

### Code Security
- No hardcoded secrets in source code
- All sensitive data in environment variables
- Input validation on both frontend and backend
- Proper error handling without exposing internals

## 🎥 Demo Video Script

**Duration: 2 minutes**

1. **0:00-0:15** - Introduction
   - Show app overview and tech stack
   - Demonstrate cross-platform support

2. **0:15-0:30** - Authentication
   - Register new user
   - Show success message and redirect
   - Login with credentials

3. **0:30-0:60** - Task Management
   - Create task with title, description, due date
   - Edit existing task
   - Toggle task completion
   - Delete task with confirmation

4. **0:60-0:90** - Advanced Features
   - Show task filtering (All/Pending/Completed)
   - Demonstrate overdue task highlighting
   - Show pull-to-refresh functionality

5. **0:90-2:00** - Conclusion
   - Recap key features
   - Show GitHub repository
   - Mention deployment links

## 🚀 Quick Start Commands

```bash
# Backend
cd task-manager-backend
npm install
cp .env.example .env  # Configure your environment
npm run dev

# Frontend (new terminal)
cd task-manager-frontend
npm install
npm start
```

## 📋 Assignment Requirements Checklist

- ✅ **Authentication Flow** - Login → Register → Task Manager
- ✅ **JWT Security** - Token-based authentication
- ✅ **Task CRUD** - Create, Read, Update, Delete operations
- ✅ **Status Toggle** - Pending ↔ Completed
- ✅ **User Isolation** - Tasks only visible to logged-in user
- ✅ **Database Storage** - MongoDB with proper schemas
- ✅ **Input Validation** - Frontend and backend validation
- ✅ **Error Handling** - Consistent JSON responses
- ✅ **Environment Config** - MONGO_URI, JWT_SECRET, PORT
- ✅ **Deployment Ready** - Render/Heroku configuration
- ✅ **Cross-Platform** - iOS, Android, Web support
- ✅ **Professional UI** - Loading states, error messages
- ✅ **Documentation** - Comprehensive README

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

[Your Name]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**🎉 Ready for submission with all requirements met and bonus features implemented!**