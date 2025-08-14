'use client';

import React, { useState } from 'react';
import ListBusinessPage from '../../components/ListBusinessPage';
import { User, Business } from '../../types';

export default function ListBusinessPageComponent() {
  const [user, setUser] = useState<User | null>(null);

  const handleBack = () => {
    window.history.back();
  };

  const handleMenuToggle = () => {
    // Handle mobile menu toggle
  };

  const handleAuthClick = () => {
    // Handle auth click
  };

  const handleListBusinessClick = () => {
    // Handle list business click
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleNavigate = (page: string) => {
    window.location.href = `/${page}`;
  };

  const handleBusinessClick = (business: Business) => {
    window.location.href = `/business/${business._id}`;
  };

  return (
    <ListBusinessPage
      onBack={handleBack}
      allBusinesses={[]}
      onBusinessClick={handleBusinessClick}
      onMenuToggle={handleMenuToggle}
      onAuthClick={handleAuthClick}
      onListBusinessClick={handleListBusinessClick}
      user={user}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    />
  );
}