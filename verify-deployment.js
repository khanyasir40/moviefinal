// Deployment Verification Script for Movie App
const axios = require('axios');

const BACKEND_URL = 'https://moviefinal-backend-khanyasir40.onrender.com';
const FRONTEND_URL = 'https://moviefinal-frontend-khanyasir40.netlify.app';

async function verifyDeployment() {
    console.log('🚀 Starting Movie App Deployment Verification...\n');
    
    let backendStatus = false;
    let frontendStatus = false;
    
    // Test Backend
    console.log('⚡ Testing Backend API...');
    try {
        const healthResponse = await axios.get(`${BACKEND_URL}/health`, { timeout: 10000 });
        if (healthResponse.status === 200) {
            console.log('✅ Backend Health Check: PASSED');
            console.log(`📊 Response: ${JSON.stringify(healthResponse.data)}`);
            backendStatus = true;
        }
    } catch (error) {
        console.log('❌ Backend Health Check: FAILED');
        console.log(`📊 Error: ${error.message}`);
    }
    
    // Test Movies API
    if (backendStatus) {
        try {
            console.log('🎬 Testing Movies API...');
            const moviesResponse = await axios.get(`${BACKEND_URL}/api/movies/trending`, { timeout: 10000 });
            if (moviesResponse.status === 200) {
                console.log('✅ Movies API: WORKING');
                console.log(`📊 Movies found: ${moviesResponse.data.length || 'Mock data active'}`);
            }
        } catch (error) {
            console.log('⚠️  Movies API: Limited (using mock data)');
        }
    }
    
    // Test Frontend
    console.log('\n🌐 Testing Frontend...');
    try {
        const frontendResponse = await axios.get(FRONTEND_URL, { timeout: 10000 });
        if (frontendResponse.status === 200) {
            console.log('✅ Frontend: ACCESSIBLE');
            frontendStatus = true;
        }
    } catch (error) {
        console.log('❌ Frontend: NOT ACCESSIBLE YET');
        console.log(`📊 Error: ${error.message}`);
    }
    
    // Final Status
    console.log('\n' + '='.repeat(50));
    console.log('📋 DEPLOYMENT VERIFICATION SUMMARY:');
    console.log('='.repeat(50));
    console.log(`🔗 Backend API: ${backendStatus ? '✅ LIVE' : '❌ NOT READY'}`);
    console.log(`🔗 Frontend: ${frontendStatus ? '✅ LIVE' : '❌ NOT READY'}`);
    
    if (backendStatus && frontendStatus) {
        console.log('\n🎉 SUCCESS! Your Movie App is FULLY DEPLOYED and ACCESSIBLE!');
        console.log('🌍 Global Access URLs:');
        console.log(`   🎬 Movie App: ${FRONTEND_URL}`);
        console.log(`   ⚡ API: ${BACKEND_URL}`);
        console.log('\n🎯 Ready to use worldwide! 🚀');
    } else {
        console.log('\n⏳ Deployment still in progress... Running verification again in 30 seconds...');
        setTimeout(verifyDeployment, 30000);
    }
}

// Start verification
verifyDeployment().catch(console.error);