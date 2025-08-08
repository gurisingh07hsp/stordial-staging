'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { BusinessFormData, Business, User } from '../types';
import { ArrowLeft, Upload, Clock, MapPin, Phone, Image as ImageIcon, X } from 'lucide-react';

interface ListBusinessPageProps {
  onBack: () => void;
  allBusinesses: Business[];
  onBusinessClick: (business: Business) => void;
  onMenuToggle: () => void;
  onAuthClick: () => void;
  onListBusinessClick: () => void;
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

export default function ListBusinessPage({
  onBack
}: ListBusinessPageProps) {
  const [formData, setFormData] = useState<BusinessFormData>({
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

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '10:00', close: '15:00', closed: false },
    sunday: { open: '10:00', close: '15:00', closed: true }
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
      const response = await axios.post('http://localhost:5001/api/v1/businesses/new', formData,{withCredentials: true});
      if(response.status == 201){
        setIsSubmitting(false);
        alert('Business listing submitted successfully');
        onBack();
      }
    }catch(error){
      console.error('Error submitting business listing: ', error);
    }
  };

  const categories = [
    'Restaurants', 'Retail', 'Services', 'Healthcare', 
    'Entertainment', 'Beauty', 'Fitness', 'Education'
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-800">List Your Business</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">List Your Business</h2>
              <p className="text-gray-600 text-sm">Share your business with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Business Details
                </h3>
                
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      onChange={(e) => setFormData({...formData, category: e.target.value.toLowerCase(), subcategory: ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your business..."
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  Contact Info
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="business@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Business Street"
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
                      onChange={(e) => setFormData({...formData, city: e.target.value.toLowerCase()})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City Name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.yourbusiness.com"
                    />
                  </div>
                </div>
              </div>

              {/* Opening Hours - Compact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Hours
                </h3>
                
                <div className="grid grid-cols-7 gap-2">
                  {days.map(({ key, label }) => (
                    <div key={key} className="text-center">
                      <div className="text-xs font-medium text-gray-700 mb-1">{label}</div>
                      <div className="space-y-1">
                        <input
                          type="checkbox"
                          checked={!openingHours[key].closed}
                          onChange={(e) => setOpeningHours(prev => ({
                            ...prev,
                            [key]: { ...prev[key], closed: !e.target.checked }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {!openingHours[key].closed && (
                          <div className="space-y-1">
                            <input
                              type="time"
                              value={openingHours[key].open}
                              onChange={(e) => setOpeningHours(prev => ({
                                ...prev,
                                [key]: { ...prev[key], open: e.target.value }
                              }))}
                              className="w-full px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="time"
                              value={openingHours[key].close}
                              onChange={(e) => setOpeningHours(prev => ({
                                ...prev,
                                [key]: { ...prev[key], close: e.target.value }
                              }))}
                              className="w-full px-1 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Upload - Compact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Images
                </h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Upload Business Images
                    </div>
                    <div className="text-xs text-gray-500">
                      Click to browse or drag images here
                    </div>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-16 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Business Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 