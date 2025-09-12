#!/bin/bash

# Task Manager Backend Deployment Script
echo "🚀 Deploying Task Manager Backend..."

# Check if we're in the correct directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found. Make sure you're in the backend directory."
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found. Please copy .env.example to .env and configure it."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if MongoDB connection is configured
if ! grep -q "MONGO_URI" .env; then
    echo "❌ Error: MONGO_URI not configured in .env file"
    exit 1
fi

# Check if JWT secret is configured
if ! grep -q "JWT_SECRET" .env; then
    echo "❌ Error: JWT_SECRET not configured in .env file"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Test the server
echo "🧪 Testing server connection..."
node -e "
const connectDB = require('./config/db');
connectDB().then(() => {
    console.log('✅ MongoDB connection successful');
    process.exit(0);
}).catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
});
"

if [ $? -ne 0 ]; then
    echo "❌ Database connection test failed"
    exit 1
fi

echo "🎉 Backend is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. For Heroku: heroku create your-app-name && git push heroku main"
echo "2. For Render: Push to GitHub and connect repository"
echo "3. For Railway: railway login && railway deploy"
echo ""
echo "🔧 Required Environment Variables for Production:"
echo "- PORT (default: 5000)"
echo "- MONGO_URI (your MongoDB Atlas connection string)"
echo "- JWT_SECRET (secure random string)"
echo "- NODE_ENV=production"
echo "- FRONTEND_URL (your frontend domain)"