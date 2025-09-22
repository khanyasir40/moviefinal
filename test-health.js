// Quick health check test script
const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

console.log('🔍 Testing health endpoint...');

const options = {
  hostname: HOST,
  port: PORT,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`✅ Health check response: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('📊 Health data:', JSON.stringify(response, null, 2));
      console.log('✅ Health check successful!');
    } catch (error) {
      console.log('📄 Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Health check failed:', error.message);
  console.log('💡 Make sure the server is running: npm start');
});

req.on('timeout', () => {
  console.error('⏱️ Health check timed out');
  req.destroy();
});

req.end();