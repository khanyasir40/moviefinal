# Deployment Guide

## Project Structure
```
movie_backup/
├── backend/          # Node.js/Express backend
├── client/           # React frontend
├── .env.example      # Environment variables template
├── vercel.json       # Vercel deployment config
├── Dockerfile        # Docker deployment config
└── package.json      # Root package.json for scripts
```

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. **Frontend on Vercel:**
   ```bash
   # Deploy client only
   cd client
   npm run build
   # Connect to Vercel and deploy the build folder
   ```

2. **Backend on Railway/Render:**
   ```bash
   # Deploy backend folder to Railway or Render
   # Set environment variables in the platform
   ```

### Option 2: Full-Stack on Railway

1. Connect your GitHub repository to Railway
2. Set the root directory to `/backend`
3. Set environment variables
4. Railway will automatically deploy

### Option 3: Netlify + Heroku

1. **Frontend on Netlify:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Build from `client` folder

2. **Backend on Heroku:**
   - Deploy `backend` folder
   - Set environment variables

### Option 4: Docker Deployment

```bash
# Build the Docker image
docker build -t movie-app .

# Run the container
docker run -p 5000:5000 --env-file .env movie-app
```

## Environment Variables Required

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `TMDB_API_KEY`: The Movie Database API key
- `NODE_ENV`: production
- `PORT`: 5000 (or platform default)

## Database Setup

### MongoDB Atlas (Recommended)
1. Create account at https://cloud.mongodb.com
2. Create a cluster
3. Get connection string
4. Add to `MONGO_URI` in .env

### TMDB API
1. Sign up at https://www.themoviedb.org/
2. Request API key from settings
3. Add to `TMDB_API_KEY` in .env

## Build Commands

- **Development:** `npm run dev`
- **Production Build:** `npm run build`
- **Start Server:** `npm start`

## Platform-Specific Instructions

### Vercel
- Root: `/`
- Framework: Other
- Build Command: `npm run build`
- Output Directory: `client/build`

### Railway
- Root: `/backend`
- Start Command: `npm start`

### Render
- Root: `/backend`
- Build Command: `npm install`
- Start Command: `npm start`