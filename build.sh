#!/bin/bash

# Netlify Build Script for Movie App Frontend
echo "🚀 Starting Movie App Frontend Build..."

# Navigate to client directory
cd client || exit 1

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create production environment file
echo "🔧 Setting up environment variables..."
echo "REACT_APP_API_URL=https://moviefinal-backend-khanyasir40.onrender.com" > .env.production
echo "REACT_APP_NODE_ENV=production" >> .env.production
echo "GENERATE_SOURCEMAP=false" >> .env.production
echo "CI=false" >> .env.production

# Build the application
echo "🏗️  Building React application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output located in client/build/"