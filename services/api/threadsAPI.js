import api from './axiosSetup';

export const threadsAPI = {
    fetchThreadData: (threadId, slug) => api.get(`/eg-threads/threads/${threadId}/${slug}`),
};
