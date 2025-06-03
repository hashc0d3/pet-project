import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, User, LoginCredentials } from '../types/auth';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateToken = useCallback(async (token: string) => {
    try {
      const response = await axios.post('/api/auth/validate', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.valid) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, []);

  useEffect(() => {
    // Проверяем токен при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, [validateToken]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      await validateToken(access_token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 