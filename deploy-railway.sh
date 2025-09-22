#!/bin/bash

# Automated deployment script for Railway

echo "🚀 Deploying Movie Recommendation App to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Logging in to Railway..."
railway login

# Create new Railway project
echo "📦 Creating new Railway project..."
railway new

# Set environment variables
echo "⚙️ Setting up environment variables..."
echo "Please set the following environment variables in Railway dashboard:"
echo "- MONGO_URI: Your MongoDB Atlas connection string"
echo "- JWT_SECRET: A secure random string"
echo "- TMDB_API_KEY: Your TMDB API key"
echo "- NODE_ENV: production"

# Deploy the application
echo "🌐 Deploying application..."
railway up

echo "✅ Deployment initiated!"
echo "🔗 Check your Railway dashboard for the deployment URL"