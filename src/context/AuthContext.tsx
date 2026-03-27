'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AUTH_STORAGE_KEY, ROLE_STORAGE_KEY, type UserRole } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const authStatus = localStorage.getItem(AUTH_STORAGE_KEY);
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;

    if (authStatus === 'true' && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
    setIsReady(true);
  }, []);

  // Redirect unauthenticated users (except on /login)
  useEffect(() => {
    if (!isReady) return;
    if (pathname === '/login') return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isReady, isAuthenticated, pathname, router]);

  const login = useCallback((userRole: UserRole) => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(ROLE_STORAGE_KEY, userRole);
    setIsAuthenticated(true);
    setRole(userRole);
    router.replace('/');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    setIsAuthenticated(false);
    setRole(null);
    router.replace('/login');
  }, [router]);

  // Show loading spinner while checking auth
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  // Allow /login page through without auth
  if (pathname === '/login') {
    return (
      <AuthContext.Provider value={{ isAuthenticated, role, isAdmin: role === 'admin', login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  // Block rendering if not authenticated (redirect is happening)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, isAdmin: role === 'admin', login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
