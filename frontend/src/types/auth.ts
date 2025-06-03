export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  picture?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  validateToken: (token: string) => Promise<void>;
} 