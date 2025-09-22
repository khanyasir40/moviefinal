import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating as MuiRating,
  Snackbar
} from '@mui/material';
import {
  School,
  Person,
  Assignment,
  Favorite,
  Bookmark,
  Star,
  Delete,
  Edit,
  Visibility,
  TrendingUp,
  Movie,
  CalendarToday,
  AccessTime,
  Refresh,
  Sort,
  FilterList
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import MovieService from '../services/movieService';
import EnhancedMovieCard from '../components/movies/EnhancedMovieCard';
import MovieAnalytics from '../components/MovieAnalytics';

const About = () => {
  const { user, isAuthenticated, removeFromFavorites, removeFromWatchlist, rateMovie } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [sortBy, setSortBy] = useState('title');
  const [filterGenre, setFilterGenre] = useState('');
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Student and Project Details
  const studentInfo = {
    name: "Yasir Khan",
    rollNo: "6071",
    std: "BSC-CS",
    semester: "5th Semester",
    department: "Computer Science",
    university: "Maharashtra college ",
    submittedTo: "Dr. Saima Shaikh",
    subject: "Project Management",
    projectName: "MovieFlix - Movie Recommendation System",
    projectDescription: "A comprehensive movie recommendation platform built with React.js, Node.js, and MongoDB. Features include user authentication, movie browsing, personalized recommendations, favorites, and watchlist management.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Material-UI", "TMDB API"],
    features: [
      "User Authentication & Authorization",
      "Movie Browsing & Search",
      "Personalized Recommendations",
      "Favorites & Watchlist Management",
      "Movie Ratings & Reviews",
      "Responsive Design"
    ]
  };

  // Fetch movie details using MovieService
  const fetchMovieDetails = async (movieId) => {
    try {
      return await MovieService.getMovieById(movieId);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  // Load user's collections with full movie details
  const loadUserCollections = async () => {
    if (!isAuthenticated || !user) return;

    setLoading(true);
    try {
      const favoritesWithDetails = [];
      const watchlistWithDetails = [];

      // Fetch favorites details
      if (user.favorites && user.favorites.length > 0) {
        for (const movieId of user.favorites) {
          const details = await fetchMovieDetails(movieId);
          if (details) {
            favoritesWithDetails.push(details);
          }
        }
      }

      // Fetch watchlist details
      if (user.watchlist && user.watchlist.length > 0) {
        for (const movieId of user.watchlist) {
          const details = await fetchMovieDetails(movieId);
          if (details) {
            watchlistWithDetails.push(details);
          }
        }
      }

      setFavorites(favoritesWithDetails);
      setWatchlist(watchlistWithDetails);
    } catch (error) {
      console.error('Error loading collections:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load your collections. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Sort movies by different criteria
  const sortMovies = (movies, sortBy) => {
    return [...movies].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (b.vote_average || 0) - (a.vote_average || 0);
        case 'date':
          return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return 0;
      }
    });
  };

  // Filter movies by genre
  const filterMovies = (movies, genre) => {
    if (!genre) return movies;
    return movies.filter(movie => 
      movie.genres && movie.genres.some(g => 
        g.toLowerCase().includes(genre.toLowerCase())
      )
    );
  };

  // Handle movie removal
  const handleRemoveMovie = async (movieId, collectionType) => {
    try {
      if (collectionType === 'favorites') {
        await removeFromFavorites(movieId);
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
      } else {
        await removeFromWatchlist(movieId);
        setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
      }
      setSnackbar({
        open: true,
        message: `Movie removed from ${collectionType}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to remove movie',
        severity: 'error'
      });
    }
  };

  // Handle rating dialog
  const handleRatingOpen = (movie) => {
    setSelectedMovie(movie);
    setRating(0);
    setOpenRatingDialog(true);
  };

  const handleRatingSubmit = async () => {
    if (!selectedMovie || rating === 0) return;

    try {
      await rateMovie(selectedMovie.id, rating);
      setSnackbar({
        open: true,
        message: 'Rating submitted successfully!',
        severity: 'success'
      });
      setOpenRatingDialog(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit rating',
        severity: 'error'
      });
    }
  };

  // Load collections on component mount and when user changes
  useEffect(() => {
    loadUserCollections();
  }, [isAuthenticated, user]);

  // TabPanel component for tab content
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`about-tabpanel-${index}`}
        aria-labelledby={`about-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  // Statistics Component
  const StatisticsCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{ p: 2, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        {icon}
      </Box>
      <Typography variant="h4" color={`${color}.main`} gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Student Information Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                <Person sx={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                {studentInfo.name}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {studentInfo.std} - {studentInfo.semester}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              <School sx={{ mr: 1, verticalAlign: 'middle' }} />
              Student Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Roll No:</strong> {studentInfo.rollNo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Department:</strong> {studentInfo.department}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>University:</strong> {studentInfo.university}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Submitted To:</strong> {studentInfo.submittedTo}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Subject:</strong> {studentInfo.subject}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Project Information Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
          Project Details
        </Typography>
        
        <Typography variant="h4" color="primary" gutterBottom>
          {studentInfo.projectName}
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {studentInfo.projectDescription}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Technologies Used:
        </Typography>
        <Box sx={{ mb: 3 }}>
          {studentInfo.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              color="primary"
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Key Features:
        </Typography>
        <Grid container spacing={1}>
          {studentInfo.features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ fontSize: '1rem', mr: 1, color: 'primary.main' }} />
                {feature}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Favorites and Watchlist Section (Only for authenticated users) */}
      {isAuthenticated && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              <Favorite sx={{ mr: 1, verticalAlign: 'middle' }} />
              My Collections
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh Collections">
                <IconButton onClick={loadUserCollections} disabled={loading}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Statistics */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <StatisticsCard
                title="Total Favorites"
                value={favorites.length}
                icon={<Favorite color="primary" />}
                color="primary"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatisticsCard
                title="Watchlist Items"
                value={watchlist.length}
                icon={<Bookmark color="secondary" />}
                color="secondary"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatisticsCard
                title="Total Movies"
                value={favorites.length + watchlist.length}
                icon={<Movie color="success" />}
                color="success"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatisticsCard
                title="Average Rating"
                value={favorites.length > 0 ? 
                  (favorites.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / favorites.length).toFixed(1) : '0.0'
                }
                icon={<Star color="warning" />}
                color="warning"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)} 
                aria-label="collections tabs"
                centered
              >
                <Tab 
                  label={
                    <Badge badgeContent={favorites.length} color="primary">
                      <Favorite />
                    </Badge>
                  }
                  iconPosition="start"
                />
                <Tab 
                  label={
                    <Badge badgeContent={watchlist.length} color="secondary">
                      <Bookmark />
                    </Badge>
                  }
                  iconPosition="start"
                />
                <Tab 
                  label="Analytics"
                  icon={<TrendingUp />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            
            {/* Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Sort />
                <TextField
                  select
                  size="small"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ minWidth: 120 }}
                >
                  <option value="title">Title</option>
                  <option value="rating">Rating</option>
                  <option value="date">Release Date</option>
                  <option value="popularity">Popularity</option>
                </TextField>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FilterList />
                <TextField
                  size="small"
                  placeholder="Filter by genre..."
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  sx={{ minWidth: 150 }}
                />
              </Box>
            </Box>
            
            {loading && <LinearProgress sx={{ mb: 2 }} />}
            
            {/* Favorites Tab */}
            <TabPanel value={tabValue} index={0}>
              {favorites.length > 0 ? (
                <Grid container spacing={3}>
                  {filterMovies(sortMovies(favorites, sortBy), filterGenre).map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <EnhancedMovieCard 
                        movie={movie} 
                        collectionType="favorites"
                        onRemove={(movieId) => handleRemoveMovie(movieId, 'favorites')}
                        onRate={(movieId, rating) => rateMovie(movieId, rating)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Favorite sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Favorites Yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start adding movies to your favorites to see them here.
                  </Typography>
                </Box>
              )}
            </TabPanel>
            
            {/* Watchlist Tab */}
            <TabPanel value={tabValue} index={1}>
              {watchlist.length > 0 ? (
                <Grid container spacing={3}>
                  {filterMovies(sortMovies(watchlist, sortBy), filterGenre).map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                      <EnhancedMovieCard 
                        movie={movie} 
                        collectionType="watchlist"
                        onRemove={(movieId) => handleRemoveMovie(movieId, 'watchlist')}
                        onRate={(movieId, rating) => rateMovie(movieId, rating)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Bookmark sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Watchlist is Empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add movies to your watchlist to keep track of what you want to watch.
                  </Typography>
                </Box>
              )}
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel value={tabValue} index={2}>
              {favorites.length > 0 || watchlist.length > 0 ? (
                <MovieAnalytics favorites={favorites} watchlist={watchlist} />
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <TrendingUp sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Data for Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add movies to your collections to see detailed analytics and insights.
                  </Typography>
                </Box>
              )}
            </TabPanel>
          </Box>
        </Paper>
      )}

      {/* Message for non-authenticated users */}
      {!isAuthenticated && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>Login Required:</strong> To view your favorites and watchlist, please log in to your account.
            </Typography>
          </Alert>
        </Paper>
      )}

      {/* Rating Dialog */}
      <Dialog open={openRatingDialog} onClose={() => setOpenRatingDialog(false)}>
        <DialogTitle>Rate Movie</DialogTitle>
        <DialogContent>
          {selectedMovie && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedMovie.title}
              </Typography>
              <MuiRating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
                max={10}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {rating}/10
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRatingDialog(false)}>Cancel</Button>
          <Button onClick={handleRatingSubmit} variant="contained" disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default About; 