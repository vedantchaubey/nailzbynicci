// apps/frontend/src/lib/api-client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getDeviceFingerprint } from './fingerprint';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor: attach bearer token and device fingerprint
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('tp_access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const fingerprint = getDeviceFingerprint();
      if (fingerprint) {
        config.headers['X-Device-Fingerprint'] = fingerprint;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: normalize API errors into standard format
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string; code?: string; details?: unknown }>) => {
    let message = 'An unexpected network error occurred.';
    let code = 'NETWORK_ERROR';
    let statusCode = 500;
    let details: unknown = null;

    if (error.response) {
      statusCode = error.response.status;
      const data = error.response.data;

      if (typeof data === 'string') {
        message = data;
      } else if (data && typeof data === 'object') {
        message = Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message || error.message;
        code = data.code || data.error || 'API_ERROR';
        details = data.details || null;
      }
    } else if (error.request) {
      message = 'Unable to connect to TicketPass server. Please check your internet connection.';
    }

    return Promise.reject({
      statusCode,
      code,
      message,
      details,
    });
  },
);
