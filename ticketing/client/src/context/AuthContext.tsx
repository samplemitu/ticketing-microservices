import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import client from '../lib/build-client'; // ✔️ new: axios instance for backend

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>; // ✔️ new function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const { data } = await client.get('/api/users/currentuser', {
        withCredentials: true,
      });
      setUser(data.currentUser || null);
    } catch {
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await client.post(
        '/api/users/signin',
        { email, password },
        { withCredentials: true }
      );
      await refreshUser();
    } catch (err) {
      console.log('LOGIN ERROR:', err?.response?.data);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await client.post('/api/users/signup', {
        email,
        password,
      });
      await refreshUser();
    } catch (err) {
      console.log('SIGNUP ERROR:', err?.response?.data);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await client.post('/api/users/signout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
