#!/bin/bash

echo "🐱 Creating GitHub repository and deploying..."
echo "Repository: movie-recommendation-app"
echo "User: khanyasir40"

# Create GitHub repository using GitHub CLI
echo "📝 Creating repository on GitHub..."
gh repo create movie-recommendation-app --public --description "Netflix-like movie recommendation app built with React, Node.js, and MongoDB. Features user authentication, movie browsing, search, and personalized recommendations."

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/khanyasir40/movie-recommendation-app.git

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository URL: https://github.com/khanyasir40/movie-recommendation-app"
echo "📁 Your compressed file is ready at: ../MovieApp_Clean_Ready_to_Deploy.zip"

echo ""
echo "🚀 Next steps:"
echo "1. Visit your GitHub repository"
echo "2. Connect to Railway/Vercel for deployment"
echo "3. Set up environment variables"
echo "4. Your app will be live!"