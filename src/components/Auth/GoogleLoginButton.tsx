import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse } from '../../types';

function GoogleLoginButton() {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google Sign-In successful. Response:', credentialResponse);
    try {
      await login('google', credentialResponse.credential);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleError = (error: unknown) => {
    console.error('Google Sign-In failed. Error:', error);
  };

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => handleSuccess({ credential: credentialResponse.credential ?? '' })}
        onError={() => handleError("Cannot login")}
      />      
    </>
  );
}

export default GoogleLoginButton;
