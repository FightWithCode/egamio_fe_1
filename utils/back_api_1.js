// utils/api.js
import axios from 'axios';

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
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post('/accounts/token/refresh/');
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Session expired. Please log in again.');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// Auth related API calls


// User related API calls
export const userAPI = {
    getProfile: () => api.get('/accounts/profile/'),
    updateProfile: (data) => api.patch('/accounts/profile/', data),
    changePassword: (data) => api.post('/accounts/change-password/', data),
};

// Game related API calls (example)
export const gameAPI = {
    getGames: () => api.get('/games/'),
    getGameDetails: (id) => api.get(`/games/${id}/`),
    createGame: (data) => api.post('/games/', data),
    updateGame: (id, data) => api.patch(`/games/${id}/`, data),
    deleteGame: (id) => api.delete(`/games/${id}/`),
};

// Tournament related API calls (example)
export const tournamentAPI = {
    getTournaments: () => api.get('/tournaments/'),
    getTournamentDetails: (id) => api.get(`/tournaments/${id}/`),
    createTournament: (data) => api.post('/tournaments/', data),
    joinTournament: (id) => api.post(`/tournaments/${id}/join/`),
};

// utils/api.js
// Add this to your existing api.js file

export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
            case 400:
                return {
                    type: 'VALIDATION_ERROR',
                    message: data.message || 'Invalid input',
                    errors: data.errors
                };
            case 401:
                return {
                    type: 'AUTH_ERROR',
                    message: 'Authentication required'
                };
            case 403:
                return {
                    type: 'PERMISSION_ERROR',
                    message: 'Permission denied'
                };
            case 404:
                return {
                    type: 'NOT_FOUND',
                    message: 'Resource not found'
                };
            case 500:
                return {
                    type: 'SERVER_ERROR',
                    message: 'Internal server error'
                };
            default:
                return {
                    type: 'UNKNOWN_ERROR',
                    message: 'An unexpected error occurred'
                };
        }
    } else if (error.request) {
        // Request was made but no response received
        return {
            type: 'NETWORK_ERROR',
            message: 'Network error occurred'
        };
    } else {
        // Something happened in setting up the request
        return {
            type: 'REQUEST_ERROR',
            message: error.message
        };
    }
};


export default api;
