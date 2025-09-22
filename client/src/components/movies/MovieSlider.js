import React, { useState } from 'react';
import { Box, Typography, CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear } from '@mui/icons-material';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieSlider = ({ title, movies, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const safeMovies = Array.isArray(movies) ? movies : [];
  
  // Filter movies based on search query
  const filteredMovies = safeMovies.filter(movie =>
    movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  const settings = {
    dots: false,
    infinite: safeMovies.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!safeMovies.length) {
    return null;
  }

  if (!filteredMovies.length && searchQuery) {
    return (
      <Box sx={{ py: 4 }}>
        {title && (
          <Typography variant="h4" component="h2" gutterBottom>
            {title}
          </Typography>
        )}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search movies"
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
        </Box>
        <Typography align="center" color="text.secondary">
          No movies found matching "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      {title && (
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search movies"
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
      </Box>
      <Slider {...settings}>
        {filteredMovies.map((movie) => (
          <Box key={movie.id || movie._id} sx={{ px: 1 }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MovieSlider;