import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Info } from '@mui/icons-material';

const Footer = ({ onShowIntro }) => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              MovieFlix
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your ultimate movie recommendation platform.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/search?category=popular" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Popular Movies
            </Link>
            <Link component={RouterLink} to="/search?category=top_rated" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Top Rated
            </Link>
            <Link component={RouterLink} to="/about" color="text.secondary" display="block" sx={{ mb: 1 }}>
              About
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' MovieFlix. All rights reserved.'}
          </Typography>
          <Tooltip title="About MovieFlix">
            <IconButton 
              component={RouterLink}
              to="/about"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <Info />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;