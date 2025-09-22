#!/bin/bash

echo "🚀 Creating Standalone Backend Repository for Railway"
echo "=================================================="

# Create a new directory for backend-only deployment
mkdir -p ../moviefinal-backend-only

# Copy backend files to new directory
echo "📁 Copying backend files..."
cp -r backend/* ../moviefinal-backend-only/
cp .env.example ../moviefinal-backend-only/

# Create a simple README for the backend
cat > ../moviefinal-backend-only/README.md << 'EOF'
# Movie Recommendation Backend API

This is the backend API for the movie recommendation app.

## Quick Deploy to Railway:

1. Push this repository to GitHub
2. Connect to Railway
3. Add environment variables:
   - MONGO_URI
   - JWT_SECRET
   - TMDB_API_KEY
   - NODE_ENV=production

## API Endpoints:

- GET /health - Health check
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- GET /api/movies/trending - Get trending movies
- GET /api/movies/popular - Get popular movies
- GET /api/movies/search - Search movies

## Environment Variables Required:

```
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=movieapp_super_secret_key_2024_change_in_production
TMDB_API_KEY=e76573d78b5046bbab827df2265a6940
NODE_ENV=production
```

EOF

echo "✅ Backend-only repository created at: ../moviefinal-backend-only"
echo "📤 You can now push this as a separate repository to GitHub"
echo "🚂 Then deploy it to Railway without any root directory issues"