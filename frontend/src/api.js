import axios from 'axios';
import Swal from 'sweetalert2';

// Dev: Vite proxies /api to the backend. Prod: same origin, or set VITE_API_URL.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  try {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch { /* ignore corrupt storage */ }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem('userInfo')) {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    if (!err.response) {
      Swal.fire({ title: 'Network error', text: 'Cannot reach the server. Please try again.', icon: 'error' });
    }
    return Promise.reject(err);
  }
);

export default api;
