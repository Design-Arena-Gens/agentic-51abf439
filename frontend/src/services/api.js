import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('annapurnai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  signup: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  getProfile: () => api.get('/users/me'),
  updateProfile: (payload) => api.put('/users/profile', payload),
};

export const dashboardApi = {
  getStats: () => api.get('/stats'),
  addStat: (payload) => api.post('/stats', payload),
};

export const recommendationApi = {
  getFoods: (params) => api.get('/foods', { params }),
};

export const remedyApi = {
  getAll: () => api.get('/remedies'),
  getToday: () => api.get('/remedies/today'),
};

export const chatApi = {
  ask: (message) => api.post('/chat', { message }),
};

export default api;
