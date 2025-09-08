'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import BusinessManagement from '../../components/admin/BusinessManagement';
import BlogManagement from '../../components/admin/BlogManagement';
import SEOManagement from '../../components/admin/SEOManagement';
import Growth from '../../components/admin/Growth';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(false);

  const {user} = useAuth();

  const fetchisAdmin = async() => {
    try{

      const resoponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/admin/isadmin/`, {withCredentials: true});
      if(resoponse.status == 200)
      {
        setIsAdmin(true);
      }
      else{
        window.location.href = '/';
      }
    }catch(error){
      console.log(error);
      window.location.href = '/';
    }
  }

  useEffect(()=>{
    fetchisAdmin();
  },[user]);


  const logout = async() => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {withCredentials: true});
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
    <>
    { isAdmin ? 
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={() =>{logout()}}
    >
      {renderContent()}
    </AdminLayout> : (
      <div className='h-[92vh] w-[99vw] flex justify-center items-center'>
        <p className='text-2xl font-bold'>Loading...</p>
      </div>)}
    </>
  );
}