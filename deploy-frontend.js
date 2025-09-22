#!/usr/bin/env node

const axios = require('axios');
const { execSync } = require('child_process');

async function deployToNetlify() {
    console.log('🚀 Starting Netlify Frontend Deployment...\n');
    
    const BACKEND_URL = 'https://moviefinal-backend-khanyasir40.onrender.com';
    const timestamp = new Date().toLocaleString();
    
    console.log(`⏰ Deployment started: ${timestamp}`);
    console.log(`🔗 Backend URL: ${BACKEND_URL}`);
    
    // Verify backend is accessible
    console.log('\n🔍 Verifying backend accessibility...');
    try {
        const healthCheck = await axios.get(`${BACKEND_URL}/health`, { timeout: 10000 });
        console.log('✅ Backend is accessible and healthy!');
        console.log(`📊 Response: ${JSON.stringify(healthCheck.data)}`);
    } catch (error) {
        console.log('⚠️  Backend not yet fully accessible, proceeding with deployment...');
    }
    
    // Update environment variable in client
    console.log('\n🔧 Configuring API endpoint...');
    const envContent = `# Production Environment Variables
REACT_APP_API_URL=${BACKEND_URL}
REACT_APP_NODE_ENV=production
GENERATE_SOURCEMAP=false
CI=false
`;
    
    require('fs').writeFileSync('client/.env.production', envContent);
    console.log('✅ Environment variables configured');
    
    // Build the frontend
    console.log('\n📦 Building frontend...');
    try {
        process.chdir('client');
        console.log('Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
        
        console.log('Building production build...');
        execSync('npm run build', { stdio: 'inherit' });
        
        console.log('✅ Frontend build completed successfully!');
        process.chdir('..');
    } catch (error) {
        console.log('❌ Build failed:', error.message);
        return false;
    }
    
    console.log('\n🌐 Frontend is ready for Netlify deployment!');
    console.log('\n📋 Manual Netlify Steps:');
    console.log('1. Go to https://netlify.com');
    console.log('2. Click "Add new site" → "Import an existing project"');
    console.log('3. Connect GitHub: khanyasir40/moviefinal');
    console.log('4. Configure:');
    console.log('   - Base directory: client');
    console.log('   - Build command: npm run build');
    console.log('   - Publish directory: client/build');
    console.log('5. Add environment variables:');
    console.log(`   - REACT_APP_API_URL: ${BACKEND_URL}`);
    console.log('   - REACT_APP_NODE_ENV: production');
    console.log('6. Click "Deploy site"');
    
    console.log('\n🎯 Expected frontend URL: https://moviefinal-frontend-khanyasir40.netlify.app');
    
    return true;
}

deployToNetlify().catch(console.error);