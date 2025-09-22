const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check - CRITICAL for Railway
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie App Backend - Railway Ready!',
    status: 'running',
    endpoints: {
      health: '/health'
    }
  });
});

// Basic API routes for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Health: http://0.0.0.0:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server stopped');
  });
});

module.exports = app;