#!/usr/bin/env node

// Simple monitoring script without external dependencies
const https = require('https');

const BACKEND_URL = 'moviefinal-backend-khanyasir40.onrender.com';

function checkBackend() {
    console.log(`🔍 Checking backend status...`);
    
    const options = {
        hostname: BACKEND_URL,
        port: 443,
        path: '/health',
        method: 'GET',
        timeout: 15000
    };

    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('🎉 SUCCESS! Backend is LIVE!');
                console.log('📊 Response:', data);
                console.log(`🌐 Backend URL: https://${BACKEND_URL}`);
                console.log('\n✅ NOW UPDATE YOUR VERCEL FRONTEND:');
                console.log('1. Go to: https://vercel.com/dashboard');
                console.log('2. Select your moviefinal project');
                console.log('3. Settings → Environment Variables');
                console.log(`4. Add: REACT_APP_API_URL = https://${BACKEND_URL}`);
                console.log('5. Deployments → Trigger Deploy');
                console.log('\n🎬 Your movie app will be fully functional!');
                process.exit(0);
            } else {
                console.log(`⏳ Backend not ready yet (Status: ${res.statusCode})`);
            }
        });
    });

    req.on('error', (err) => {
        if (err.code === 'ENOTFOUND') {
            console.log('⏳ Backend URL not yet available - still deploying...');
        } else if (err.code === 'ECONNREFUSED') {
            console.log('⏳ Backend server starting up...');
        } else {
            console.log(`⏳ Backend not ready: ${err.code}`);
        }
    });

    req.on('timeout', () => {
        console.log('⏳ Request timeout - backend still starting...');
        req.destroy();
    });

    req.end();
}

// Check every 30 seconds
console.log('🚀 Starting backend monitoring...');
console.log(`📡 Monitoring: https://${BACKEND_URL}/health`);
console.log('⏰ Checking every 30 seconds...\n');

const interval = setInterval(() => {
    checkBackend();
}, 30000);

// Initial check
checkBackend();