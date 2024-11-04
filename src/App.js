import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import Home from './pages/Home';
import NavMenu from './components/NavMenu'; // Import the new NavMenu component
import ProfileComponent from './components/ProfileComponent';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import Footer from './components/Layout/Footer'; // {{ edit_1 }}

function App() {
  return (
    <GoogleOAuthProvider 
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onScriptLoadError={(error) => console.error('Error loading Google Sign-In script:', error)}
      onScriptLoadSuccess={() => console.log('Google Sign-In script loaded successfully')}
    >
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

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
            <ProfileComponent />
          </ProtectedRoute>
        } />        
        <Route path="/linkedin" element={<LinkedInCallback />} />
      </Routes>
      <Footer /> 
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default App;
