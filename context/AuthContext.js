"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  authenticated: false,
  accessToken: null,
  isProfileComplete: false,
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    const profileComplete = localStorage.getItem('is_profile_complete') === 'true';
    setAuthenticated(!!token);
    setAccessToken(token);
    setIsProfileComplete(profileComplete);
    return !!token;
  };

  const login = (tokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('uid', tokens.id);
    localStorage.setItem('username', tokens.full_name);
    localStorage.setItem('is_profile_complete', tokens.is_profile_complete);
    setAuthenticated(true);
    setAccessToken(tokens.access);
    setIsProfileComplete(tokens.is_profile_complete);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setAuthenticated(false);
    setIsProfileComplete(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      authenticated, 
      accessToken, 
      isProfileComplete,
      login, 
      logout, 
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
