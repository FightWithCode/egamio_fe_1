import axios from 'axios';
import { toast } from 'react-toastify';

// Create a custom axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add any request modifications here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Only handle 401 errors and avoid infinite retry loops
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh tokens
                const response = await axios.post(
                    `${API_URL}/api/token/refresh/`,
                    {},
                    { withCredentials: true } // Cookies will be sent automatically
                );

                // The backend will set new cookies automatically
                return api(originalRequest);
            } catch (refreshError) {
                // Redirect to login if refresh fails
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action.');
        }
        if (error.response?.status === 404) {
            toast.error('Page/Resource not found.');
        }
        if (error.response?.status === 500) {
            toast.error('Internal server error. Please try again later.');
        }
        if (error.response?.status === 400) {
            toast.error(error.response.data?.msg || "Bad request. Try with other input");
        }
        return Promise.reject(error);
    }
);

export default api;