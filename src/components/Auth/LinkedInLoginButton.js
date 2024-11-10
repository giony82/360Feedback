import React, { useRef } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@mui/material';
import linkedinLogo from 'react-linkedin-login-oauth2/assets/linkedin.png';

function LinkedInLoginButton() {
    const { login } = useAuth();
    const hasLoggedInRef = useRef(false);

    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
        redirectUri: `${window.location.origin}/linkedin`,
        scope: process.env.REACT_APP_LINKEDIN_SCOPE,
        onError: (error) => {
            console.error(error);
        },
        onSuccess: (code) => {
            if (!hasLoggedInRef.current) {
                hasLoggedInRef.current = true;                
                login('linkedin', code);
            }
        },
    });

    const handleClick = () => {
        linkedInLogin();
    };

    return (
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick={handleClick} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img 
            src={linkedinLogo} 
            alt="Sign in with LinkedIn" 
            style={{ maxWidth: '24px', marginRight: '8px' }} 
          />
          Sign in with LinkedIn
        </Button>
    );
}

export default LinkedInLoginButton;
