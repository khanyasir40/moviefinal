// API Configuration for Development and Production
import { MockMovieService, mockMovies } from '../services/mockService';

// Get base API URL based on environment
export const getApiUrl = () => {
  // In production, use the Render backend URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://moviefinal-backend-khanyasir40.onrender.com';
  }
  
  // In development, use localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

// Check if we should use mock data
export const shouldUseMockData = () => {
  return process.env.REACT_APP_USE_MOCK_DATA === 'true' || 
         process.env.NODE_ENV === 'production'; // Use mock in production until backend is ready
};

// API endpoints configuration
export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    // Auth endpoints
    AUTH: '/api/auth',
    REGISTER: '/api/users',
    
    // Movie endpoints
    MOVIES: '/api/movies',
    TRENDING: '/api/movies/trending',
    POPULAR: '/api/movies/popular',
    TOP_RATED: '/api/movies/top_rated',
    UPCOMING: '/api/movies/upcoming',
    SEARCH: '/api/movies/search',
    GENRES: '/api/movies/genres/all',
    BY_GENRE: '/api/movies/genre',
    
    // User endpoints
    PROFILE: '/api/users/profile',
    FAVORITES: '/api/users/favorites',
    WATCHLIST: '/api/users/watchlist',
    RATINGS: '/api/users/ratings',
    
    // Recommendations
    RECOMMENDATIONS: '/api/recommendations'
  }
};

// Create full URL for any endpoint
export const createApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Debug logging
console.log('API Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: API_CONFIG.BASE_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  USE_MOCK_DATA: shouldUseMockData()
});

// Enhanced API service with fallback to mock data
export const apiService = {
  async get(endpoint) {
    if (shouldUseMockData()) {
      console.log('Using mock data for:', endpoint);
      return this.getMockData(endpoint);
    }

    try {
      const response = await fetch(createApiUrl(endpoint));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
      return this.getMockData(endpoint);
    }
  },

  getMockData(endpoint) {
    if (endpoint.includes('/trending') || endpoint.includes('/popular') || 
        endpoint.includes('/top_rated') || endpoint.includes('/upcoming')) {
      return mockMovies;
    }
    if (endpoint.includes('/search')) {
      return mockMovies.slice(0, 3);
    }
    if (endpoint.includes('/genres')) {
      return MockMovieService.getAllGenres();
    }
    return [];
  }
};