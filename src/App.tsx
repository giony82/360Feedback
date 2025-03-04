import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import Home from './pages/Home';
import NavMenu from './components/AppBar/NavMenu';
import Profile from './components/Profile';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

import { ErrorProvider } from './context/ErrorContext';
import Footer from './components/Layout/Footer'; 

import Companies from './components/Company/Companies'; 
import ErrorBanner from './components/ErrorBanner';
import Projects from './components/Project/Projects';
import Teams from './components/Team/Teams';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        onScriptLoadError={() => console.error('Error loading Google Sign-In script')}
        onScriptLoadSuccess={() => console.log('Google Sign-In script loaded successfully')}
      >
        <ErrorProvider>
          <ErrorBanner />
          <AuthProvider>
            <Router>
              <AppContent />
            </Router>
          </AuthProvider>      
        </ErrorProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user } = useAuth() || {};

  return (
    <div className="App">
      {user && <NavMenu />}      
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />
        <Route path="/companies" element={
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        } />
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
      <Footer />       
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }): JSX.Element {
  const auth = useAuth(); // Get the auth context
  const user = auth ? auth.user : null; // Check for null before accessing user
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default App;
