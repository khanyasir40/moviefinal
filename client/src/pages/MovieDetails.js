import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Fade,
  Slide,
  Grow
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  PlayArrow,
  Star,
  AccessTime,
  CalendarToday,
  TrendingUp,
  Language,
  Person,
  Movie,
  Close
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import MovieList from '../components/movies/MovieList';

const MovieDetails = () => {
  const { id } = useParams();
  const { user, addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist, rateMovie } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [openTrailer, setOpenTrailer] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  // Check if movie is in user's favorites or watchlist
  const isFavorite = user?.favorites?.some(favId => favId === id);
  const isInWatchlist = user?.watchlist?.some(watchId => watchId === id);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const { data } = await axios.get(`/api/movies/${id}`);
        setMovie(data);
        
        // Similar movies and videos are included in the main movie data
        setSimilarMovies(data?.similar?.results || []);
        
        if (data.videos && data.videos.results) {
          const trailer = data.videos.results.find(video => video.type === 'Trailer') || data.videos.results[0];
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        }
        
        // Get user's rating for this movie if logged in
        if (user && user.ratings) {
          const userMovieRating = user.ratings.find(rating => rating.movie === Number(id));
          if (userMovieRating) {
            setUserRating(userMovieRating.rating);
          }
        }
        
        setLoading(false);
        // Trigger fade in animation
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id, user]);
  
  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
    rateMovie(id, newValue);
  };
  
  const handleFavoriteToggle = async () => {
    if (!user) return;
    await (isFavorite ? removeFromFavorites(id) : addToFavorites(id));
  };
  
  const handleWatchlistToggle = async () => {
    if (!user) return;
    await (isInWatchlist ? removeFromWatchlist(id) : addToWatchlist(id));
  };
  
  const handleTrailerOpen = () => {
    setOpenTrailer(true);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#1976d2', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Loading movie details...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#ff6b6b', mb: 2 }}>
            {error || 'Movie not found'}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.history.back()}
            sx={{ backgroundColor: '#1976d2' }}
          >
            Go Back
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: movie.backdrop_path 
        ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <Fade in={fadeIn} timeout={800}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Movie Poster */}
            <Grid item xs={12} md={4}>
              <Grow in={fadeIn} timeout={1000}>
                <Paper 
                  elevation={12}
                  sx={{ 
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#2a2a2a',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.3s ease'
                    }
                  }}
                >
                  <img
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/placeholder.jpg'
                    }
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                  
                  {/* Rating Badge */}
                  {movie.vote_average && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid #1976d2'
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {movie.vote_average.toFixed(1)}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grow>
            </Grid>

            {/* Movie Information */}
            <Grid item xs={12} md={8}>
              <Slide direction="up" in={fadeIn} timeout={1200}>
                <Box>
                  {/* Title and Basic Info */}
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                  >
                    {movie.title}
                  </Typography>

                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#ccc',
                      mb: 3,
                      fontStyle: 'italic'
                    }}
                  >
                    {movie.tagline}
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={handleTrailerOpen}
                      sx={{
                        backgroundColor: '#e50914',
                        '&:hover': { backgroundColor: '#b2070f' },
                        borderRadius: 2,
                        px: 3
                      }}
                    >
                      Watch Trailer
                    </Button>

                    {user && (
                      <>
                        <IconButton
                          onClick={handleFavoriteToggle}
                          sx={{
                            backgroundColor: isFavorite ? '#e91e63' : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: isFavorite ? '#c2185b' : 'rgba(255,255,255,0.2)'
                            },
                            width: 48,
                            height: 48
                          }}
                        >
                          {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>

                        <IconButton
                          onClick={handleWatchlistToggle}
                          sx={{
                            backgroundColor: isInWatchlist ? '#9c27b0' : 'rgba(255,255,255,0.1)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: isInWatchlist ? '#7b1fa2' : 'rgba(255,255,255,0.2)'
                            },
                            width: 48,
                            height: 48
                          }}
                        >
                          {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </>
                    )}
                  </Box>

                  {/* Movie Stats */}
                  <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ color: '#1976d2' }} />
                      <Typography sx={{ color: 'white' }}>
                        {formatDate(movie.release_date)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ color: '#1976d2' }} />
                      <Typography sx={{ color: 'white' }}>
                        {formatRuntime(movie.runtime)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp sx={{ color: '#1976d2' }} />
                      <Typography sx={{ color: 'white' }}>
                        {movie.popularity?.toFixed(1) || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Genres */}
                  <Box sx={{ mb: 3 }}>
                    {movie.genres && movie.genres.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre}
                        sx={{
                          backgroundColor: 'rgba(25, 118, 210, 0.2)',
                          color: '#1976d2',
                          border: '1px solid #1976d2',
                          mr: 1,
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.3)'
                          }
                        }}
                      />
                    ))}
                  </Box>

                  {/* Overview */}
                  <Paper 
                    elevation={8}
                    sx={{ 
                      p: 3, 
                      mb: 3,
                      backgroundColor: 'rgba(42, 42, 42, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                      Overview
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#fff' }}>
                      {movie.overview || 'No overview available.'}
                    </Typography>
                  </Paper>

                  {/* User Rating */}
                  {user && (
                    <Paper 
                      elevation={8}
                      sx={{ 
                        p: 3, 
                        mb: 3,
                        backgroundColor: 'rgba(42, 42, 42, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        Your Rating
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Rating
                          value={userRating}
                          onChange={handleRatingChange}
                          size="large"
                          max={10}
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#ffd700'
                            },
                            '& .MuiRating-iconHover': {
                              color: '#ffd700'
                            }
                          }}
                        />
                        <Typography variant="body1" sx={{ color: '#fff' }}>
                          {userRating}/10
                        </Typography>
                      </Box>
                    </Paper>
                  )}

                  {/* Cast & Crew */}
                  {movie.cast && movie.cast.length > 0 && (
                    <Paper 
                      elevation={8}
                      sx={{ 
                        p: 3,
                        backgroundColor: 'rgba(42, 42, 42, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        Cast
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {movie.cast.slice(0, 5).map((person, index) => (
                          <Card key={index} sx={{ 
                            minWidth: 120, 
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            border: '1px solid rgba(25, 118, 210, 0.3)'
                          }}>
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                              <Avatar 
                                src={person.profile_path ? `https://image.tmdb.org/t/p/w92${person.profile_path}` : undefined}
                                sx={{ width: 50, height: 50, mx: 'auto', mb: 1 }}
                              >
                                <Person />
                              </Avatar>
                              <Typography variant="body2" fontWeight="bold" sx={{ color: '#fff' }}>
                                {person.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#ccc' }}>
                                {person.character}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Slide>
            </Grid>
          </Grid>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                Similar Movies
              </Typography>
              <MovieList movies={similarMovies} />
            </Box>
          )}
        </Container>
      </Fade>

      {/* Trailer Dialog */}
      <Dialog
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setOpenTrailer(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.9)'
              }
            }}
          >
            <Close />
          </IconButton>
          {trailerUrl && (
            <iframe
              width="100%"
              height="400"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MovieDetails;