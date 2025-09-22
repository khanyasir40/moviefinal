const axios = require('axios');
const fs = require('fs');

const BACKEND_URL = 'https://moviefinal-backend-khanyasir40.onrender.com';
const HEALTH_ENDPOINT = `${BACKEND_URL}/health`;

let checkCount = 0;
const maxChecks = 60; // 30 minutes of checking (every 30 seconds)

async function monitorBackendDeployment() {
    checkCount++;
    const timestamp = new Date().toLocaleString();
    
    console.log(`\n🔍 [${timestamp}] Backend Health Check #${checkCount}`);
    console.log(`📡 Testing: ${HEALTH_ENDPOINT}`);
    
    try {
        const response = await axios.get(HEALTH_ENDPOINT, { 
            timeout: 15000,
            headers: {
                'User-Agent': 'MovieApp-Deployment-Monitor/1.0'
            }
        });
        
        if (response.status === 200) {
            console.log('🎉 SUCCESS! Backend is LIVE and responding!');
            console.log(`📊 Response: ${JSON.stringify(response.data, null, 2)}`);
            console.log(`🌐 Backend URL: ${BACKEND_URL}`);
            
            // Update deployment status
            const statusUpdate = `
✅ BACKEND DEPLOYMENT SUCCESSFUL!
Timestamp: ${timestamp}
Status Code: ${response.status}
Response Time: ${response.headers['x-response-time'] || 'N/A'}
Backend URL: ${BACKEND_URL}

🎯 READY FOR FRONTEND DEPLOYMENT!
`;
            fs.writeFileSync('backend-status.txt', statusUpdate);
            
            console.log('\n🚀 Starting Frontend Deployment Process...');
            return true;
        }
    } catch (error) {
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            console.log('⏳ Backend not yet accessible - deployment still in progress...');
        } else if (error.response?.status === 503) {
            console.log('🔄 Backend starting up - service temporarily unavailable...');
        } else {
            console.log(`❌ Connection error: ${error.message}`);
        }
        
        const statusUpdate = `
⏳ BACKEND DEPLOYMENT IN PROGRESS...
Check #${checkCount} at ${timestamp}
Status: Not yet accessible
Next check in 30 seconds...

Expected deployment time: 3-5 minutes from start
`;
        fs.writeFileSync('backend-status.txt', statusUpdate);
    }
    
    if (checkCount < maxChecks) {
        console.log(`⏱️  Next check in 30 seconds... (${checkCount}/${maxChecks})`);
        setTimeout(monitorBackendDeployment, 30000);
    } else {
        console.log('⚠️  Monitoring timeout reached. Please check Render deployment manually.');
    }
    
    return false;
}

console.log('🚀 Starting Backend Deployment Monitoring...');
console.log(`📡 Target: ${BACKEND_URL}`);
console.log('⏰ Check interval: 30 seconds');
console.log('🎯 Will monitor until deployment is complete!\n');

monitorBackendDeployment();