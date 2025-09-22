import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { useAuth } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Intro Popup Component
import IntroPopup from './components/IntroPopup';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Private Route Component
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  const { loadUser } = useAuth();
  const [showIntro, setShowIntro] = useState(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleCloseIntro = () => {
    setShowIntro(false);
    // Mark that user has seen the intro
    localStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navbar onShowIntro={() => setShowIntro(true)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer onShowIntro={() => setShowIntro(true)} />
        
        {/* Intro Popup */}
        <IntroPopup open={showIntro} onClose={handleCloseIntro} />
      </div>
    </ThemeProvider>
  );
}

export default App;