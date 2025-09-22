const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Movie = require('../../models/Movie');

// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// @route   GET api/recommendations
// @desc    Get personalized movie recommendations for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get user data with populated movie information
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('favorites')
      .populate('watchlist')
      .populate('ratings.movie');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Mock movies for recommendations
    const mockMovies = [
      {
        id: 1,
        title: "The Shawshank Redemption",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        vote_average: 9.3,
        genres: ["Drama", "Crime"]
      },
      {
        id: 2,
        title: "The Godfather",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        vote_average: 9.2,
        genres: ["Drama", "Crime"]
      },
      {
        id: 3,
        title: "The Dark Knight",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        vote_average: 9.0,
        genres: ["Action", "Crime", "Drama"]
      },
      {
        id: 4,
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        vote_average: 8.9,
        genres: ["Crime", "Drama"]
      },
      {
        id: 5,
        title: "Fight Club",
        overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        vote_average: 8.8,
        genres: ["Drama"]
      }
    ];
    
    // If user has no ratings, favorites or watchlist, return popular movies
    if (user.ratings.length === 0 && user.favorites.length === 0 && user.watchlist.length === 0) {
      try {
        if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
          return res.json({
            type: 'popular',
            message: 'Based on popular movies',
            movies: mockMovies
          });
        }
        
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        
        return res.json({
          type: 'popular',
          message: 'Based on popular movies',
          movies: response.data.results || []
        });
      } catch (apiError) {
        console.error('TMDB API error:', apiError.message);
        return res.json({
          type: 'popular',
          message: 'Based on popular movies',
          movies: mockMovies
        });
      }
    }
    
    // Get user's favorite genres based on ratings and favorites
    const genreCounts = {};
    
    // Count genres from rated movies
    for (const ratingItem of user.ratings) {
      if (ratingItem.movie && ratingItem.movie.genres) {
        for (const genre of ratingItem.movie.genres) {
          genreCounts[genre] = (genreCounts[genre] || 0) + ratingItem.rating / 2; // Weight by rating
        }
      }
    }
    
    // Count genres from favorites
    for (const movie of user.favorites) {
      if (movie && movie.genres) {
        for (const genre of movie.genres) {
          genreCounts[genre] = (genreCounts[genre] || 0) + 3; // Higher weight for favorites
        }
      }
    }
    
    // Count genres from watchlist
    for (const movie of user.watchlist) {
      if (movie && movie.genres) {
        for (const genre of movie.genres) {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1; // Lower weight for watchlist
        }
      }
    }
    
    // Sort genres by count
    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    // Get genre IDs from TMDB API
    const genresResponse = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    
    const genreMap = {};
    genresResponse.data.genres.forEach(genre => {
      genreMap[genre.name] = genre.id;
    });
    
    // Get top 3 genres
    const topGenres = sortedGenres.slice(0, 3);
    
    // Get movies based on top genres
    const topGenreIds = topGenres
      .map(genre => genreMap[genre])
      .filter(id => id) // Filter out undefined
      .join('|');
    
    if (!topGenreIds) {
      // Fallback to popular movies if no valid genre IDs
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
      );
      
      return res.json({
        type: 'popular',
        message: 'Based on popular movies',
        movies: response.data.results
      });
    }
    
    // Get recommendations based on genres
    const recommendationsResponse = await axios.get(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${topGenreIds}&sort_by=popularity.desc`
    );
    
    // Filter out movies that are already in favorites or watchlist
    const userMovieIds = new Set([
      ...user.favorites.map(m => m.tmdbId),
      ...user.watchlist.map(m => m.tmdbId),
      ...user.ratings.map(r => r.movie?.tmdbId)
    ].filter(id => id)); // Filter out undefined
    
    const filteredRecommendations = recommendationsResponse.data.results.filter(
      movie => !userMovieIds.has(movie.id)
    );
    
    res.json({
      type: 'personalized',
      message: `Based on your interest in ${topGenres.join(', ')}`,
      movies: filteredRecommendations
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/recommendations/similar/:id
// @desc    Get similar movies to a specific movie
// @access  Public
router.get('/similar/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}/similar?api_key=${TMDB_API_KEY}`
    );
    
    res.json(response.data.results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/recommendations/because-you-watched/:id
// @desc    Get recommendations based on a movie the user watched
// @access  Public
router.get('/because-you-watched/:id', async (req, res) => {
  try {
    // Get movie details first
    const movieResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}`
    );
    
    // Get recommendations
    const recommendationsResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${req.params.id}/recommendations?api_key=${TMDB_API_KEY}`
    );
    
    res.json({
      movie: movieResponse.data,
      recommendations: recommendationsResponse.data.results
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;