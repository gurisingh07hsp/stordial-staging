'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Check,
  X,
  Star,
  MapPin,
  Phone,
  Upload,
  Clock,
  Image as ImageIcon,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { Business } from '../../types';

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

export default function BusinessManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkImportFile, setBulkImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<Array<{
    name: string;
    description: string;
    category: string;
    subcategory: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    website: string;
    status: string;
  }>>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<string[]>([]);

  // Form data for new business
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    services: [] as string[],
    phone: '',
    email: '',
    address: '',
    city: '',
    website: ''
  });

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '10:00', close: '15:00', closed: false },
    sunday: { open: '10:00', close: '15:00', closed: true }
  });

  // Mock data - in real app this would come from API
  const businesses: Business[] = [
    {
      id: '1',
      name: 'Café Central',
      description: 'A cozy café serving fresh coffee and pastries',
      category: 'Restaurants',
      subcategory: 'Coffee Shop',
      services: ['Coffee', 'Pastries', 'Breakfast'],
      city: 'New York',
      rating: 4.5,
      reviews: 128,
      image: '/api/placeholder/300/200',
      phone: '+1 (555) 123-4567',
      email: 'info@cafecentral.com',
      website: 'https://cafecentral.com',
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      description: 'Professional IT services and consulting',
      category: 'Services',
      subcategory: 'Consulting',
      services: ['IT Consulting', 'Web Development', 'System Administration'],
      city: 'San Francisco',
      rating: 4.8,
      reviews: 95,
      image: '/api/placeholder/300/200',
      phone: '+1 (555) 987-6543',
      email: 'contact@techsolutions.com',
      website: 'https://techsolutions.com',
      address: '456 Tech Ave, San Francisco, CA 94102'
    },
    {
      id: '3',
      name: 'Green Gardens',
      description: 'Landscaping and garden maintenance services',
      category: 'Services',
      subcategory: 'Cleaning',
      services: ['Landscaping', 'Garden Maintenance', 'Tree Trimming'],
      city: 'Los Angeles',
      rating: 4.2,
      reviews: 67,
      image: '/api/placeholder/300/200',
      phone: '+1 (555) 456-7890',
      email: 'hello@greengardens.com',
      website: 'https://greengardens.com',
      address: '789 Garden Blvd, Los Angeles, CA 90210'
    }
  ];

  const categories = ['All', 'Restaurants', 'Services', 'Healthcare', 'Retail', 'Entertainment'];
  const statuses = ['All', 'Active', 'Pending', 'Suspended', 'Featured', 'Not Featured'];

  const subcategories = {
    'Restaurants': ['Coffee Shop', 'Fine Dining', 'Fast Food', 'Cafe', 'Bar', 'Pizza', 'Asian', 'Mexican', 'Italian', 'American'],
    'Retail': ['Clothing', 'Electronics', 'Home & Garden', 'Sports', 'Books', 'Jewelry', 'Shoes', 'Accessories', 'Grocery', 'Hardware'],
    'Services': ['Repair', 'Cleaning', 'Consulting', 'Transportation', 'Legal', 'Accounting', 'Insurance', 'Real Estate', 'Photography', 'Design'],
    'Healthcare': ['Medical Clinic', 'Dental', 'Pharmacy', 'Wellness', 'Therapy', 'Optometry', 'Veterinary', 'Chiropractic', 'Massage', 'Nutrition'],
    'Entertainment': ['Movie Theater', 'Gaming', 'Sports', 'Music', 'Art', 'Bowling', 'Arcade', 'Karaoke', 'Comedy Club', 'Escape Room'],
    'Beauty': ['Hair Salon', 'Spa', 'Nail Salon', 'Barber Shop', 'Makeup', 'Tanning', 'Tattoo', 'Piercing', 'Esthetics', 'Barber'],
    'Fitness': ['Gym', 'Yoga Studio', 'Personal Training', 'Swimming', 'Dance', 'Martial Arts', 'Pilates', 'CrossFit', 'Boxing', 'Tennis'],
    'Education': ['School', 'Tutoring', 'Language', 'Music', 'Art Classes', 'Driving School', 'Cooking Classes', 'Computer Training', 'Test Prep', 'Preschool']
  };

  const days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Featured' && (business.featured || featuredBusinesses.includes(business.id))) ||
                         (selectedStatus === 'Not Featured' && !business.featured && !featuredBusinesses.includes(business.id)) ||
                         (selectedStatus === 'Active' && business.isClaimed) ||
                         (selectedStatus === 'Pending' && !business.isClaimed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedBusinesses.length === filteredBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(filteredBusinesses.map(b => b.id));
    }
  };

  const handleSelectBusiness = (id: string) => {
    setSelectedBusinesses(prev => 
      prev.includes(id) 
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    // In real app, this would call API to delete businesses
    alert(`Delete ${selectedBusinesses.length} businesses?`);
    setSelectedBusinesses([]);
  };

  const handleEditBusiness = (business: Business) => {
    // TODO: Implement edit functionality
    console.log('Edit business:', business);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Business added successfully!');
      setShowAddModal(false);
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        services: [],
        phone: '',
        email: '',
        address: '',
        city: '',
        website: ''
      });
      setUploadedImages([]);
      setOpeningHours({
        monday: { open: '09:00', close: '17:00', closed: false },
        tuesday: { open: '09:00', close: '17:00', closed: false },
        wednesday: { open: '09:00', close: '17:00', closed: false },
        thursday: { open: '09:00', close: '17:00', closed: false },
        friday: { open: '09:00', close: '17:00', closed: false },
        saturday: { open: '10:00', close: '15:00', closed: false },
        sunday: { open: '10:00', close: '15:00', closed: true }
      });
    }, 2000);
  };

  const handleBulkImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBulkImportFile(file);
      // Simulate CSV parsing - in real app, you'd use a CSV parser
      const mockPreview = [
        {
          name: 'Sample Business 1',
          description: 'A sample business for import',
          category: 'Restaurants',
          subcategory: 'Coffee Shop',
          phone: '+1 (555) 111-1111',
          email: 'sample1@example.com',
          address: '123 Sample St, City, State',
          city: 'Sample City',
          website: 'https://sample1.com',
          status: 'valid'
        },
        {
          name: 'Sample Business 2',
          description: 'Another sample business',
          category: 'Services',
          subcategory: 'Consulting',
          phone: '+1 (555) 222-2222',
          email: 'sample2@example.com',
          address: '456 Sample Ave, City, State',
          city: 'Sample City',
          website: 'https://sample2.com',
          status: 'valid'
        },
        {
          name: '',
          description: 'Invalid business - missing name',
          category: 'Retail',
          subcategory: 'Clothing',
          phone: '+1 (555) 333-3333',
          email: 'invalid@example.com',
          address: '789 Sample Blvd, City, State',
          city: 'Sample City',
          website: 'https://invalid.com',
          status: 'error'
        }
      ];
      setImportPreview(mockPreview);
    }
  };

  const handleBulkImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      alert(`Successfully imported ${importPreview.filter(item => item.status === 'valid').length} businesses!`);
      setShowBulkImportModal(false);
      setBulkImportFile(null);
      setImportPreview([]);
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = `name,description,category,subcategory,services,phone,email,address,city,website,image_url,monday_open,monday_close,monday_closed,tuesday_open,tuesday_close,tuesday_closed,wednesday_open,wednesday_close,wednesday_closed,thursday_open,thursday_close,thursday_closed,friday_open,friday_close,friday_closed,saturday_open,saturday_close,saturday_closed,sunday_open,sunday_close,sunday_closed
Sample Business,Description of the business,Restaurants,Coffee Shop,"Coffee, Pastries, Breakfast",+1 (555) 123-4567,business@example.com,123 Main St,New York,https://example.com,https://example.com/image.jpg,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,10:00,15:00,false,10:00,15:00,true
Tech Solutions,IT consulting and development services,Services,Consulting,"IT Consulting, Web Development, System Administration",+1 (555) 987-6543,contact@techsolutions.com,456 Tech Ave,San Francisco,https://techsolutions.com,https://techsolutions.com/image.jpg,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,10:00,16:00,false,00:00,00:00,true
Green Gardens,Landscaping and garden maintenance,Services,Cleaning,"Landscaping, Garden Maintenance, Tree Trimming",+1 (555) 456-7890,hello@greengardens.com,789 Garden Blvd,Los Angeles,https://greengardens.com,https://greengardens.com/image.jpg,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,09:00,14:00,false,00:00,00:00,true`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleToggleFeatured = (businessId: string) => {
    setFeaturedBusinesses(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Business Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage all business listings and their information</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setShowBulkImportModal(true)}
            className="flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Bulk Import</span>
            <span className="sm:hidden">Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Add Business</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-xs sm:text-sm text-gray-600">
              {filteredBusinesses.length} businesses found
            </span>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBusinesses.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs sm:text-sm font-medium text-blue-800">
              {selectedBusinesses.length} businesses selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  selectedBusinesses.forEach(id => handleToggleFeatured(id));
                  setSelectedBusinesses([]);
                }}
                className="flex items-center px-2 sm:px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-xs sm:text-sm"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Toggle Featured</span>
                <span className="sm:hidden">Featured</span>
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center px-2 sm:px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </button>
              <button
                onClick={() => setSelectedBusinesses([])}
                className="flex items-center px-2 sm:px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Clear Selection</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Businesses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBusinesses.length === filteredBusinesses.length && filteredBusinesses.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Rating
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Featured
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.includes(business.id)}
                      onChange={() => handleSelectBusiness(business.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                          src={business.image}
                          alt={business.name}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{business.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{business.description}</div>
                        <div className="sm:hidden text-xs text-gray-500">
                          {business.category} • {business.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {business.category}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{business.city}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-900">{business.rating}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <button
                      onClick={() => handleToggleFeatured(business.id)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        featuredBusinesses.includes(business.id) || business.featured
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={featuredBusinesses.includes(business.id) || business.featured ? 'Remove from Featured' : 'Add to Featured'}
                    >
                      <Star className={`w-3 h-3 mr-1 ${featuredBusinesses.includes(business.id) || business.featured ? 'fill-current' : ''}`} />
                      {featuredBusinesses.includes(business.id) || business.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleEditBusiness(business)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-3 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBusinesses.length}</span> of{' '}
            <span className="font-medium">{businesses.length}</span> results
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-blue-600 rounded-md">
              1
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Add Business Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 mx-auto p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Add New Business</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    Business Details
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Enter business name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select Category</option>
                        {categories.filter(c => c !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {formData.category && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subcategory
                        </label>
                        <select
                          value={formData.subcategory}
                          onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories[formData.category as keyof typeof subcategories]?.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Brief description of your business..."
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Contact Information
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="business@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="https://www.example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Enter full address"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                    Business Images
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Business Photos
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="image-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                          Choose Files
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Upload up to 5 images (PNG, JPG, GIF up to 10MB each)
                      </p>
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Opening Hours */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    Opening Hours
                  </h4>
                  
                  <div className="grid gap-3">
                    {days.map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 text-sm font-medium text-gray-700">
                          {label}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={openingHours[key].open}
                            onChange={(e) => setOpeningHours({
                              ...openingHours,
                              [key]: { ...openingHours[key], open: e.target.value }
                            })}
                            disabled={openingHours[key].closed}
                            className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-200"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={openingHours[key].close}
                            onChange={(e) => setOpeningHours({
                              ...openingHours,
                              [key]: { ...openingHours[key], close: e.target.value }
                            })}
                            disabled={openingHours[key].closed}
                            className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-200"
                          />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={openingHours[key].closed}
                            onChange={(e) => setOpeningHours({
                              ...openingHours,
                              [key]: { ...openingHours[key], closed: e.target.checked }
                            })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Closed</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding Business...' : 'Add Business'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 mx-auto p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Bulk Import Businesses</h3>
                <button
                  onClick={() => setShowBulkImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* File Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Upload File
                  </h4>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="bulk-import-file" className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        Choose CSV/Excel File
                      </label>
                      <input
                        id="bulk-import-file"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleBulkImportFile}
                        className="hidden"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum file size: 10MB
                    </p>
                  </div>

                  {bulkImportFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          File uploaded: {bulkImportFile.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Download */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Download className="w-4 h-4 mr-2 text-blue-600" />
                    Download Template
                  </h4>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-3">
                      Download our CSV template to ensure your file has the correct format and column headers.
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </button>
                  </div>
                </div>

                {/* Import Preview */}
                {importPreview.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Import Preview</h4>
                    
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Business Name
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                City
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {importPreview.map((item, index) => (
                              <tr key={index} className={item.status === 'error' ? 'bg-red-50' : ''}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    item.status === 'valid' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {item.status === 'valid' ? 'Valid' : 'Error'}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.name || <span className="text-red-600">Missing name</span>}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.category}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.city}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.email}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Valid entries: {importPreview.filter(item => item.status === 'valid').length}
                      </span>
                      <span>
                        Errors: {importPreview.filter(item => item.status === 'error').length}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowBulkImportModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkImport}
                    disabled={!bulkImportFile || isImporting}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isImporting ? 'Importing...' : 'Import Businesses'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 