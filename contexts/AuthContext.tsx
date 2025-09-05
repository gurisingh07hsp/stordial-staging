'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: User | null;
  showAuthModal: boolean;
  login: (email: string, password: string) => void;
  signup: (userData: { name: string; email: string; phone: string; password: string }) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  message: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { data: session } = useSession();

  const googleRegister = async(session: any) => {
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/googlelogin`, {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }, {withCredentials: true});
        if(res.status === 200){
          setUser(res.data.user);
          // console.log(res.data.user);
        }
    }catch{
      console.log("Google Signin Error");
    }
  }

    useEffect(() => {
    if (session?.user) {
      googleRegister(session);
      console.log("session data : ", session);
    }
  }, [session]);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
          // If there is *no token*, it means first-time visitor — no redirect.
          if (message === 'Please login to access this resource') {
            // Check if user was already logged in before
            if (user) {
              // User existed → this is a logout or expired session
              setUser(null);
              router.push('/');
            } else {
              // First-time visitor → silently ignore
              setUser(null);
            }
          }
        } else {
          console.error('Profile fetch failed:', message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  getProfile();
}, []);


  const login = async(email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }

    const data = {
      email,
      password
    }
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, data, {withCredentials: true});
      if(response.data.success){
        setUser(response.data.user);
        setMessage('✅ Login successful!');
        setTimeout(()=>{
          router.push('/');
        },1500);
      }
    }catch(error){
      if (axios.isAxiosError(error)) {
    const err = error.response?.data?.message || 'Failed to login';
    setMessage(err);
  } else {
    setMessage('An unexpected error occurred');
  }
    }
  };

  const signup = async(userData: { name: string; email: string; phone: string; password: string }) => {
    // Simple validation
    if (!userData.name || !userData.email || !userData.password) {
      setMessage('Please fill in all required fields');
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

    try{
      if(response.data.success) {
        setUser(response.data.user);
        setMessage('✅ Account Created successful!');
        setTimeout(()=>{
          router.push('/');
        },1000);
      }
    }catch(error){
      setMessage(response.data.message || 'Failed to register user');
    }
  };

  const logout = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {withCredentials: true});
    if(response.status == 200){
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
    closeAuthModal,
    message,
    setUser
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