import axios from 'axios';

// Base API URL
const API_BASE_URL = '/api';

// Movie Service Class
class MovieService {
  // Fetch movie details by ID
  static async getMovieById(movieId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  // Fetch multiple movies by IDs
  static async getMoviesByIds(movieIds) {
    try {
      const promises = movieIds.map(id => this.getMovieById(id));
      const movies = await Promise.all(promises);
      return movies.filter(movie => movie !== null);
    } catch (error) {
      console.error('Error fetching multiple movies:', error);
      return [];
    }
  }

  // Search movies
  static async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  }

  // Get movies by category
  static async getMoviesByCategory(category, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${category}?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by category:', error);
      return [];
    }
  }

  // Get all genres
  static async getAllGenres() {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/genres/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }

  // Get movies by genre
  static async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/genre/${genreId}?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  }
}

export default MovieService; 