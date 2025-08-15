'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  FileText
} from 'lucide-react';

export default function Dashboard() {
  const [totalUser, setTotalUser] = useState('');
  const [totalBusinesses, setTotalBusinesses] = useState('');

  const stats = [
    {
      title: 'Total Users',
      value: totalUser,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Businesses',
      value: totalBusinesses,
      change: '+8%',
      changeType: 'positive',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      title: 'Total Reviews',
      value: '5,678',
      change: '+15%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$12,450',
      change: '+23%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  useEffect(()=>{
    const getData = async() => {
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/stats`, {withCredentials: true});
        const data = response.data.stats;
        setTotalUser(data.totalUsers);
        setTotalBusinesses(data.totalBusinesses);
      }catch(error){
        console.log(error);
      }
    }
    getData();
  },[])

  const recentActivities = [
    {
      type: 'business',
      message: 'New business "Café Central" was added',
      time: '2 hours ago',
      icon: Building2
    },
    {
      type: 'review',
      message: '5 new reviews were posted',
      time: '4 hours ago',
      icon: MessageSquare
    },
    {
      type: 'user',
      message: 'New user registration: john@example.com',
      time: '6 hours ago',
      icon: Users
    },
    {
      type: 'business',
      message: 'Business "Tech Solutions" updated their profile',
      time: '8 hours ago',
      icon: Building2
    }
  ];

  const topCategories = [
    { name: 'Restaurants', count: 234, percentage: 25 },
    { name: 'Healthcare', count: 189, percentage: 20 },
    { name: 'Retail', count: 156, percentage: 17 },
    { name: 'Services', count: 134, percentage: 14 },
    { name: 'Entertainment', count: 98, percentage: 10 }
  ];

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome to your admin dashboard. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{stat.value}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color} flex-shrink-0 ml-3`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
                <span className={`text-xs sm:text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 ml-2 hidden sm:inline">from last month</span>
                <span className="text-xs text-gray-500 ml-2 sm:hidden">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-800 line-clamp-2">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Top Categories</h3>
          <div className="space-y-3 sm:space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{category.name}</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm text-gray-600">{category.count}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">({category.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="truncate">Add Business</span>
          </button>
          <button className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="truncate">Create Post</span>
          </button>
          <button className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="truncate">Manage Users</span>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">System Status</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Server Status</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">Last Backup</span>
              <span className="text-xs sm:text-sm text-gray-800">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Today&apos;s Overview</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">New Users</span>
              <span className="text-xs sm:text-sm font-medium text-gray-800">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">New Businesses</span>
              <span className="text-xs sm:text-sm font-medium text-gray-800">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-600">New Reviews</span>
              <span className="text-xs sm:text-sm font-medium text-gray-800">45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 