import React from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, loading, error }) => {
  const safeMovies = Array.isArray(movies) ? movies : [];
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
    return (
      <Box sx={{ py: 4 }}>
        <Typography align="center" color="text.secondary">
          No movies found.
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
      <Grid container spacing={3}>
        {safeMovies.map((movie) => (
          <Grid item key={movie.id || movie._id} xs={6} sm={4} md={3} lg={2}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;