import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import MovieList from '../components/movies/MovieList';

const Profile = () => {
  const { user, loading, updateProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmitProfile = async () => {
    await updateProfile(profileData);
    handleCloseEditDialog();
  };
  
  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  
  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {user.avatar ? (
              <Avatar 
                src={user.avatar} 
                alt={user.name} 
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {getInitials(user.name)}
              </Avatar>
            )}
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Member since {new Date(user.date).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleOpenEditDialog}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="profile tabs"
            centered
          >
            <Tab label="Favorites" />
            <Tab label="Watchlist" />
            <Tab label="Ratings" />
          </Tabs>
        </Box>
        
        {/* Favorites Tab */}
        <TabPanel value={tabValue} index={0}>
          {user.favorites && user.favorites.length > 0 ? (
            <MovieList movies={user.favorites} />
          ) : (
            <Typography align="center" sx={{ my: 4 }}>
              You haven't added any movies to your favorites yet.
            </Typography>
          )}
        </TabPanel>
        
        {/* Watchlist Tab */}
        <TabPanel value={tabValue} index={1}>
          {user.watchlist && user.watchlist.length > 0 ? (
            <MovieList movies={user.watchlist} />
          ) : (
            <Typography align="center" sx={{ my: 4 }}>
              Your watchlist is empty.
            </Typography>
          )}
        </TabPanel>
        
        {/* Ratings Tab */}
        <TabPanel value={tabValue} index={2}>
          {user.ratings && user.ratings.length > 0 ? (
            <Grid container spacing={2}>
              {user.ratings.map((ratedMovie) => (
                <Grid item xs={12} key={ratedMovie.movie}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {ratedMovie.movieDetails?.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${ratedMovie.movieDetails.poster_path}`}
                          alt={ratedMovie.movieDetails.title}
                          style={{ marginRight: 16, borderRadius: 4 }}
                        />
                      )}
                      <Box>
                        <Typography variant="h6">
                          {ratedMovie.movieDetails?.title || 'Movie'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ratedMovie.movieDetails?.release_date?.substring(0, 4) || ''}
                        </Typography>
                      </Box>
                    </Box>
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {ratedMovie.rating}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography align="center" sx={{ my: 4 }}>
              You haven't rated any movies yet.
            </Typography>
          )}
        </TabPanel>
      </Box>
      
      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={profileData.name}
            onChange={handleProfileChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={profileData.email}
            onChange={handleProfileChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="avatar"
            label="Avatar URL"
            type="text"
            fullWidth
            variant="outlined"
            value={profileData.avatar}
            onChange={handleProfileChange}
            helperText="Enter a URL for your profile picture"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSubmitProfile} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

export default Profile;