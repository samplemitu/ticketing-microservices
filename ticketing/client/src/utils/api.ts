import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const user = Cookies.get('user');
  if (user) {
    try {
      const parsed = JSON.parse(user);
      config.headers.Authorization = `Bearer ${parsed.id}`;
    } catch {
      // Invalid user cookie
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('user');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  signin: (email: string, password: string) =>
    api.post('/api/users/signin', { email, password }),
  signup: (email: string, password: string) =>
    api.post('/api/users/signup', { email, password }),
  currentUser: () => api.get('/api/users/currentuser'),
  signout: () => api.post('/api/users/signout'),
};

export const ticketsAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) => api.get('/api/tickets', { params }),
  getById: (id: string) => api.get(`/api/tickets/${id}`),
  create: (data: {
    title: string;
    price: number;
    date: string;
    description?: string;
  }) => api.post('/api/tickets', data),
  update: (
    id: string,
    data: Partial<{
      title: string;
      price: number;
      date: string;
      description?: string;
    }>
  ) => api.put(`/api/tickets/${id}`, data),
  delete: (id: string) => api.delete(`/api/tickets/${id}`),
};

export const ordersAPI = {
  getAll: () => api.get('/api/orders'),
  getById: (id: string) => api.get(`/api/orders/${id}`),
  create: (ticketId: string) => api.post('/api/orders', { ticketId }),
  cancel: (id: string) => api.delete(`/api/orders/${id}`),
};

export const paymentsAPI = {
  create: (orderId: string, token: string) =>
    api.post('/api/payments', { orderId, token }),
};
