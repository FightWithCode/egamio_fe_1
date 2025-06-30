import api from "./axiosSetup";

export const authAPI = {
    verifyToken: () => api.get('/accounts/profile/', {}),
    login: (credentials) => api.post('/accounts/token/', credentials),
    logout: () => api.post('/accounts/logout/'),
    refreshToken: () => api.post('/accounts/token/refresh/'),
};