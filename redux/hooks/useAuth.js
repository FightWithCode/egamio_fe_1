import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  loginUser, 
  logoutUser, 
  checkAuthStatus as verifyToken, // Renamed checkAuthStatus to verifyToken for compatibility
  refreshToken as refreshTokenAction,
  updateProfileCompleteness,
  clearError
} from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  // Verify token on initial load
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  const login = async (email, password) => {
    const result = await dispatch(loginUser({ email, password }));
    return result.meta.requestStatus === 'fulfilled'
      ? { success: true, message: 'Login successful' }
      : { success: false, message: error || 'Login failed' };
  };

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      router.push('/');
    });
  };

  const checkAuthStatus = () => dispatch(verifyToken());

  const refreshToken = () => dispatch(refreshTokenAction());

  const updateProfile = (isComplete) => {
    dispatch(updateProfileCompleteness(isComplete));
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuthStatus,
    refreshToken,
    updateProfileCompleteness: updateProfile,
    clearError: clearAuthError,
  };
};