import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user and token from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      console.log('User and token loaded from storage');
    } else {
      console.log('No user or token found');
    }
  }, []);

  // Create an axios instance with the token
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Add token to all requests
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  const login = async (provider, credential) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (provider === 'google') {
        console.log('Attempting Google login with credential:', credential);
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, { token: credential });
      } else if (provider === 'linkedin') {
        // LinkedIn login logic (if implemented)
        console.log('Attempting LinkedIn login with code:', credential);
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/linkedin`, { code: credential });
      }
      
      console.log('Response from server:', response);
      
      if (response && response.data) {
        const { user: userData, token: authToken } = response.data;
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        console.log('Login successful, user data:', userData);
      } else {
        throw new Error('No response data from server');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
