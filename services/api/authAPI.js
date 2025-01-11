import api from "./axiosSetup";

export const authAPI = {
    verifyToken: () => api.post('/accounts/token/verify-token/'),
    login: (credentials) => api.post('/accounts/token/', credentials),
    logout: () => api.post('/accounts/logout/'),
    refreshToken: () => api.post('/accounts/token/refresh/'),
};