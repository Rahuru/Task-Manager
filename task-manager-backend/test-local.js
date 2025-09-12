// test-local.js - Local testing script without MongoDB connection
const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8081', 'http://localhost:19006', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Test routes without database
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Task Manager API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth/test',
      health: '/'
    }
  });
});

app.get('/api/auth/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Auth route is reachable',
    timestamp: new Date().toISOString()
  });
});

// Mock task routes for testing
app.get('/api/tasks', (req, res) => {
  res.json({
    message: 'Tasks endpoint working - database connection needed for full functionality',
    mockTasks: [
      {
        _id: '1',
        title: 'Sample Task 1',
        description: 'This is a mock task for testing',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        title: 'Sample Task 2',
        description: 'This is another mock task',
        completed: true,
        createdAt: new Date().toISOString()
      }
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`🌐 Test at: http://localhost:${PORT}`);
  console.log(`🔧 Auth test: http://localhost:${PORT}/api/auth/test`);
  console.log('📝 Note: This is a test server without database connection');
  console.log('🔗 For full functionality, configure MongoDB Atlas and use npm run dev');
});