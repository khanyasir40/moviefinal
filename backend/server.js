const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000', // Development
    'https://moviefinal-mgeh-git-main-khanyasir40s-projects.vercel.app', // Your Vercel frontend
    'https://moviefinal-mgeh-cag40ovut-khanyasir40s-projects.vercel.app', // Vercel preview
    /\.vercel\.app$/ // Any Vercel domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint FIRST (before other routes)
app.get('/health', (req, res) => {
  try {
    // Check if database connection is working
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'Movie App Backend is running!',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Health check failed',
      error: error.message 
    });
  }
});

// Add a simple root endpoint as well
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

// Define routes AFTER health check
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/recommendations', require('./routes/api/recommendations'));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/movieapp';
    console.log('🔗 Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB Connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  MongoDB not available - App will run with limited functionality');
    console.log('📝 User registration/login will not work without database');
    console.log('🎬 Movie browsing and search will work with mock data');
    console.log('💡 To enable full features, set up MongoDB Atlas IP whitelist');
    // Don't exit process, let the app run without database for now
    console.log('✅ Continuing without database connection...');
  }
};

// Call the connectDB function
connectDB();

// API-only backend - Frontend is handled by Vercel
// No static file serving needed

// Define PORT early
const PORT = process.env.PORT || 5000;



// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📚 API root: http://0.0.0.0:${PORT}/`);
  console.log(`💾 Database status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️  Disconnected'}`);
});