// apps/frontend/src/lib/api.ts
import axios from 'axios';
import { apiClient } from './api-client';

export const api = apiClient;

export const ordersApi = {
  getById: async (id: string) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },
  create: async (payload: { listingId: string; buyerAppPhone: string }) => {
    const { data } = await api.post('/orders', payload);
    return data;
  },
};

export default api;
