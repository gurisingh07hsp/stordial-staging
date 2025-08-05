'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  BarChart3, 
  FileText, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Save,
  RefreshCw,
  X
} from 'lucide-react';

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  googleAnalyticsId: string;
  googleSearchConsole: string;
  metaTags: {
    title: string;
    description: string;
    keywords: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

interface ValidationErrors {
  siteTitle?: string;
  siteDescription?: string;
  keywords?: string;
  googleAnalyticsId?: string;
  googleSearchConsole?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export default function SEOManagement() {
  const [activeTab, setActiveTab] = useState('settings');
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
          siteTitle: 'Stordial - Find Local Businesses',
    siteDescription: 'Discover and connect with the best local businesses in your area. Find restaurants, services, healthcare, and more.',
    keywords: 'local businesses, restaurants, services, healthcare, retail, entertainment',
    googleAnalyticsId: 'GA-123456789',
    googleSearchConsole: 'https://search.google.com/search-console',
    metaTags: {
      title: 'Stordial - Find Local Businesses',
      description: 'Discover and connect with the best local businesses in your area.',
      keywords: 'local businesses, restaurants, services, healthcare'
    },
    socialMedia: {
      facebook: 'https://facebook.com/stordial',
      twitter: 'https://twitter.com/stordial',
      instagram: 'https://instagram.com/stordial'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Validate SEO settings
  const validateSettings = (): boolean => {
    const errors: ValidationErrors = {};

    // Site Title validation
    if (!seoSettings.siteTitle.trim()) {
      errors.siteTitle = 'Site title is required';
    } else if (seoSettings.siteTitle.length > 60) {
      errors.siteTitle = 'Site title should be 60 characters or less';
    }

    // Site Description validation
    if (!seoSettings.siteDescription.trim()) {
      errors.siteDescription = 'Site description is required';
    } else if (seoSettings.siteDescription.length > 160) {
      errors.siteDescription = 'Site description should be 160 characters or less';
    }

    // Keywords validation
    if (!seoSettings.keywords.trim()) {
      errors.keywords = 'Keywords are required';
    }

    // Google Analytics ID validation
    if (seoSettings.googleAnalyticsId && !seoSettings.googleAnalyticsId.match(/^G-[A-Z0-9]{10}$|^GA-[0-9]{1,10}$|^UA-[0-9]+-[0-9]+$/)) {
      errors.googleAnalyticsId = 'Invalid Google Analytics ID format';
    }

    // URL validation for social media
    const urlRegex = /^https?:\/\/.+/;
    
    if (seoSettings.socialMedia.facebook && !urlRegex.test(seoSettings.socialMedia.facebook)) {
      errors.facebook = 'Please enter a valid URL';
    }
    
    if (seoSettings.socialMedia.twitter && !urlRegex.test(seoSettings.socialMedia.twitter)) {
      errors.twitter = 'Please enter a valid URL';
    }
    
    if (seoSettings.socialMedia.instagram && !urlRegex.test(seoSettings.socialMedia.instagram)) {
      errors.instagram = 'Please enter a valid URL';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      setSaveStatus('error');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for persistence
      localStorage.setItem('seoSettings', JSON.stringify(seoSettings));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Load saved settings on component mount
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('seoSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSeoSettings(parsed);
              } catch (err) {
        console.error('Error loading saved SEO settings:', err);
      }
      }
    }
  }, []);

  const handleGenerateSitemap = () => {
    alert('Sitemap generation started. You will be notified when complete.');
  };

  const handleOptimizeImages = () => {
    alert('Image optimization process started.');
  };

  const clearValidationError = (field: keyof ValidationErrors) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const seoMetrics = [
    {
      title: 'Page Speed',
      value: '2.3s',
      status: 'good',
      change: '+0.2s',
      icon: TrendingUp
    },
    {
      title: 'Mobile Score',
      value: '95/100',
      status: 'excellent',
      change: '+5',
      icon: TrendingUp
    },
    {
      title: 'SEO Score',
      value: '88/100',
      status: 'good',
      change: '+3',
      icon: TrendingUp
    },
    {
      title: 'Indexed Pages',
      value: '1,234',
      status: 'good',
      change: '+12',
      icon: TrendingUp
    }
  ];

  const seoIssues = [
    {
      type: 'warning',
      title: 'Missing Meta Descriptions',
      description: '5 pages are missing meta descriptions',
      count: 5
    },
    {
      type: 'error',
      title: 'Slow Loading Images',
      description: '12 images need optimization',
      count: 12
    },
    {
      type: 'warning',
      title: 'Missing Alt Tags',
      description: '8 images missing alt attributes',
      count: 8
    },
    {
      type: 'info',
      title: 'Duplicate Content',
      description: '2 pages have similar content',
      count: 2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">SEO Management</h1>
        <p className="text-gray-600">Optimize your website for search engines and improve visibility</p>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">SEO settings saved successfully!</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">Error saving settings. Please check the form and try again.</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'sitemap', label: 'Sitemap', icon: FileText },
              { id: 'issues', label: 'Issues', icon: AlertCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic SEO Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic SEO Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={seoSettings.siteTitle}
                        onChange={(e) => {
                          setSeoSettings({...seoSettings, siteTitle: e.target.value});
                          if (validationErrors.siteTitle) clearValidationError('siteTitle');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.siteTitle ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your site title"
                      />
                      {validationErrors.siteTitle && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.siteTitle && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.siteTitle}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {seoSettings.siteTitle.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={seoSettings.siteDescription}
                        onChange={(e) => {
                          setSeoSettings({...seoSettings, siteDescription: e.target.value});
                          if (validationErrors.siteDescription) clearValidationError('siteDescription');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.siteDescription ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your site description"
                      />
                      {validationErrors.siteDescription && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.siteDescription && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.siteDescription}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {seoSettings.siteDescription.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={seoSettings.keywords}
                        onChange={(e) => {
                          setSeoSettings({...seoSettings, keywords: e.target.value});
                          if (validationErrors.keywords) clearValidationError('keywords');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.keywords ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                      {validationErrors.keywords && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.keywords && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.keywords}</p>
                    )}
                  </div>
                </div>

                {/* Analytics & Tracking */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Analytics & Tracking</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={seoSettings.googleAnalyticsId}
                        onChange={(e) => {
                          setSeoSettings({...seoSettings, googleAnalyticsId: e.target.value});
                          if (validationErrors.googleAnalyticsId) clearValidationError('googleAnalyticsId');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.googleAnalyticsId ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="GA-XXXXXXXXX or G-XXXXXXXXXX"
                      />
                      {validationErrors.googleAnalyticsId && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.googleAnalyticsId && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.googleAnalyticsId}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Format: GA-XXXXXXXXX or G-XXXXXXXXXX</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Search Console</label>
                    <input
                      type="url"
                      value={seoSettings.googleSearchConsole}
                      onChange={(e) => setSeoSettings({...seoSettings, googleSearchConsole: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://search.google.com/search-console"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={seoSettings.socialMedia.facebook}
                        onChange={(e) => {
                          setSeoSettings({
                            ...seoSettings, 
                            socialMedia: {...seoSettings.socialMedia, facebook: e.target.value}
                          });
                          if (validationErrors.facebook) clearValidationError('facebook');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.facebook ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://facebook.com/yourpage"
                      />
                      {validationErrors.facebook && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.facebook && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.facebook}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={seoSettings.socialMedia.twitter}
                        onChange={(e) => {
                          setSeoSettings({
                            ...seoSettings, 
                            socialMedia: {...seoSettings.socialMedia, twitter: e.target.value}
                          });
                          if (validationErrors.twitter) clearValidationError('twitter');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.twitter ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://twitter.com/yourhandle"
                      />
                      {validationErrors.twitter && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.twitter && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.twitter}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={seoSettings.socialMedia.instagram}
                        onChange={(e) => {
                          setSeoSettings({
                            ...seoSettings, 
                            socialMedia: {...seoSettings.socialMedia, instagram: e.target.value}
                          });
                          if (validationErrors.instagram) clearValidationError('instagram');
                        }}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.instagram ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="https://instagram.com/yourprofile"
                      />
                      {validationErrors.instagram && (
                        <div className="absolute right-3 top-2.5">
                          <X className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {validationErrors.instagram && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.instagram}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* SEO Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {seoMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.title} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                          </div>
                          <div className={`p-2 rounded-lg ${
                            metric.status === 'excellent' ? 'bg-green-100' :
                            metric.status === 'good' ? 'bg-blue-100' :
                            'bg-yellow-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              metric.status === 'excellent' ? 'text-green-600' :
                              metric.status === 'good' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className={`text-sm font-medium ${
                            metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Search Console Data */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Google Search Console</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">12,456</p>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">89,234</p>
                    <p className="text-sm text-gray-600">Total Impressions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">14.2%</p>
                    <p className="text-sm text-gray-600">Average CTR</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sitemap Tab */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">XML Sitemap</h3>
                  <p className="text-gray-600">Manage your XML sitemap for better search engine indexing</p>
                </div>
                <button
                  onClick={handleGenerateSitemap}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Sitemap
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Sitemap Status</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Generated</span>
                    <span className="text-sm text-gray-800">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total URLs</span>
                    <span className="text-sm text-gray-800">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sitemap URL</span>
                    <span className="text-sm text-blue-600">https://stordial.com/sitemap.xml</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-800">Sitemap URLs</h4>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {[
                      'https://stordial.com/',
                      'https://stordial.com/businesses',
                      'https://stordial.com/categories',
                      'https://stordial.com/about',
                      'https://stordial.com/contact'
                    ].map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-800">{url}</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">SEO Issues</h3>
                  <p className="text-gray-600">Fix issues to improve your search engine rankings</p>
                </div>
                <button
                  onClick={handleOptimizeImages}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Fix All Issues
                </button>
              </div>

              <div className="space-y-4">
                {seoIssues.map((issue, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg mr-4 ${
                        issue.type === 'error' ? 'bg-red-100' :
                        issue.type === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <AlertCircle className={`w-5 h-5 ${
                          issue.type === 'error' ? 'text-red-600' :
                          issue.type === 'warning' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{issue.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        <div className="flex items-center mt-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {issue.count} items
                          </span>
                          <button className="ml-3 text-sm text-blue-600 hover:text-blue-800">
                            Fix Issue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* SEO Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {seoMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.title} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                          </div>
                          <div className={`p-2 rounded-lg ${
                            metric.status === 'excellent' ? 'bg-green-100' :
                            metric.status === 'good' ? 'bg-blue-100' :
                            'bg-yellow-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              metric.status === 'excellent' ? 'text-green-600' :
                              metric.status === 'good' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className={`text-sm font-medium ${
                            metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Search Console Data */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Google Search Console</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">12,456</p>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">89,234</p>
                    <p className="text-sm text-gray-600">Total Impressions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">14.2%</p>
                    <p className="text-sm text-gray-600">Average CTR</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sitemap Tab */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">XML Sitemap</h3>
                  <p className="text-gray-600">Manage your XML sitemap for better search engine indexing</p>
                </div>
                <button
                  onClick={handleGenerateSitemap}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Sitemap
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Sitemap Status</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Generated</span>
                    <span className="text-sm text-gray-800">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total URLs</span>
                    <span className="text-sm text-gray-800">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sitemap URL</span>
                    <span className="text-sm text-blue-600">https://stordial.com/sitemap.xml</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-800">Sitemap URLs</h4>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {[
                      'https://stordial.com/',
                      'https://stordial.com/businesses',
                      'https://stordial.com/categories',
                      'https://stordial.com/about',
                      'https://stordial.com/contact'
                    ].map((url, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-800">{url}</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
} 