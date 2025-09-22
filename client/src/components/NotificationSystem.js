import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const NotificationSystem = ({ notification, onClose }) => {
  if (!notification) return null;

  const { open, message, severity, title, autoHideDuration = 6000 } = notification;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSystem; 