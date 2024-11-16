import axios from 'axios';
import { store } from '@/store/store';

const api = axios.create({
  baseURL: 'https://egamio.pythonanywhere.com', // Replace with your DRF API
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to handle token expiry
api.interceptors.response.use(
    response => response, // If the response is successful, just return it
    async (error) => {
      // Check for expired token (401 Unauthorized error)
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token
        if (refreshToken) {
          try {
            // Attempt to refresh the token using the refresh token
            const refreshResponse = await axios.post('/accounts/refresh-token/', { refresh: refreshToken });
  
            // If the refresh is successful, update the access token
            const { access } = refreshResponse.data;
            
            // Store the new access token
            localStorage.setItem('accessToken', access);
            
            // Retry the original request with the new access token
            error.config.headers['Authorization'] = `Bearer ${access}`;
            return axios(error.config); // Retry the request with new token
          } catch (err) {
            // If refresh fails, clear tokens and log out the user
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            // Dispatch logout action to clear user state
            store.dispatch(logout());
  
            // Redirect the user to the login page (or show an error page)
            window.location.href = '/login';
            return Promise.reject(err);
          }
        } else {
          // If no refresh token is available, log out the user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          store.dispatch(logout());
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
      return Promise.reject(error); // If it's not a 401, reject the promise
    }
  );

export default api;
