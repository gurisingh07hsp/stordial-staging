'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Activity,
  FileText,
  FileDown,
  RefreshCw,
  Search,
  Building2
} from 'lucide-react';

interface CallData {
  id: string;
  businessId: string;
  businessName: string;
  timestamp: string;
  duration: number;
  callerLocation: string;
  source: 'direct' | 'referral' | 'organic' | 'social';
  phoneNumber: string;
  status: 'completed' | 'missed' | 'voicemail';
}

interface WhatsAppData {
  id: string;
  businessId: string;
  businessName: string;
  timestamp: string;
  userId: string;
  inquiryType: 'general' | 'pricing' | 'support' | 'booking' | 'partnership';
  message: string;
  responseTime: number;
  status: 'new' | 'replied' | 'resolved';
}

interface DirectionClickData {
  id: string;
  businessId: string;
  businessName: string;
  timestamp: string;
  userLocation: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  coordinates: { lat: number; lng: number };
}

interface Business {
  id: string;
  name: string;
  category: string;
  city: string;
  phone: string;
}

export default function Growth() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedMetric, setSelectedMetric] = useState<'calls' | 'whatsapp' | 'directions'>('calls');
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock businesses data
  const businesses: Business[] = [
    { id: 'biz_1', name: 'Café Central', category: 'Restaurants', city: 'New York', phone: '+1 (555) 123-4567' },
    { id: 'biz_2', name: 'Tech Solutions Inc', category: 'Services', city: 'Los Angeles', phone: '+1 (555) 987-6543' },
    { id: 'biz_3', name: 'Green Gardens', category: 'Services', city: 'Chicago', phone: '+1 (555) 456-7890' },
    { id: 'biz_4', name: 'Fashion Forward', category: 'Retail', city: 'Miami', phone: '+1 (555) 321-6540' },
    { id: 'biz_5', name: 'Health First Clinic', category: 'Healthcare', city: 'Boston', phone: '+1 (555) 789-0123' },
  ];

  // Mock data for calls
  const callsData: CallData[] = [
    {
      id: '1',
      businessId: 'biz_1',
      businessName: 'Café Central',
      timestamp: '2024-01-15T10:30:00Z',
      duration: 245,
      callerLocation: 'New York, NY',
      source: 'direct',
      phoneNumber: '+1 (555) 123-4567',
      status: 'completed'
    },
    {
      id: '2',
      businessId: 'biz_1',
      businessName: 'Café Central',
      timestamp: '2024-01-15T14:15:00Z',
      duration: 180,
      callerLocation: 'Brooklyn, NY',
      source: 'referral',
      phoneNumber: '+1 (555) 987-6543',
      status: 'completed'
    },
    {
      id: '3',
      businessId: 'biz_2',
      businessName: 'Tech Solutions Inc',
      timestamp: '2024-01-15T16:45:00Z',
      duration: 320,
      callerLocation: 'Los Angeles, CA',
      source: 'organic',
      phoneNumber: '+1 (555) 456-7890',
      status: 'completed'
    },
    {
      id: '4',
      businessId: 'biz_3',
      businessName: 'Green Gardens',
      timestamp: '2024-01-15T09:20:00Z',
      duration: 0,
      callerLocation: 'Chicago, IL',
      source: 'social',
      phoneNumber: '+1 (555) 789-0123',
      status: 'missed'
    }
  ];

  // Mock data for WhatsApp messages
  const whatsappData: WhatsAppData[] = [
    {
      id: '1',
      businessId: 'biz_1',
      businessName: 'Café Central',
      timestamp: '2024-01-15T09:15:00Z',
      userId: 'user_123',
      inquiryType: 'pricing',
      message: 'Hi, I would like to know about your catering prices.',
      responseTime: 5,
      status: 'resolved'
    },
    {
      id: '2',
      businessId: 'biz_2',
      businessName: 'Tech Solutions Inc',
      timestamp: '2024-01-15T11:30:00Z',
      userId: 'user_456',
      inquiryType: 'support',
      message: 'I need help with your IT consulting services.',
      responseTime: 12,
      status: 'replied'
    },
    {
      id: '3',
      businessId: 'biz_3',
      businessName: 'Green Gardens',
      timestamp: '2024-01-15T15:20:00Z',
      userId: 'user_789',
      inquiryType: 'booking',
      message: 'Can I schedule a landscaping consultation?',
      responseTime: 8,
      status: 'new'
    }
  ];

  // Mock data for direction clicks
  const directionClicksData: DirectionClickData[] = [
    {
      id: '1',
      businessId: 'biz_1',
      businessName: 'Café Central',
      timestamp: '2024-01-15T10:45:00Z',
      userLocation: 'New York, NY',
      deviceType: 'mobile',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      businessId: 'biz_1',
      businessName: 'Café Central',
      timestamp: '2024-01-15T12:20:00Z',
      userLocation: 'Queens, NY',
      deviceType: 'desktop',
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: '3',
      businessId: 'biz_2',
      businessName: 'Tech Solutions Inc',
      timestamp: '2024-01-15T14:10:00Z',
      userLocation: 'Los Angeles, CA',
      deviceType: 'tablet',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: '4',
      businessId: 'biz_3',
      businessName: 'Green Gardens',
      timestamp: '2024-01-15T16:30:00Z',
      userLocation: 'Chicago, IL',
      deviceType: 'mobile',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    }
  ];

  // Filter data based on selected business
  const filteredCalls = selectedBusiness === 'all' 
    ? callsData 
    : callsData.filter(call => call.businessId === selectedBusiness);

  const filteredWhatsApp = selectedBusiness === 'all' 
    ? whatsappData 
    : whatsappData.filter(msg => msg.businessId === selectedBusiness);

  const filteredDirectionClicks = selectedBusiness === 'all' 
    ? directionClicksData 
    : directionClicksData.filter(click => click.businessId === selectedBusiness);

  // Filter businesses based on search query
  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate metrics for selected business
  const totalCalls = filteredCalls.length;
  const totalWhatsApp = filteredWhatsApp.length;
  const totalDirectionClicks = filteredDirectionClicks.length;
  const avgCallDuration = filteredCalls.reduce((sum, call) => sum + call.duration, 0) / totalCalls || 0;
  const avgResponseTime = filteredWhatsApp.reduce((sum, msg) => sum + msg.responseTime, 0) / totalWhatsApp || 0;

  // Device type distribution
  const deviceDistribution = filteredDirectionClicks.reduce((acc, click) => {
    acc[click.deviceType] = (acc[click.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Source distribution for calls
  const callSourceDistribution = filteredCalls.reduce((acc, call) => {
    acc[call.source] = (acc[call.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const exportData = (format: 'csv' | 'pdf') => {
    const businessName = selectedBusiness === 'all' ? 'All Businesses' : 
      businesses.find(b => b.id === selectedBusiness)?.name || 'Unknown';
    alert(`Exporting ${businessName} ${selectedMetric} data in ${format.toUpperCase()} format...`);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSelectedBusinessName = () => {
    if (selectedBusiness === 'all') return 'All Businesses';
    return businesses.find(b => b.id === selectedBusiness)?.name || 'Unknown Business';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Business Growth Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600">Track individual business performance and user interactions</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => exportData('csv')}
            className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <FileDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button
            onClick={() => exportData('pdf')}
            className="flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Business Selection */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Business</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name, category, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Business</label>
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Businesses</option>
              {filteredBusinesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name} - {business.category} ({business.city})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Selected Business Info */}
        {selectedBusiness !== 'all' && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-blue-800">{getSelectedBusinessName()}</h3>
                <p className="text-sm text-blue-600">
                  {businesses.find(b => b.id === selectedBusiness)?.category} • {businesses.find(b => b.id === selectedBusiness)?.city}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metric Type</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as 'calls' | 'whatsapp' | 'directions')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="calls">Call Tracking</option>
              <option value="whatsapp">WhatsApp Messages</option>
              <option value="directions">Direction Clicks</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold text-gray-800">{totalCalls}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Avg Duration: {formatDuration(avgCallDuration)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">WhatsApp Messages</p>
              <p className="text-2xl font-bold text-gray-800">{totalWhatsApp}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Avg Response: {avgResponseTime}min</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Direction Clicks</p>
              <p className="text-2xl font-bold text-gray-800">{totalDirectionClicks}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Most Active: Mobile</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Interactions</p>
              <p className="text-2xl font-bold text-gray-800">{totalCalls + totalWhatsApp + totalDirectionClicks}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">This week</p>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Call Source Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Call Sources</h3>
          <div className="space-y-3">
            {Object.entries(callSourceDistribution).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{source}</span>
                </div>
                <span className="text-sm text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Types</h3>
          <div className="space-y-3">
            {Object.entries(deviceDistribution).map(([device, count]) => (
              <div key={device} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{device}</span>
                </div>
                <span className="text-sm text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Data Tables */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            {getSelectedBusinessName()} - {selectedMetric === 'calls' && 'Call Tracking'}
            {selectedMetric === 'whatsapp' && 'WhatsApp Messages'}
            {selectedMetric === 'directions' && 'Direction Clicks'}
          </h3>
        </div>

        <div className="overflow-x-auto">
          {selectedMetric === 'calls' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(call.timestamp)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatDuration(call.duration)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {call.callerLocation}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {call.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        call.status === 'completed' ? 'bg-green-100 text-green-800' :
                        call.status === 'missed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedMetric === 'whatsapp' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWhatsApp.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(msg.timestamp)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {msg.inquiryType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {msg.responseTime} min
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        msg.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        msg.status === 'replied' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedMetric === 'directions' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDirectionClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(click.timestamp)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {click.businessName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {click.userLocation}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                        {click.deviceType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 