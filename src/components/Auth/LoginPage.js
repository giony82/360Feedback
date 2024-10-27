import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import LinkedInLoginButton from './LinkedInLoginButton';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const { loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h2>
        
        <div className="space-y-4">
          <GoogleLoginButton />
          <LinkedInLoginButton />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
