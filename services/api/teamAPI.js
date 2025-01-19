import api from './axiosSetup';

export const teamAPI = {
    applyToTeam: (data) => api.post('/finder/recruitment-applications/', data),
};
