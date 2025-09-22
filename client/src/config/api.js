// API Configuration for Development and Production

// Get base API URL based on environment
export const getApiUrl = () => {
  // In production, use the Railway backend URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://zestful-enchantment-production.up.railway.app';
  }
  
  // In development, use localhost
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
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
  REACT_APP_API_URL: process.env.REACT_APP_API_URL
});