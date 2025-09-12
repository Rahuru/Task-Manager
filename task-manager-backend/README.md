# Task Manager Backend

A RESTful API built with Node.js, Express, and MongoDB for managing tasks with user authentication.

## Features

- ✅ User registration and authentication using JWT
- ✅ Secure password hashing with bcrypt
- ✅ Task CRUD operations (Create, Read, Update, Delete)
- ✅ Task filtering and sorting
- ✅ Due date management
- ✅ Input validation with express-validator
- ✅ Comprehensive error handling
- ✅ CORS configuration for cross-origin requests
- ✅ Environment-based configuration

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=your_secure_jwt_secret_key_here
   FRONTEND_URL=http://localhost:8081
   ```

3. **Start the Server**
   ```bash
   # Development with auto-restart
   npm run dev
   
   # Production
   npm start
   ```

## API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: Your deployed URL

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Test Authentication
```
GET /api/auth/test
```

### Task Endpoints (Protected)

All task endpoints require authentication. Include one of these headers:
- `x-auth-token: <jwt_token>`
- `Authorization: Bearer <jwt_token>`

#### Get All Tasks
```
GET /api/tasks
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Get Single Task
```
GET /api/tasks/:id
```

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
```

## Deployment

### Heroku
1. Create a Heroku app: `heroku create your-app-name`
2. Set environment variables in Heroku dashboard or CLI
3. Deploy: `git push heroku main`

### Render
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push

### Railway/Vercel
1. Connect your repository
2. Configure environment variables
3. Deploy

## Security Features

- JWT token authentication with 7-day expiration
- Password hashing with bcrypt (10 rounds)
- Input validation and sanitization
- CORS protection with configurable origins
- MongoDB injection protection
- Error handling without sensitive data exposure

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── taskController.js  # Task management logic
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js           # User schema
│   └── Task.js           # Task schema
├── routes/
│   ├── auth.js           # Auth routes
│   └── tasks.js          # Task routes
├── .env.example          # Environment template
├── package.json          # Dependencies
└── server.js            # Entry point
```


