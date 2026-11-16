// apps/frontend/src/components/providers/auth-provider.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/auth.store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe]);

  return <>{children}</>;
}

export { useAuth } from '../../stores/auth.store';
