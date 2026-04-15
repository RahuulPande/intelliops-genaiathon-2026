'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AUTH_STORAGE_KEY = 'intelliops_authenticated';
const ROLE_STORAGE_KEY = 'intelliops_role';

type UserRole = 'demo';

// Minimal AuthUser type for demo mode
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
  isAuthenticated: false,
  role: null,
  isAdmin: false,
  user: null,
  isLoading: true,
  login: async () => null,
  logout: () => {},
});

// Demo credentials
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'IntelliOps@2026';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load auth state on mount from localStorage
  useEffect(() => {
    const legacyAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const legacyRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (legacyAuth === 'true' && legacyRole === 'demo') {
      setIsAuthenticated(true);
      setRole('demo');
      setUser({ email: 'demo@intelliops.ai', role: 'demo', name: 'Demo User' });
    }
    setIsReady(true);
  }, []);

  // Redirect unauthenticated users (except public routes)
  useEffect(() => {
    if (!isReady) return;
    if (pathname === '/login' || pathname === '/' || pathname === '/showcase') return;
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isReady, isAuthenticated, pathname, router]);

  const login = useCallback(async (emailOrRole: string, password?: string): Promise<string | null> => {
    // Validate demo credentials
    if (password) {
      if (emailOrRole === DEMO_USERNAME && password === DEMO_PASSWORD) {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(ROLE_STORAGE_KEY, 'demo');
        setIsAuthenticated(true);
        setRole('demo');
        setUser({ email: 'demo@intelliops.ai', role: 'demo', name: 'Demo User' });
        router.replace('/showcase');
        return null; // success
      }
      return 'Invalid credentials. Use admin / IntelliOps@2026';
    }

    // Legacy role-based login
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(ROLE_STORAGE_KEY, 'demo');
    setIsAuthenticated(true);
    setRole('demo');
    router.replace('/showcase');
    return null;
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
    router.replace('/');
  }, [router]);

  // Show loading spinner while checking auth
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  // Allow public routes through without auth
  if (pathname === '/login' || pathname === '/' || pathname === '/showcase') {
    return (
      <AuthContext.Provider value={{ isAuthenticated, role, isAdmin: false, user, isLoading: !isReady, login, logout }}>
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
    <AuthContext.Provider value={{ isAuthenticated, role, isAdmin: false, user, isLoading: !isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
