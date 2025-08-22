'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, Star, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Business } from '../types';

interface LocationBasedResultsProps {
  businesses: Business[];
  selectedLocation: string;
  onBusinessClick: (business: Business) => void;
}

export default function LocationBasedResults({ 
  businesses, 
  selectedLocation, 
  onBusinessClick 
}: LocationBasedResultsProps) {
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories from businesses
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(businesses.map(b => b.category)));
    return uniqueCategories.sort();
  }, [businesses]);

  // Filter and sort businesses
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = businesses;
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(business => 
        selectedCategories.includes(business.category)
      );
    }

    // Sort businesses
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [businesses, selectedCategories, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy('rating');
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-[30px] font-bold text-gray-800">
              Businesses in {selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)}
            </h2>
          </div>
          <p className="text-gray-600">
            Found {filteredAndSortedBusinesses.length} businesses in {selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">Filter by Category</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filteredAndSortedBusinesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedBusinesses.map((business) => (
              <div
                key={business.email}
                onClick={() => onBusinessClick(business)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 overflow-hidden"
              >
                {/* Business Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400 text-3xl">
                      {business.category === 'Restaurants' && '🍽️'}
                      {business.category === 'Retail' && '🛍️'}
                      {business.category === 'Services' && '🔧'}
                      {business.category === 'Healthcare' && '🏥'}
                      {business.category === 'Entertainment' && '🎬'}
                      {business.category === 'Beauty' && '💄'}
                      {business.category === 'Fitness' && '💪'}
                      {business.category === 'Education' && '📚'}
                      {!['Restaurants', 'Retail', 'Services', 'Healthcare', 'Entertainment', 'Beauty', 'Fitness', 'Education'].includes(business.category) && '🏢'}
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs font-semibold">{business.rating}</span>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full px-2 py-1 shadow-sm">
                    <span className="text-xs font-semibold">{business.category}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{business.description}</p>
                  
                  {/* Services */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {business.services.slice(0, 2).map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {business.services.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{business.services.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{business.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-4">
              No businesses match your current filters in {selectedLocation}
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 