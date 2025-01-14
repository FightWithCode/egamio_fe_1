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
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const bypassEndpoints = ['/accounts/token/verify-token/'];
        const loginEndpoint = '/accounts/token/';
        if (bypassEndpoints.some((endpoint) => originalRequest.url.includes(endpoint))) {
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes(loginEndpoint)) {
            originalRequest._retry = true;
            try {
                await api.post('/accounts/token/refresh/');
                return api(originalRequest);
            } catch (refreshError) {
                toast.error('Session expired. Please log in again.');
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