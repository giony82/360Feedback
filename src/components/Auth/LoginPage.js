import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import LinkedInLoginButton from './LinkedInLoginButton';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

function LoginPage() {
  const { loading } = useAuth();
  
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'grey.100' 
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Sign in to your account
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <GoogleLoginButton />
          <LinkedInLoginButton />
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
