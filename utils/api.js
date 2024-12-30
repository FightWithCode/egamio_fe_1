import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast'; // or your preferred toast library

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

// Instance for authenticated requests
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Instance for public requests
const publicApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Token management using secure cookies
const TokenManager = {
  setTokens: (access, refresh) => {
    // Set HTTP-only cookies with secure flag and expiry
    Cookies.set('accessToken', access, {
      secure: true,
      sameSite: 'strict',
      expires: 1 // 1 day
    });
    
    Cookies.set('refreshToken', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 7 // 7 days
    });
  },

  getAccessToken: () => Cookies.get('accessToken'),
  getRefreshToken: () => Cookies.get('refreshToken'),

  clearTokens: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }
};

// User data management (non-sensitive data can stay in localStorage)
const UserManager = {
  setUserData: (data) => {
    localStorage.setItem('uid', data.id);
    localStorage.setItem('username', data.full_name);
    localStorage.setItem('is_profile_complete', data.is_profile_complete);
  },

  clearUserData: () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    localStorage.removeItem('is_profile_complete');
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    if (!token) {
      return Promise.reject({
        response: {
          status: 401,
          data: { error: 'No authentication token found' }
        }
      });
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        handleLogout('Session expired. Please login again.');
        return Promise.reject({
          response: {
            status: 401,
            data: { error: 'No refresh token found' }
          }
        });
      }

      try {
        const refreshResponse = await publicApi.post('/accounts/refresh-token/', {
          refresh: refreshToken
        });

        const { access } = refreshResponse.data;
        TokenManager.setTokens(access, refreshToken);

        processQueue(null, access);
        
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        handleLogout('Session expired. Please login again.');
        return Promise.reject({
          response: {
            status: 401,
            data: { error: 'Session expired. Please login again.' }
          }
        });
      } finally {
        isRefreshing = false;
      }
    }

    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject({
        response: {
          status: 500,
          data: { error: 'Network error. Please check your connection.' }
        }
      });
    }

    return Promise.reject(error);
  }
);

async function handleLogout(message = 'You have been logged out.') {
  try {
    // Attempt to call logout endpoint
    await publicApi.post('/accounts/logout/', {
      refresh_token: TokenManager.getRefreshToken()
    }).catch(() => {
      // Silently fail if logout API fails
    });

    // Clear tokens and user data
    TokenManager.clearTokens();
    UserManager.clearUserData();

    // Show logout message
    toast.success(message);

    // Small delay to ensure toast is visible
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('An error occurred during logout.');
    
    // Fallback: force clear everything and redirect
    TokenManager.clearTokens();
    UserManager.clearUserData();
    window.location.href = '/login';
  }
}

// Development logging
if (process.env.NODE_ENV === 'development') {
  [api, publicApi].forEach(instance => {
    instance.interceptors.request.use(request => {
      console.log('Starting Request:', request);
      return request;
    });

    instance.interceptors.response.use(response => {
      console.log('Response:', response);
      return response;
    });
  });
}

// Export a function to set initial tokens (to be used in login)
export const setAuthTokens = (tokens) => {
  TokenManager.setTokens(tokens.access, tokens.refresh);
  UserManager.setUserData(tokens);
};

export { api, publicApi };
