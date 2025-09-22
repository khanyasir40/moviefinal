# Movie Recommendation App

A Netflix-like movie recommendation application built with React, Node.js, and MongoDB.

## Features

- 🎬 Browse trending, popular, and top-rated movies
- 🔍 Search movies by title
- 👤 User authentication and registration
- ❤️ Add movies to favorites and watchlist
- ⭐ Rate movies and get personalized recommendations
- 📱 Responsive design for all devices
- 🎨 Modern dark theme UI

## Managing Project Size

This project includes a cleanup script to help manage disk space by removing unnecessary files:

1. Run `cleanup.bat` to remove:
   - All node_modules folders
   - Build directories
   - Log files

2. Use the .gitignore file to prevent committing large files

3. When needed, reinstall dependencies with:
   - Server: `npm install`
   - Client: `cd client && npm install`
   - Mobile app: `cd mobile-app && npm install`

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd movie
```

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/movieapp

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# TMDB API Key (for movie data)
TMDB_API_KEY=your_tmdb_api_key_here

# Node Environment
NODE_ENV=development

# Server Port
PORT=5000
```

### 4. MongoDB Setup

#### Option A: Local MongoDB Installation

1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and replace the `MONGO_URI` in your `.env` file

### 5. TMDB API Key

1. Sign up at [The Movie Database](https://www.themoviedb.org/settings/api)
2. Request an API key
3. Add the API key to your `.env` file

### 6. Running the Application

#### Development Mode (Recommended)

```bash
# Start both server and client concurrently
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend client on `http://localhost:3000`

#### Production Mode

```bash
# Build the client
npm run build

# Start the server
npm start
```

## Project Structure

```
movie/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   └── theme.js       # Material-UI theme
│   └── package.json
├── middleware/            # Express middleware
├── models/               # MongoDB models
├── routes/               # API routes
│   └── api/
├── server.js             # Express server
├── package.json
└── .env                  # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/users` - Register user
- `POST /api/auth` - Login user
- `GET /api/auth` - Get authenticated user

### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/top_rated` - Get top-rated movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/search` - Search movies
- `GET /api/movies/:id` - Get movie details

### User Actions
- `PUT /api/users/favorites/:id` - Add to favorites
- `DELETE /api/users/favorites/:id` - Remove from favorites
- `PUT /api/users/watchlist/:id` - Add to watchlist
- `DELETE /api/users/watchlist/:id` - Remove from watchlist
- `POST /api/users/ratings/:id` - Rate a movie

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/similar/:id` - Get similar movies

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - For local MongoDB: `mongodb://localhost:27017/movieapp`

2. **TMDB API Errors**
   - Verify your API key is correct
   - Check if you've exceeded API rate limits
   - Ensure the API key is added to `.env`

3. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill processes using the port: `npx kill-port 5000`

4. **Client Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in React components

5. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in `.env`
   - Verify user registration/login endpoints

### Development Tips

- Use `npm run dev` for development (runs both server and client)
- Check browser console for frontend errors
- Check server console for backend errors
- Use Postman or similar tool to test API endpoints

## Technologies Used

- **Frontend**: React, Material-UI, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs
- **External API**: The Movie Database (TMDB)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details