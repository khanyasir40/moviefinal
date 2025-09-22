const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');

const Movie = require('../../models/Movie');

// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Mock data for when TMDB API is not available
const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-22",
    vote_average: 9.3,
    vote_count: 24000,
    genres: ["Drama", "Crime"]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    vote_average: 9.2,
    vote_count: 18000,
    genres: ["Drama", "Crime"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 27000,
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2QM528GluxMcOt.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 20000,
    genres: ["Crime", "Drama"]
  },
  {
    id: 5,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    release_date: "1999-10-15",
    vote_average: 8.8,
    vote_count: 22000,
    genres: ["Drama"]
  }
];

// Helper function to get movies from TMDB or fallback to mock data
const getMoviesFromAPI = async (endpoint) => {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
      console.log('TMDB API key not configured, using mock data');
      return mockMovies;
    }
    
    const response = await axios.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
    return response.data.results || [];
  } catch (error) {
    console.error('TMDB API error:', error.message);
    console.log('Falling back to mock data');
    return mockMovies;
  }
};

// @route   GET api/movies/trending
// @desc    Get trending movies
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const movies = await getMoviesFromAPI('/trending/movie/week');
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.json(mockMovies);
  }
});

// @route   GET api/movies/popular
// @desc    Get popular movies
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const movies = await getMoviesFromAPI('/movie/popular');
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.json(mockMovies);
  }
});

// @route   GET api/movies/top_rated
// @desc    Get top rated movies
// @access  Public
router.get('/top_rated', async (req, res) => {
  try {
    const movies = await getMoviesFromAPI('/movie/top_rated');
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.json(mockMovies);
  }
});

// @route   GET api/movies/upcoming
// @desc    Get upcoming movies
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const movies = await getMoviesFromAPI('/movie/upcoming');
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.json(mockMovies);
  }
});

// @route   GET api/movies/search
// @desc    Search movies by title
// @access  Public
router.get('/search', async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ msg: 'Query parameter is required' });
  }
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
      // Search in mock data
      const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      return res.json(filteredMovies);
    }
    
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`
    );
    
    res.json(response.data.results || []);
  } catch (err) {
    console.error(err.message);
    // Fallback to mock data search
    const filteredMovies = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredMovies);
  }
});

// @route   GET api/movies/genres/all
// @desc    Get all movie genres
// @access  Public
router.get('/genres/all', async (req, res) => {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
      return res.json([
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" }
      ]);
    }
    
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    
    res.json(response.data.genres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/movies/genre/:id
// @desc    Get movies by genre
// @access  Public
router.get('/genre/:id', async (req, res) => {
  const { page = 1 } = req.query;
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
      return res.json(mockMovies);
    }
    
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${req.params.id}&page=${page}`
    );
    
    res.json(response.data.results || []);
  } catch (err) {
    console.error(err.message);
    res.json(mockMovies);
  }
});

// @route   GET api/movies/:id
// @desc    Get movie by ID (MUST BE LAST to avoid conflicts)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // First check our database
    let movie = await Movie.findOne({ tmdbId: req.params.id });
    
    // If not in our database, fetch from TMDB API or use mock data
    if (!movie) {
      if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
        // Return mock movie data
        const mockMovie = mockMovies.find(m => m.id.toString() === req.params.id) || mockMovies[0];
        return res.json({
          ...mockMovie,
          tmdbId: mockMovie.id,
          videos: { results: [] },
          similar: { results: mockMovies.filter(m => m.id !== mockMovie.id) }
        });
      }
      
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`
      );
      
      // Extract director from crew
      const director = response.data.credits.crew.find(
        (person) => person.job === 'Director'
      );
      
      // Extract cast (top 10) with full details
      const cast = response.data.credits.cast
        .slice(0, 10)
        .map((person) => ({
          id: person.id,
          name: person.name,
          character: person.character,
          profile_path: person.profile_path
        }));
      
      // Create movie object
      const movieData = {
        tmdbId: response.data.id,
        title: response.data.title,
        overview: response.data.overview,
        poster_path: response.data.poster_path,
        backdrop_path: response.data.backdrop_path,
        release_date: response.data.release_date,
        genres: response.data.genres.map((genre) => genre.name),
        runtime: response.data.runtime,
        vote_average: response.data.vote_average,
        vote_count: response.data.vote_count,
        popularity: response.data.popularity,
        director: director ? director.name : '',
        cast: cast
      };
      
      // Save to our database for future requests
      movie = new Movie(movieData);
      await movie.save();
      
      // Add videos and similar movies to response
      movieData.videos = response.data.videos;
      movieData.similar = response.data.similar;
      
      return res.json(movieData);
    }
    
    // If movie is in our database, fetch additional data from TMDB API
    if (TMDB_API_KEY && TMDB_API_KEY !== 'your_tmdb_api_key_here') {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${req.params.id}?api_key=${TMDB_API_KEY}&append_to_response=videos,similar`
      );
      
      // Combine our database data with TMDB API data
      const movieData = movie.toObject();
      movieData.videos = response.data.videos;
      movieData.similar = response.data.similar;
      
      res.json(movieData);
    } else {
      // Return database movie with mock additional data
      const movieData = movie.toObject();
      movieData.videos = { results: [] };
      movieData.similar = { results: mockMovies.filter(m => m.id !== movie.tmdbId) };
      res.json(movieData);
    }
  } catch (err) {
    console.error(err.message);
    // Return mock movie as fallback
    const mockMovie = mockMovies.find(m => m.id.toString() === req.params.id) || mockMovies[0];
    res.json({
      ...mockMovie,
      tmdbId: mockMovie.id,
      videos: { results: [] },
      similar: { results: mockMovies.filter(m => m.id !== mockMovie.id) }
    });
  }
});

module.exports = router;