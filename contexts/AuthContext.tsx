'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

  const router = useRouter();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(()=>{
    const getProfile = async ()=>{
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,{withCredentials: true});
        console.log("Profile response: ", response.data);
  
        if(response.data.success)
        {
          setUser(response.data.user);
        }
      }catch(error){
      if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Failed to login';
    // alert(message);
      setUser(null);
        router.push('/');
  } else {
    alert('An unexpected error occurred');
  }
    }

    }
    getProfile();
  },[]);


  const login = async(email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const data = {
      email,
      password
    }
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, data, {withCredentials: true});
    console.log("Login response : ", response.data);
      if(response.data.success){
    setUser(response.data.user);
    alert('Successfully signed in!');
    setShowAuthModal(false);
      }
    }catch(error){
      if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Failed to login';
    alert(message);
  } else {
    alert('An unexpected error occurred');
  }
    }
  };

  const signup = async(userData: { name: string; email: string; phone: string; password: string }) => {
    // Simple validation
    if (!userData.name || !userData.email || !userData.password) {
      alert('Please fill in all required fields');
      return;
    }

    const newUser = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+1 555-123-4567',
      password: userData.password,
      businessOwner: false
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, newUser,{withCredentials: true});
    console.log('User registered: ', response.data);

    try{
      if(response.data.success) {
        setUser(response.data.user);
        alert('Account created successfully!');
        setShowAuthModal(false);
      }
    }catch(error){
      alert(response.data.message || 'Failed to register user');
    }
  };

  const logout = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {withCredentials: true});
    if(response.status == 200){
      alert(`${response.data.message}`);
      setUser(null);
      router.push('/');
    }
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