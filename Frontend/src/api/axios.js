import axios from 'axios';

// When running with Vite dev proxy or in production, relative '/' proxies to Gateway (8084)
const api = axios.create({
  baseURL: '', // Uses current origin which proxies /auth, /Users, /hotels, /ratings to http://localhost:8084
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Auto-attach JWT Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we got a 401 on a protected call (not during login or register)
      const url = error.config?.url || '';
      if (!url.includes('/auth/login') && !url.includes('/auth/register')) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_info');
        // Dispatch custom event for app-level state sync
        window.dispatchEvent(new Event('auth-logout'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
