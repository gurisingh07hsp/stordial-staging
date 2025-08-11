'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

export default function ClientHeader() {
  const { user, openAuthModal, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleAuthClick = () => {
    openAuthModal();
  };

  const handleLogout = () => {
    logout();
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <Header 
        user={null}
        onMenuToggle={handleMenuToggle}
        showMobileMenu={showMobileMenu}
        onAuthClick={handleAuthClick}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Header 
      user={user}
      onMenuToggle={handleMenuToggle}
      showMobileMenu={showMobileMenu}
      onAuthClick={handleAuthClick}
      onLogout={handleLogout}
    />
  );
} 