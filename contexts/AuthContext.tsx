'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  showAuthModal: boolean;
  login: (email: string, password: string) => void;
  signup: (userData: { name: string; email: string; phone: string; password: string }) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const login = (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    const newUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '+1 555-123-4567',
      businessOwner: false
    };
    setUser(newUser);
    setShowAuthModal(false);
    alert('Successfully signed in!');
  };

  const signup = (userData: { name: string; email: string; phone: string; password: string }) => {
    // Simple validation
    if (!userData.name || !userData.email || !userData.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newUser: User = {
      id: '1',
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+1 555-123-4567',
      businessOwner: false
    };
    setUser(newUser);
    setShowAuthModal(false);
    alert('Account created successfully!');
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  // Prevent hydration mismatch by ensuring consistent initial state
  const contextValue = {
    user: isMounted ? user : null,
    showAuthModal: isMounted ? showAuthModal : false,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 