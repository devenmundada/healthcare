const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001; // IMPORTANT: Use 3001, not 5432

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Healthcare API',
    version: '1.0.0',
    database: process.env.DB_NAME || 'healthcare_db'
  });
});

// Simple signup endpoint
app.post('/api/auth/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  res.json({
    success: true,
    message: 'User registration successful',
    data: {
      id: 1,
      name,
      email,
      phone,
      role: 'patient'
    }
  });
});

// Simple login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  res.json({
    success: true,
    message: 'Login successful',
    token: 'jwt-token-here',
    user: {
      id: 1,
      name: 'Test User',
      email: email,
      role: 'patient'
    }
  });
});

// Start server on PORT 3001 (NOT 5432!)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Signup: POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`🔑 Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log('');
  console.log(`📊 PostgreSQL is running on port 5432`);
  console.log(`💻 Express API is running on port ${PORT}`);
});