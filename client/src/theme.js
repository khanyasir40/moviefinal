import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // Netflix red
    },
    secondary: {
      main: '#f5c518', // IMDb yellow
    },
    background: {
      default: '#141414', // Netflix dark background
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#f40612',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f1f1f',
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(20, 20, 20, 0.7)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});