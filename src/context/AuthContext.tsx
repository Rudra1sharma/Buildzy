'use client'

import { createContext, useState, useEffect, ReactNode, use, useContext } from 'react';
import { User } from '@/types/interfaces';

//defining the Auth context Type S-1
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

//creating Auth Context S-2
export const AuthContext = createContext<AuthContextType | null>(null);


//Authprovider
export const AuthProvider = ({ children }: { children: any }) => {//! Potential Error
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) 
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
