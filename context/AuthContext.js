"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { publicApi } from '@/utils/api';

const AuthContext = createContext({
  authenticated: false,
  accessToken: null,
  isProfileComplete: false,
  login: () => {},
  logout: () => {},
  checkAuth: () => {},
});

// Toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Token management
const TokenManager = {
  setTokens: (access, refresh) => {
    Cookies.set('accessToken', access, {
      secure: true,
      sameSite: 'strict',
      expires: 1
    });
    Cookies.set('refreshToken', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 7
    });
  },
  getAccessToken: () => Cookies.get('accessToken'),
  getRefreshToken: () => Cookies.get('refreshToken'),
  clearTokens: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
};

// User data management
const UserManager = {
  setUserData: (data) => {
    localStorage.setItem('uid', data.id);
    localStorage.setItem('username', data.full_name);
    localStorage.setItem('is_profile_complete', data.is_profile_complete);
  },
  getUserData: () => ({
    uid: localStorage.getItem('uid'),
    username: localStorage.getItem('username'),
    isProfileComplete: localStorage.getItem('is_profile_complete') === 'true'
  }),
  clearUserData: () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    localStorage.removeItem('is_profile_complete');
  }
};

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const checkAuth = () => {
    const token = TokenManager.getAccessToken();
    const userData = UserManager.getUserData();
    
    setAuthenticated(!!token);
    setAccessToken(token);
    setIsProfileComplete(userData.isProfileComplete);
    
    return !!token;
  };

  const login = (tokens) => {
    try {
      // Set tokens in cookies
      TokenManager.setTokens(tokens.access, tokens.refresh);
      
      // Set user data in localStorage
      UserManager.setUserData(tokens);
      
      // Update state
      setAuthenticated(true);
      setAccessToken(tokens.access);
      setIsProfileComplete(tokens.is_profile_complete);
      
      toast.success('Login successful!', toastConfig);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error during login process', toastConfig);
    }
  };

  const logout = async () => {
    try {
      // Attempt to call logout endpoint
      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        await publicApi.post('/accounts/logout/', {
          refresh_token: refreshToken
        }).catch(() => {
          // Silently fail if logout API fails
        });
      }

      // Clear tokens and user data
      TokenManager.clearTokens();
      UserManager.clearUserData();
      
      // Update state
      setAccessToken(null);
      setAuthenticated(false);
      setIsProfileComplete(false);
      
      toast.success('You have been logged out successfully', toastConfig);
      
      // Small delay to ensure toast is visible
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout', toastConfig);
      
      // Fallback: force clear everything and redirect
      TokenManager.clearTokens();
      UserManager.clearUserData();
      setAccessToken(null);
      setAuthenticated(false);
      setIsProfileComplete(false);
      window.location.href = '/login';
    }
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
