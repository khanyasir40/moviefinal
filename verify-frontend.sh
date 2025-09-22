#!/bin/bash

# Frontend Deployment Verification Script
echo "🌐 Starting Frontend Deployment Verification..."

# Check if build directory exists
if [ -d "client/build" ]; then
    echo "✅ Build directory found"
    echo "📊 Build size: $(du -sh client/build | cut -f1)"
    echo "📁 Build contents:"
    ls -la client/build/ | head -10
else
    echo "❌ Build directory not found - running build..."
    cd client
    npm install
    npm run build
    cd ..
fi

# Check environment variables
echo ""
echo "🔧 Environment Configuration:"
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-'Not set - using default'}"
echo "REACT_APP_NODE_ENV: ${REACT_APP_NODE_ENV:-'Not set - using default'}"

# Check package.json
echo ""
echo "📦 Package Information:"
if [ -f "client/package.json" ]; then
    echo "✅ package.json found"
    grep -E '"name"|"version"|"homepage"' client/package.json
else
    echo "❌ package.json not found"
fi

echo ""
echo "🚀 Frontend ready for Netlify deployment!"
echo "📋 Next steps:"
echo "   1. Go to https://netlify.com"
echo "   2. Click 'Add new site' → 'Import an existing project'"
echo "   3. Connect GitHub repository: khanyasir40/moviefinal"
echo "   4. Configure build settings from netlify.toml"
echo "   5. Deploy site"