const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const pool = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection is handled by config/database.js
// The pool is automatically initialized when the module is loaded

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Healthcare API',
    version: '1.0.0',
    database: 'connected' // Database connection managed by pool
  });
});

// API Routes
const { authRoutes } = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Healthcare API is working!',
    database: process.env.DB_NAME || 'not configured'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`🔗 API test: http://localhost:${PORT}/api/test`);
});