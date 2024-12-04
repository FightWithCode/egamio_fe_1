"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  authenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    setAuthenticated(!!token);
    setAccessToken(token);
    return !!token;
  };

  const login = (tokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('uid', tokens.id);
    localStorage.setItem('username', tokens.full_name);
    setAuthenticated(true);
    setAccessToken(tokens.access);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, accessToken, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
