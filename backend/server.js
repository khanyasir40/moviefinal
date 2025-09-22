const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes AFTER health check
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/recommendations', require('./routes/api/recommendations'));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movieapp');
    console.log('✅ MongoDB Connected...');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  MongoDB not available - App will run with limited functionality');
    console.log('📝 User registration/login will not work without database');
    console.log('🎬 Movie browsing and search will work with mock data');
    console.log('💡 To enable full features, set up MongoDB Atlas (see setup-mongodb-atlas.md)');
    // Don't exit process, let the app run without database for now
    console.log('✅ Continuing without database connection...');
  }
};

// Call the connectDB function
connectDB();

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Define PORT
const PORT = process.env.PORT || 5000;

// Health check endpoint for Railway
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

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`📚 API root: http://0.0.0.0:${PORT}/`);
  console.log(`💾 Database status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️  Disconnected'}`);
});