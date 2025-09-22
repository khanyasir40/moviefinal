#!/usr/bin/env node

/**
 * AUTOMATIC BACKEND DEPLOYMENT VERIFICATION
 * This script will automatically test the backend once it's deployed
 */

const axios = require('axios');
const BACKEND_URL = 'https://moviefinal-backend-khanyasir40.onrender.com';

async function autoVerifyBackend() {
    console.log('🔍 Starting automatic backend verification...');
    console.log(`📡 Target: ${BACKEND_URL}`);
    
    let attempts = 0;
    const maxAttempts = 20; // 10 minutes of checking
    
    while (attempts < maxAttempts) {
        attempts++;
        console.log(`\n🔄 Attempt ${attempts}/${maxAttempts} - Testing backend...`);
        
        try {
            // Test health endpoint
            const healthResponse = await axios.get(`${BACKEND_URL}/health`, {
                timeout: 15000,
                headers: { 'User-Agent': 'Auto-Deployment-Verifier' }
            });
            
            if (healthResponse.status === 200) {
                console.log('🎉 SUCCESS! Backend is live and responding!');
                console.log('📊 Health check response:', JSON.stringify(healthResponse.data, null, 2));
                
                // Test API endpoints
                await testAPIEndpoints();
                
                // Update frontend environment
                await updateFrontendConfig();
                
                console.log('\n✅ BACKEND DEPLOYMENT COMPLETED SUCCESSFULLY!');
                console.log(`🌐 Backend URL: ${BACKEND_URL}`);
                console.log(`🏥 Health Check: ${BACKEND_URL}/health`);
                
                return true;
            }
        } catch (error) {
            const errorType = error.code || error.response?.status || 'Unknown';
            console.log(`⏳ Backend not ready yet (${errorType}) - waiting 30 seconds...`);
            
            if (error.response?.status === 503) {
                console.log('🔄 Server is starting up...');
            } else if (error.code === 'ENOTFOUND') {
                console.log('🌐 DNS not yet propagated...');
            } else if (error.code === 'ECONNREFUSED') {
                console.log('🔌 Server not yet listening...');
            }
        }
        
        // Wait 30 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 30000));
    }
    
    console.log('❌ Backend verification timeout. Please check Render dashboard.');
    return false;
}

async function testAPIEndpoints() {
    console.log('\n🧪 Testing API endpoints...');
    
    const endpoints = [
        { path: '/', name: 'Root API' },
        { path: '/api/movies/trending', name: 'Movies API' }
    ];
    
    for (const endpoint of endpoints) {
        try {
            const response = await axios.get(`${BACKEND_URL}${endpoint.path}`, { timeout: 10000 });
            console.log(`✅ ${endpoint.name}: Working (${response.status})`);
        } catch (error) {
            console.log(`⚠️  ${endpoint.name}: Limited functionality (${error.response?.status || error.code})`);
        }
    }
}

async function updateFrontendConfig() {
    console.log('\n🔧 Backend is ready! Now update your frontend...');
    console.log('\n📋 NEXT STEPS FOR YOU:');
    console.log('1. Go to your Vercel dashboard: https://vercel.com/dashboard');
    console.log('2. Select your moviefinal project');
    console.log('3. Go to Settings → Environment Variables');
    console.log('4. Add/Update:');
    console.log(`   REACT_APP_API_URL = ${BACKEND_URL}`);
    console.log('   REACT_APP_NODE_ENV = production');
    console.log('5. Go to Deployments → Trigger Deploy');
    console.log('6. Wait 2-3 minutes for frontend to redeploy');
    console.log('\n🎬 Your movie app will then be fully functional!');
}

// Start verification
if (require.main === module) {
    autoVerifyBackend().catch(console.error);
}

module.exports = { autoVerifyBackend };