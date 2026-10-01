import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  token: string | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('cravo_admin_token'));
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('cravo_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('cravo_admin_token', token);
    } else {
      localStorage.removeItem('cravo_admin_token');
      localStorage.removeItem('cravo_admin_user');
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.adminLogin({ username, password });
      setToken(res.token);
      setAdmin(res.admin);
      localStorage.setItem('cravo_admin_user', JSON.stringify(res.admin));
    } catch (err: any) {
      // In development mode only, if server is completely offline
      if (import.meta.env.DEV && (username === 'admin' || username === 'admin@cravo.com') && password === 'admin123') {
        const mockAdmin: AdminUser = { id: 1, username: 'admin', email: 'admin@cravo.com' };
        const mockToken = 'mock_jwt_token_cravo_admin_access';
        setToken(mockToken);
        setAdmin(mockAdmin);
        localStorage.setItem('cravo_admin_user', JSON.stringify(mockAdmin));
        return;
      }
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cravo_admin_token');
    localStorage.removeItem('cravo_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
