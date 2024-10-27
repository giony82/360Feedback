import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import Home from './pages/Home';
import NavMenu from './components/NavMenu'; // Import the new NavMenu component
import ProfileComponent from './components/ProfileComponent';

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
      {user && <NavMenu />} {/* Only show NavMenu when user is logged in */}
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
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default App;
