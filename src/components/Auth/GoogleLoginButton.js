import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    console.log('Google Sign-In successful. Response:', credentialResponse);
    try {
      // Send the entire credential to the backend
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
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        shape="pill"
        locale="en"
        text="signin_with"
        size="large"
      />
    </div>
  );
}

export default GoogleLoginButton;
