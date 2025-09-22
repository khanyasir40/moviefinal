import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import { createApiUrl, API_CONFIG } from '../config/api';

// Create context
const AuthContext = createContext();

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

// Reducer function
const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: null
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // Load user
  const loadUser = useCallback(async () => {
    if (localStorage.token) {
      console.log('AuthContext: Setting auth token:', localStorage.token);
      setAuthToken(localStorage.token);
    }

    try {
      console.log('AuthContext: Loading user from', createApiUrl(API_CONFIG.ENDPOINTS.AUTH));
      const res = await axios.get(createApiUrl(API_CONFIG.ENDPOINTS.AUTH), {
        timeout: 10000 // 10 second timeout
      });
      console.log('AuthContext: User loaded:', res.data);
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      console.error('AuthContext: Load user error:', err);
      // Don't show error for initial load if no token
      if (localStorage.token) {
        dispatch({ type: 'AUTH_ERROR', payload: err.response?.data?.msg || 'Authentication error' });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: null });
      }
    }
  }, []);

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(createApiUrl(API_CONFIG.ENDPOINTS.REGISTER), formData, config);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      const errorMsg = err.response?.data?.errors
        ? err.response.data.errors.map(error => error.msg).join(', ')
        : err.response?.data?.msg || 'Registration failed';
      
      dispatch({ type: 'REGISTER_FAIL', payload: errorMsg });
    }
  };

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log('AuthContext: Attempting login to', createApiUrl(API_CONFIG.ENDPOINTS.AUTH));
      console.log('AuthContext: Request data:', formData);
      console.log('AuthContext: Axios config:', config);
      
      const res = await axios.post(createApiUrl(API_CONFIG.ENDPOINTS.AUTH), formData, config);
      console.log('AuthContext: Login response:', res.data);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      
      // Set the token in axios headers immediately
      if (res.data.token) {
        setAuthToken(res.data.token);
      }
      
      // Load user data after successful login
      await loadUser();
      
      return res.data;
    } catch (err) {
      console.error('AuthContext: Login error:', err);
      console.error('AuthContext: Error response:', err.response);
      
      const errorMsg = err.response?.data?.errors
        ? err.response.data.errors.map(error => error.msg).join(', ')
        : err.response?.data?.msg || 'Login failed';
      
      console.error('AuthContext: Error message:', errorMsg);
      dispatch({ type: 'LOGIN_FAIL', payload: errorMsg });
      throw new Error(errorMsg);
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Add movie to favorites
  const addToFavorites = async (movieId) => {
    try {
      const res = await axios.put(createApiUrl(`${API_CONFIG.ENDPOINTS.FAVORITES}/${movieId}`));
      dispatch({
        type: 'UPDATE_USER',
        payload: { favorites: res.data }
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Remove movie from favorites
  const removeFromFavorites = async (movieId) => {
    try {
      const res = await axios.delete(createApiUrl(`${API_CONFIG.ENDPOINTS.FAVORITES}/${movieId}`));
      dispatch({
        type: 'UPDATE_USER',
        payload: { favorites: res.data }
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Add movie to watchlist
  const addToWatchlist = async (movieId) => {
    try {
      const res = await axios.put(createApiUrl(`${API_CONFIG.ENDPOINTS.WATCHLIST}/${movieId}`));
      dispatch({
        type: 'UPDATE_USER',
        payload: { watchlist: res.data }
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = async (movieId) => {
    try {
      const res = await axios.delete(createApiUrl(`${API_CONFIG.ENDPOINTS.WATCHLIST}/${movieId}`));
      dispatch({
        type: 'UPDATE_USER',
        payload: { watchlist: res.data }
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Rate a movie
  const rateMovie = async (movieId, rating) => {
    try {
      const res = await axios.post(createApiUrl(`${API_CONFIG.ENDPOINTS.RATINGS}/${movieId}`), { rating });
      dispatch({
        type: 'UPDATE_USER',
        payload: { ratings: res.data }
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  React.useEffect(() => {
    // Load user on component mount
    loadUser();
  }, [loadUser]);

  React.useEffect(() => {
    // Debug: log auth state on every change
    console.log('AuthContext: State changed:', state);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearError,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist,
        rateMovie
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};