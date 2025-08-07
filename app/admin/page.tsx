'use client';

import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import BusinessManagement from '../../components/admin/BusinessManagement';
import BlogManagement from '../../components/admin/BlogManagement';
import SEOManagement from '../../components/admin/SEOManagement';
import Growth from '../../components/admin/Growth';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');


  const logout = async() => {
    const response = await axios.get('http://localhost:5001/api/v1/auth/logout', {withCredentials: true});
    if(response.status == 200){
      alert(`${response.data.message}`);
      window.location.href = '/';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'businesses':
        return <BusinessManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'seo':
        return <SEOManagement />;
      case 'growth':
        return <Growth />;
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">User Management</h3>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        );
      case 'reviews':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Management</h3>
            <p className="text-gray-600">Review moderation features coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h3>
            <p className="text-gray-600">Advanced analytics dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">System Settings</h3>
            <p className="text-gray-600">System configuration options coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={() =>{logout()}}
    >
      {renderContent()}
    </AdminLayout>
  );
}