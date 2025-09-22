import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  LinearProgress,
  Collapse,
  CardActions as MuiCardActions
} from '@mui/material';
import {
  Favorite,
  Bookmark,
  Star,
  Delete,
  Visibility,
  ExpandMore,
  ExpandLess,
  CalendarToday,
  AccessTime,
  TrendingUp,
  Language
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const EnhancedMovieCard = ({ movie, collectionType, onRemove, onRate }) => {
  const { isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear();
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleRatingSubmit = () => {
    if (rating > 0 && onRate) {
      onRate(movie.id, rating);
      setShowRatingDialog(false);
      setRating(0);
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8
        }
      }}>
        {/* Movie Poster */}
        <CardMedia
          component="img"
          height="300"
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Rating Badge */}
        {movie.vote_average && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.8)',
              color: 'white',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              backdropFilter: 'blur(4px)'
            }}
          >
            {movie.vote_average.toFixed(1)}
          </Box>
        )}

        {/* Collection Type Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: collectionType === 'favorites' ? 'primary.main' : 'secondary.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.7rem',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)'
          }}
        >
          {collectionType === 'favorites' ? 'FAVORITE' : 'WATCHLIST'}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Title */}
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          
          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={movie.vote_average ? movie.vote_average / 2 : 0} 
              precision={0.5} 
              readOnly 
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
            </Typography>
          </Box>
          
          {/* Release Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarToday sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(movie.release_date)}
            </Typography>
          </Box>

          {/* Runtime */}
          {movie.runtime && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTime sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formatRuntime(movie.runtime)}
              </Typography>
            </Box>
          )}

          {/* Popularity */}
          {movie.popularity && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Popularity: {movie.popularity.toFixed(1)}
              </Typography>
            </Box>
          )}
          
          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {movie.genres.slice(0, 2).map((genre, index) => (
                <Chip 
                  key={index} 
                  label={genre} 
                  size="small" 
                  sx={{ fontSize: '0.7rem' }} 
                />
              ))}
            </Box>
          )}
          
          {/* Overview */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {truncateText(movie.overview || 'No description available')}
          </Typography>

          {/* Expandable Details */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {movie.overview || 'No description available'}
              </Typography>
              
              {/* Director */}
              {movie.director && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Director:</strong> {movie.director}
                  </Typography>
                </Box>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Cast:</strong> {movie.cast.slice(0, 3).map(person => person.name).join(', ')}
                    {movie.cast.length > 3 && '...'}
                  </Typography>
                </Box>
              )}
            </Box>
          </Collapse>
        </CardContent>

        <MuiCardActions sx={{ justifyContent: 'space-between', p: 1 }}>
          <Box>
            {/* Expand/Collapse Button */}
            <Tooltip title={expanded ? "Show Less" : "Show More"}>
              <IconButton 
                size="small" 
                onClick={() => setExpanded(!expanded)}
                color="primary"
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Tooltip>

            {/* Rate Movie Button */}
            <Tooltip title="Rate Movie">
              <IconButton 
                size="small" 
                onClick={() => setShowRatingDialog(true)}
                color="primary"
              >
                <Star />
              </IconButton>
            </Tooltip>

            {/* View Details Button */}
            <Tooltip title="View Details">
              <IconButton 
                size="small" 
                component={RouterLink} 
                to={`/movie/${movie.id || movie.tmdbId}`}
                color="primary"
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Remove Button */}
          <Tooltip title={`Remove from ${collectionType}`}>
            <IconButton 
              size="small" 
              onClick={() => onRemove && onRemove(movie.id || movie.tmdbId)}
              color="error"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </MuiCardActions>
      </Card>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => setShowRatingDialog(false)}>
        <DialogTitle>Rate Movie</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" gutterBottom>
              {movie.title}
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              max={10}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {rating}/10
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRatingDialog(false)}>Cancel</Button>
          <Button onClick={handleRatingSubmit} variant="contained" disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EnhancedMovieCard; 