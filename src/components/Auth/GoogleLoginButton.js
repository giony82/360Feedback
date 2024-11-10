import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    console.log('Google Sign-In successful. Response:', credentialResponse);
    try {
      await login('google', credentialResponse.credential);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleError = (error) => {
    console.error('Google Sign-In failed. Error:', error);
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      fullWidth 
      onClick={() => GoogleLogin({ onSuccess: handleSuccess, onError: handleError })}
    >
      Sign in with Google
    </Button>
  );
}

export default GoogleLoginButton;
