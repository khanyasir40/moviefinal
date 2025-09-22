import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { createApiUrl, API_CONFIG, apiService } from '../config/api';
import MovieSlider from '../components/movies/MovieSlider';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Home: Starting to fetch movies...');
        console.log('Home: API Base URL:', getApiUrl());
        
        // Fetch trending movies
        const trendingData = await apiService.get(API_CONFIG.ENDPOINTS.TRENDING);
        console.log('Home: Trending data received:', trendingData);
        setTrendingMovies(Array.isArray(trendingData) ? trendingData : (trendingData.results || []));
        
        // Set featured movie from trending
        const trending = Array.isArray(trendingData) ? trendingData : (trendingData.results || []);
        if (trending && trending.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trending.length));
          setFeaturedMovie(trending[randomIndex]);
        } else {
          setFeaturedMovie(null);
        }
        
        // Fetch popular movies
        const popularData = await apiService.get(API_CONFIG.ENDPOINTS.POPULAR);
        setPopularMovies(Array.isArray(popularData) ? popularData : (popularData.results || []));
        
        // Fetch top rated movies
        const topRatedData = await apiService.get(API_CONFIG.ENDPOINTS.TOP_RATED);
        setTopRatedMovies(Array.isArray(topRatedData) ? topRatedData : (topRatedData.results || []));
        
        // Fetch upcoming movies
        const upcomingData = await apiService.get(API_CONFIG.ENDPOINTS.UPCOMING);
        setUpcomingMovies(Array.isArray(upcomingData) ? upcomingData : (upcomingData.results || []));
        
        // Fetch personalized recommendations if authenticated
        if (isAuthenticated) {
          try {
            const recommendationsData = await apiService.get(API_CONFIG.ENDPOINTS.RECOMMENDATIONS);
            setPersonalizedRecommendations(Array.isArray(recommendationsData.movies) ? recommendationsData.movies : []);
          } catch (err) {
            console.error('Error fetching recommendations:', err);
          }
        }
        
        console.log('Home: All data fetched successfully');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Using offline mode with sample movies.');
        setLoading(false);
      }
    };
    fetchMovies();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center" sx={{ my: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section with Featured Movie */}
      {featuredMovie && (
        <Box className="hero-section">
          <Box 
            className="hero-backdrop"
            sx={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
            }}
          />
          <Container className="hero-content">
            <Typography variant="h2" component="h1" gutterBottom>
              {featuredMovie.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {featuredMovie.overview}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              href={`/movie/${featuredMovie.id}`}
            >
              View Details
            </Button>
          </Container>
        </Box>
      )}
      <Container maxWidth="xl">
        {/* Show error details if present */}
        {error && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="error">
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              If you see this message, check your API server, network connection, or authentication setup.<br />
              Try logging in again or check the browser console for more details.
            </Typography>
          </Box>
        )}
        {/* Fallback if no movies loaded and no error */}
        {!error && (!Array.isArray(trendingMovies) || trendingMovies.length === 0) &&
         (!Array.isArray(popularMovies) || popularMovies.length === 0) &&
         (!Array.isArray(topRatedMovies) || topRatedMovies.length === 0) &&
         (!Array.isArray(upcomingMovies) || upcomingMovies.length === 0) &&
         (!isAuthenticated || !Array.isArray(personalizedRecommendations) || personalizedRecommendations.length === 0) && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary">
              No movies found. Please check your connection, login, or try again later.
            </Typography>
          </Box>
        )}
        {/* Personalized Recommendations */}
        {isAuthenticated && Array.isArray(personalizedRecommendations) && personalizedRecommendations.length > 0 && (
          <MovieSlider 
            title="Recommended for You" 
            movies={personalizedRecommendations} 
            loading={loading} 
          />
        )}
        {/* Trending Movies */}
        <MovieSlider 
          title="Trending Now" 
          movies={trendingMovies} 
          loading={loading} 
          error={error} 
        />
        {/* Popular Movies */}
        <MovieSlider 
          title="Popular Movies" 
          movies={popularMovies} 
          loading={loading} 
        />
        {/* Recommendations */}
        <MovieSlider 
          title="Recommendations" 
          movies={topRatedMovies} 
          loading={loading} 
        />
        {/* Upcoming Movies */}
        <MovieSlider 
          title="Coming Soon" 
          movies={upcomingMovies} 
          loading={loading} 
        />
      </Container>
    </Box>
  );
};

export default Home;