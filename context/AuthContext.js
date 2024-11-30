"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  authenticated: false,
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    setAuthenticated(!!token);
    return !!token;
  };

  const login = (tokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('uid', tokens.id);
    localStorage.setItem('username', tokens.full_name);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
