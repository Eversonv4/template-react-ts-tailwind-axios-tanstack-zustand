import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para injetar o token do Zustand
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage'); // Ou pegar direto da store se necessário
  if (token) {
    const { state } = JSON.parse(token);
    config.headers.Authorization = `Bearer ${state.token}`;
  }
  return config;
});