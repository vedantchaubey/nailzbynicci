// apps/frontend/src/stores/auth.store.ts
import { create } from 'zustand';
import { apiClient } from '../lib/api-client';
import { UserRole } from '@ticketpass/shared';

export interface UserState {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone: string | null;
  isPhoneVerified: boolean;
  avatarUrl: string | null;
  hasBankAccount: boolean;
  kycStatus?: string;
  sellerLevel?: string;
  reputationScore?: number;
}

interface AuthStore {
  user: UserState | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  fetchMe: () => Promise<void>;
  loginWithDevAccount: (email: string, role?: string) => Promise<void>;
  loginAs: (persona: 'buyer' | 'seller' | 'admin') => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('tp_access_token') : null,
  isLoading: false,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('tp_access_token') : false,

  setToken: (token: string) => {
    localStorage.setItem('tp_access_token', token);
    set({ token, isAuthenticated: true });
  },

  fetchMe: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<UserState>('/users/me');
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('tp_access_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  loginWithDevAccount: async (email: string, role?: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<{ accessToken: string; user: UserState }>('/auth/session', {
        devEmail: email,
        devRole: role,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('tp_access_token', accessToken);
      set({
        token: accessToken,
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('tp_access_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loginAs: async (persona: 'buyer' | 'seller' | 'admin') => {
    set({ isLoading: true });
    const personaMap = {
      buyer: { email: 'buyer.one@ticketpass.dev', role: 'USER' },
      seller: { email: 'seller.verified@ticketpass.dev', role: 'USER' },
      admin: { email: 'admin@ticketpass.dev', role: 'SUPER_ADMIN' },
    };

    const target = personaMap[persona];
    try {
      const response = await apiClient.post<{ accessToken: string; user: UserState }>('/auth/session', {
        devEmail: target.email,
        devRole: target.role,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('tp_access_token', accessToken);
      set({
        token: accessToken,
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));

export const useAuth = useAuthStore;
