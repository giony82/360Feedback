import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContextType } from '../types/authTypes';

// Update the createContext to use the defined type
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user and token from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      console.log('User and token loaded from storage');
    } else {
      setUser(null);
      setToken(null);
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

  const login = async (provider: any, credential: any) => {    
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (provider) {
        case 'google':
          console.log('Attempting Google login with credential:', credential);
          response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/google`, { token: credential });
          break;
        case 'linkedin':
          console.log('Attempting LinkedIn login with code:', credential);
          response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/linkedin`, { code: credential });
          break;
        default:          
          throw new Error('Unsupported provider');
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
      throw new Error(String(error));            
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
}

export const useAuth = () => useContext(AuthContext);
