const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();

// Define PORT early
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://movie-app-frontend-khanyasir40.vercel.app'],
  credentials: true
}));

// Health check endpoint FIRST (Railway requirement)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Movie App Backend is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    host: HOST,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Movie App Backend API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      movies: '/api/movies',
      users: '/api/users',
      recommendations: '/api/recommendations'
    }
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movieapp');
    console.log('✅ MongoDB Connected...');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  MongoDB not available - App will run with limited functionality');
  }
};

// Call the connectDB function
connectDB();

// Define routes AFTER health check
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/recommendations', require('./routes/api/recommendations'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Start server with explicit binding
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
  console.log(`📚 API root: http://${HOST}:${PORT}/`);
  console.log(`💾 Database status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️  Disconnected'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;