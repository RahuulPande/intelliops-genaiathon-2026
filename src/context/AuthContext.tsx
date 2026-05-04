'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type UserRole = 'demo';

export interface AuthUser {
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  login: (emailOrRole: string, password?: string) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  role: 'demo',
  isAdmin: false,
  user: { email: 'demo@intelliops.ai', role: 'demo', name: 'Demo User' },
  isLoading: false,
  login: async () => null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Always authenticated as demo user — open access
  const [isAuthenticated] = useState(true);
  const [role] = useState<UserRole>('demo');
  const [user] = useState<AuthUser>({ email: 'demo@intelliops.ai', role: 'demo', name: 'Demo User' });

  // Ensure localStorage is set for any components that check it
  useEffect(() => {
    localStorage.setItem('intelliops_authenticated', 'true');
    localStorage.setItem('intelliops_role', 'demo');
  }, []);

  const login = useCallback(async (): Promise<string | null> => null, []);
  const logout = useCallback(() => {
    if (typeof window !== 'undefined') window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, isAdmin: false, user, isLoading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
