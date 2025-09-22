import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip
  
} from '@mui/material';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const MovieCard = ({ movie, showRating = true }) => {
  const { isAuthenticated, user, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist } = useAuth();
  
  // Check if movie is in user's favorites
  const isFavorite = isAuthenticated && user?.favorites?.some(fav => 
    fav === movie._id || fav === movie.id || fav === movie.tmdbId
  );
  
  // Check if movie is in user's watchlist
  const isInWatchlist = isAuthenticated && user?.watchlist?.some(item => 
    item === movie._id || item === movie.id || item === movie.tmdbId
  );
  
  // Defensive: always enable favorite/watchlist actions if user exists
  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to add movies to favorites');
      return;
    }
    const movieId = movie._id || movie.id || movie.tmdbId;
    console.log('Toggling favorite for movie:', movieId, 'Current state:', isFavorite);
    try {
      const result = await (isFavorite ? removeFromFavorites(movieId) : addToFavorites(movieId));
      if (result) {
        console.log('Favorite toggle successful');
        // Show success message
        alert(isFavorite ? 'Removed from favorites!' : 'Added to favorites!');
      } else {
        alert('Failed to update favorites. Please try again.');
      }
    } catch (err) {
      console.error('Favorite toggle failed:', err);
      alert('Failed to update favorites. Please try again.');
    }
  };
  
  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Please login to add movies to watchlist');
      return;
    }
    const movieId = movie._id || movie.id || movie.tmdbId;
    console.log('Toggling watchlist for movie:', movieId, 'Current state:', isInWatchlist);
    try {
      const result = await (isInWatchlist ? removeFromWatchlist(movieId) : addToWatchlist(movieId));
      if (result) {
        console.log('Watchlist toggle successful');
        // Show success message
        alert(isInWatchlist ? 'Removed from watchlist!' : 'Added to watchlist!');
      } else {
        alert('Failed to update watchlist. Please try again.');
      }
    } catch (err) {
      console.error('Watchlist toggle failed:', err);
      alert('Failed to update watchlist. Please try again.');
    }
  };
  
  // Format release date
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.getFullYear();
  };

  // Defensive: fallback for genres
  const safeGenres = Array.isArray(movie.genres) ? movie.genres : [];

  return (
    <Card className="movie-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={RouterLink} to={`/movie/${movie.id || movie.tmdbId || movie._id}`} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {showRating && (
              <>
                <Rating 
                  name="read-only" 
                  value={movie.vote_average ? movie.vote_average / 2 : 0} 
                  precision={0.5} 
                  readOnly 
                  size="small"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                </Typography>
              </>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {formatReleaseDate(movie.release_date)}
          </Typography>
          {safeGenres.length > 0 && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {safeGenres.slice(0, 2).map((genre, index) => (
                <Chip 
                  key={index} 
                  label={genre} 
                  size="small" 
                  sx={{ fontSize: '0.7rem' }} 
                />
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      {isAuthenticated && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
          <Box 
            onClick={handleFavoriteToggle}
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              color: isFavorite ? 'primary.main' : 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </Box>
          <Box 
            onClick={handleWatchlistToggle}
            sx={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              color: isInWatchlist ? 'secondary.main' : 'text.secondary',
              '&:hover': {
                color: 'secondary.main',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isInWatchlist ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default MovieCard;