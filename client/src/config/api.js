// API Configuration for Development and Production
import { MockMovieService, mockMovies } from '../services/mockService';

// Get base API URL based on environment
export const getApiUrl = () => {
  // In production, use the Vercel backend URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 
           'https://movie-app-backend-zeta.vercel.app';
  }
  
  // In development, use localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

// Check if we should use mock data
export const shouldUseMockData = () => {
  return process.env.REACT_APP_USE_MOCK_DATA === 'true' || true; // Temporarily enable mock data as fallback
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

// Enhanced API service with direct backend connection
export const apiService = {
  async get(endpoint) {
    try {
      console.log('API Request to:', createApiUrl(endpoint));
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(createApiUrl(endpoint), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response successful for:', endpoint);
      return data;
    } catch (error) {
      console.error('API call failed for', endpoint, ':', error.message);
      
      // If it's a timeout or network error, try mock data
      if (error.name === 'AbortError' || error.message.includes('fetch')) {
        console.log('Network timeout or error, falling back to mock data');
        return this.getMockData(endpoint);
      }
      
      // Only fall back to mock data if explicitly enabled
      if (shouldUseMockData()) {
        console.log('Falling back to mock data for:', endpoint);
        return this.getMockData(endpoint);
      }
      
      // Return empty array to prevent loading loops
      console.log('Returning empty data to prevent infinite loading');
      return [];
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