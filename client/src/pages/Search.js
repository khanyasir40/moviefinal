import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_CONFIG } from '../config/api';
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Paper,
  Button
} from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
import MovieList from '../components/movies/MovieList';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const initialGenre = queryParams.get('genre') || '';
  // eslint-disable-next-line no-unused-vars
  const initialCategory = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  
  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get('/api/movies/genres/all');
        setGenres(data);
      } catch (err) {
        console.error('Failed to fetch genres', err);
      }
    };
    
    fetchGenres();
  }, []);

  // Fetch movies when URL search params change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const category = params.get('category') || '';
    const genre = params.get('genre') || '';
    const currentPage = parseInt(params.get('page')) || 1;

    setSearchQuery(query);
    setSelectedGenre(genre);
    setPage(currentPage);

    const searchMovies = async () => {
      if (!query && !genre && !category) {
        setMovies([]);
        setTotalPages(0);
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        let endpoint;
        const requestParams = { page: currentPage };
        
        if (query) {
          endpoint = createApiUrl(API_CONFIG.ENDPOINTS.SEARCH);
          requestParams.query = query;
        } else if (genre) {
          endpoint = createApiUrl(`${API_CONFIG.ENDPOINTS.BY_GENRE}/${genre}`);
        } else if (category) {
          endpoint = createApiUrl(`${API_CONFIG.ENDPOINTS.MOVIES}/${category}`);
        } else {
          setLoading(false);
          return;
        }
        
        const { data } = await axios.get(endpoint, { params: requestParams });
        setMovies(Array.isArray(data) ? data : (data.results || []));
        setTotalPages(Math.min(data.total_pages || 0, 500));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };
    
    searchMovies();
  }, [location.search]);
  
  const updateUrl = (newParams) => {
    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/search?${params.toString()}`, { replace: true });
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    updateUrl({ query: '' });
  };
  
  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set('page', value.toString());
    navigate(`/search?${params.toString()}`);
    window.scrollTo(0, 0);
  };
  
  const handleGenreChange = (event) => {
    const genreValue = event.target.value;
    setSelectedGenre(genreValue);
    updateUrl({ genre: genreValue, query: '', category: '' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUrl({ query: searchQuery, genre: '', category: '' });
  };
  
  // Get page title based on category
  const getPageTitle = () => {
    const category = new URLSearchParams(location.search).get('category');
    if (category === 'popular') return 'Popular Movies';
    if (category === 'top_rated') return 'Top Rated Movies';
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (selectedGenre) {
      const genreName = genres.find(g => g.id.toString() === selectedGenre)?.name || 'Genre';
      return `${genreName} Movies`;
    }
    return 'Discover Movies';
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {getPageTitle()}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search for movies"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch} edge="end">
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                  labelId="genre-select-label"
                  id="genre-select"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  label="Genre"
                >
                  <MenuItem value="">
                    <em>All Genres</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id.toString()}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ height: 56 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ my: 4 }}>
          {error}
        </Typography>
      ) : movies.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            {searchQuery ? `Search results for "${searchQuery}"` : 'Browse movies'}
            {selectedGenre && genres.length > 0 && ` in ${genres.find(g => g.id.toString() === selectedGenre)?.name}`}
          </Typography>
          
          <MovieList movies={movies} />
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography align="center" sx={{ my: 4 }}>
          {searchQuery || selectedGenre ? 'No movies found. Try a different search term or genre.' : 'Enter a search term or select a genre to find movies.'}
        </Typography>
      )}
    </Container>
  );
};

export default Search;