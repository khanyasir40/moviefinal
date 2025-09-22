import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Chip
} from '@mui/material';
import { Movie, School, Person, Code, Lightbulb, MyLocation } from '@mui/icons-material';

const IntroPopup = ({ open, onClose }) => {
  const [showPopup, setShowPopup] = useState(open);

  useEffect(() => {
    // Show popup after 1 second delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    onClose();
  };

  return (
    <Dialog
      open={showPopup}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 8,
          background: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #333'
        }
      }}
    >
      <DialogContent sx={{ textAlign: 'center', py: 4, px: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto',
                background: '#333',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #666'
              }}
            >
              <Movie sx={{ fontSize: 40, color: '#fff' }} />
            </Box>
          </Box>
          
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              color: '#ffffff'
            }}
          >
            Movie Recommendation Website
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.8, 
              mb: 1,
              color: '#ff6b6b',
              fontWeight: 'bold'
            }}
          >
            Subject: Project Management
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.8, 
              mb: 3,
              color: '#cccccc'
            }}
          >
            A Netflix-like Movie Discovery Platform
          </Typography>
        </Box>

        {/* Student Information */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: '#2a2a2a',
            border: '1px solid #444'
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold' }}>
            Student Information
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <Person sx={{ mr: 2, color: '#888', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  Name: Yasir Khan
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <School sx={{ mr: 2, color: '#888', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  Roll No: 6071
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <School sx={{ mr: 2, color: '#888', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  College: Maharashtra College
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <School sx={{ mr: 2, color: '#888', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  Standard: TYCS
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#444' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Person sx={{ mr: 2, color: '#888', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  Submitted to: Dr. Saima Shaikh
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Project Details */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: '#2a2a2a',
            border: '1px solid #444'
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold' }}>
            Project Management - Movie Recommendation System
          </Typography>
          
          {/* Technologies Used */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <Code sx={{ mr: 2, color: '#888', fontSize: 24 }} />
              <Typography variant="h6" sx={{ color: '#ffffff' }}>
                Technologies & Languages Used
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              <Chip label="React.js" sx={{ bgcolor: '#61dafb', color: '#000' }} />
              <Chip label="Node.js" sx={{ bgcolor: '#68a063', color: '#fff' }} />
              <Chip label="Express.js" sx={{ bgcolor: '#000', color: '#fff' }} />
              <Chip label="MongoDB" sx={{ bgcolor: '#4db33d', color: '#fff' }} />
              <Chip label="Material-UI" sx={{ bgcolor: '#0081cb', color: '#fff' }} />
              <Chip label="JavaScript" sx={{ bgcolor: '#f7df1e', color: '#000' }} />
              <Chip label="HTML5" sx={{ bgcolor: '#e34f26', color: '#fff' }} />
              <Chip label="CSS3" sx={{ bgcolor: '#1572b6', color: '#fff' }} />
              <Chip label="Axios" sx={{ bgcolor: '#5a29e4', color: '#fff' }} />
              <Chip label="JWT" sx={{ bgcolor: '#d63aff', color: '#fff' }} />
            </Box>
          </Box>
          
          <Divider sx={{ my: 3, borderColor: '#444' }} />
          
          {/* Project Ideas & Aims */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Lightbulb sx={{ mr: 2, color: '#ffd700', fontSize: 24, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                    Project Ideas
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cccccc', textAlign: 'left' }}>
                    • Netflix-style movie discovery platform<br/>
                    • AI-powered movie recommendations<br/>
                    • User authentication & personalization<br/>
                    • Advanced search & filtering<br/>
                    • Favorites & watchlist management<br/>
                    • Movie ratings & reviews system
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <MyLocation sx={{ mr: 2, color: '#ff6b6b', fontSize: 24, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                    Project Aims
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cccccc', textAlign: 'left' }}>
                    • Create an intuitive movie browsing experience<br/>
                    • Implement modern web development practices<br/>
                    • Build a scalable full-stack application<br/>
                    • Integrate with external movie APIs<br/>
                    • Provide personalized user experience<br/>
                    • Demonstrate full-stack development skills
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Description */}
        <Typography 
          variant="body1" 
          sx={{ 
            opacity: 0.8, 
            mb: 4,
            color: '#cccccc',
            fontSize: '1rem',
            lineHeight: 1.6
          }}
        >
          This Project Management assignment demonstrates modern web development skills using React.js frontend and Node.js backend. 
          It features a comprehensive movie recommendation system with user authentication, personalized content, 
          and an intuitive interface for discovering and managing favorite movies. The project showcases full-stack development 
          capabilities, API integration, database management, and user experience design principles.
        </Typography>
      </DialogContent>

      {/* Action Button */}
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          size="large"
          sx={{
            background: '#333',
            color: '#fff',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: 4,
            border: '1px solid #555',
            '&:hover': {
              background: '#444',
              borderColor: '#666'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntroPopup; 