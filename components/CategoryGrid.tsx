'use client';

import React from 'react';
import { useAutoLocation } from '../hooks/useAutoLocation';

interface CategoryGridProps {
  onCategoryClick: (categoryName: string) => void;
}

export default function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  const { location: userLocation, isLoading: locationLoading } = useAutoLocation();

  const categories = [
    { name: 'Restaurants', icon: '🍽️', description: 'Find the best restaurants and cafes' },
    { name: 'Hotels', icon: '🏨', description: 'Book hotels and accommodations' },
    { name: 'Hospitals', icon: '🏥', description: 'Healthcare and medical services' },
    { name: 'Schools', icon: '🎓', description: 'Educational institutions' },
    { name: 'Shopping', icon: '🛍️', description: 'Retail stores and shopping centers' },
    { name: 'Automotive', icon: '🚗', description: 'Car services and dealerships' },
    { name: 'Beauty & Spa', icon: '💄', description: 'Salons and wellness centers' },
    { name: 'Fitness', icon: '💪', description: 'Gyms and fitness centers' },
    { name: 'Dentists', icon: '🦷', description: 'Dental care and orthodontics' },
    { name: 'Lawyers', icon: '⚖️', description: 'Legal services and attorneys' },
    { name: 'Real Estate', icon: '🏠', description: 'Property and real estate agents' },
    { name: 'Banks', icon: '🏦', description: 'Financial services and banking' },
    { name: 'Pharmacies', icon: '💊', description: 'Medicine and health products' },
    { name: 'Petrol Pumps', icon: '⛽', description: 'Fuel and convenience stores' },
    { name: 'Pet Services', icon: '🐕', description: 'Veterinary and pet care' },
    { name: 'Home Services', icon: '🔧', description: 'Plumbing, electrical, and repairs' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (userLocation && !locationLoading) {
      const location = userLocation.city.toLowerCase().replace(/\s+/g, '-');
      const category = categoryName.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `/${location}/${category}`;
    } else {
      onCategoryClick(categoryName);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">Discover local businesses in your area</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-blue-100 hover:border-blue-200"
            >
              <div className="text-2xl md:text-3xl mb-2">{category.icon}</div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-xs text-gray-600 hidden md:block">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 