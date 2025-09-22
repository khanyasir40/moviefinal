import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  Favorite,
  Bookmark,
  Star,
  Movie,
  CalendarToday,
  AccessTime,
  Psychology
} from '@mui/icons-material';

const MovieAnalytics = ({ favorites, watchlist }) => {
  const allMovies = [...favorites, ...watchlist];
  
  // Calculate statistics
  const totalMovies = allMovies.length;
  const totalFavorites = favorites.length;
  const totalWatchlist = watchlist.length;
  
  const averageRating = favorites.length > 0 
    ? (favorites.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / favorites.length).toFixed(1)
    : 0;
    
  const totalRuntime = allMovies.reduce((sum, movie) => sum + (movie.runtime || 0), 0);
  const averageRuntime = totalMovies > 0 ? Math.round(totalRuntime / totalMovies) : 0;
  
  // Get most common genres
  const genreCount = {};
  allMovies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });
  
  const topGenres = Object.entries(genreCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([genre, count]) => ({ genre, count }));
    
  // Get movies by decade
  const decadeCount = {};
  allMovies.forEach(movie => {
    if (movie.release_date) {
      const year = new Date(movie.release_date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      decadeCount[decade] = (decadeCount[decade] || 0) + 1;
    }
  });
  
  const topDecades = Object.entries(decadeCount)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .slice(0, 3)
    .map(([decade, count]) => ({ decade: `${decade}s`, count }));

  // Get highest rated movies
  const topRatedMovies = [...favorites]
    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 3);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
        Your Movie Analytics
      </Typography>
      
      {/* Key Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Movie color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="primary">
              {totalMovies}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Movies
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Favorite color="error" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="error">
              {totalFavorites}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Favorites
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Bookmark color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="secondary">
              {totalWatchlist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Watchlist
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={6} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Star color="warning" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" color="warning.main">
              {averageRating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Rating
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Top Genres */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Favorite Genres
              </Typography>
              <Box sx={{ mt: 2 }}>
                {topGenres.map(({ genre, count }, index) => (
                  <Box key={genre} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{genre}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {count} movies
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(count / totalMovies) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Decades */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
                Favorite Decades
              </Typography>
              <Box sx={{ mt: 2 }}>
                {topDecades.map(({ decade, count }) => (
                  <Chip
                    key={decade}
                    label={`${decade} (${count})`}
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Average Runtime
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, fontSize: '1rem' }} />
                  <Typography variant="h6">
                    {Math.floor(averageRuntime / 60)}h {averageRuntime % 60}m
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Rated Movies */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                Highest Rated Movies
              </Typography>
              <List>
                {topRatedMovies.map((movie, index) => (
                  <React.Fragment key={movie.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : undefined}
                          alt={movie.title}
                        >
                          {movie.title.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={movie.title}
                        secondary={`${movie.release_date?.substring(0, 4) || 'Unknown'} • ${movie.genres?.slice(0, 2).join(', ') || 'No genres'}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star sx={{ color: 'warning.main', mr: 0.5 }} />
                        <Typography variant="h6" color="warning.main">
                          {movie.vote_average?.toFixed(1) || 'N/A'}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < topRatedMovies.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieAnalytics; 