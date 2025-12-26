import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);