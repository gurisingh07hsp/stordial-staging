'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Star, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Business } from '../../../types';
import axios from 'axios';

interface CategoryPageProps {
  params: {
    location: string;
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedLocation = decodeURIComponent(params.location);
  const decodedCategory = decodeURIComponent(params.category);

  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const getBusinessesByCategotyAndLocation = async () => {
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${decodedLocation}/category/${decodedCategory}`, {withCredentials: true});
        if(response.status == 200){
          setFilteredBusinesses(response.data.businesses);
        }
      }catch(error){
        console.error('Error fetching businesses: ', error);
      }
    }
    getBusinessesByCategotyAndLocation();
  }, [decodedLocation, decodedCategory])


  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Premium advertisement data
  const premiumAds = [
    {
      id: 1,
      businessName: "Hotel Grand Plaza",
      tagline: "Premium Accommodation in Jalandhar",
      description: "Experience luxury with rooftop dining and spa services",
      image: "/hotel-premium-1",
      rating: 4.5,
      reviews: 567,
      cta: "Book Now",
      link: "/jalandhar/hotels/hotel-grand-plaza"
    },
    {
      id: 2,
      businessName: "Hotel Royal Palace",
      tagline: "Royal Experience Awaits",
      description: "Perfect for special occasions and business events",
      image: "/hotel-premium-2",
      rating: 4.3,
      reviews: 345,
      cta: "Learn More",
      link: "/jalandhar/hotels/hotel-royal-palace"
    },
    {
      id: 3,
      businessName: "Hotel Rigal Blu",
      tagline: "3-Star Luxury in Model Town",
      description: "Swimming pool, spa, and conference facilities",
      image: "/hotel-premium-3",
      rating: 4.2,
      reviews: 234,
      cta: "View Details",
      link: "/jalandhar/hotels/hotel-rigal-blu"
    }
  ];

  const sortedBusinesses = useMemo(() => {
    let sorted = [...filteredBusinesses];
    
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      sorted.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    if (selectedServices.length > 0) {
      sorted = sorted.filter(business => 
        selectedServices.some(service => 
          business.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
        )
      );
    }
    
    return sorted;
  }, [filteredBusinesses, sortBy, selectedServices]);

  const allServices = useMemo(() => {
    const services = new Set<string>();
    filteredBusinesses.forEach(business => {
      business.services.forEach(service => services.add(service));
    });
    return Array.from(services).sort();
  }, [filteredBusinesses]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
    setSortBy('rating');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleBusinessClick = (business: Business) => {
    const locationPath = business.city.toLowerCase().replace(/\s+/g, '-');
    const categoryPath = business.category.toLowerCase().replace(/\s+/g, '-');
    const namePath = business.name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
    const url = `/${locationPath}/${categoryPath}/${namePath}`;
    window.location.href = url;
  };

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % premiumAds.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + premiumAds.length) % premiumAds.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)} in {decodedLocation.charAt(0).toUpperCase() + decodedLocation.slice(1)}
              </h1>
              <p className="text-gray-600 mt-2">
                {sortedBusinesses.length} businesses found
              </p>
            </div>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Premium Advertisement Carousel */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Featured Businesses</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={prevAd}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextAd}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">PREMIUM</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{premiumAds[currentAdIndex].rating}</span>
                          <span className="text-gray-500">({premiumAds[currentAdIndex].reviews} reviews)</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{premiumAds[currentAdIndex].businessName}</h3>
                      <p className="text-lg font-medium text-blue-600 mb-2">{premiumAds[currentAdIndex].tagline}</p>
                      <p className="text-gray-600 mb-4">{premiumAds[currentAdIndex].description}</p>
                      <Link
                        href={premiumAds[currentAdIndex].link}
                        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {premiumAds[currentAdIndex].cta}
                      </Link>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏨</span>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {premiumAds.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAdIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentAdIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-6">
              <ol className="flex items-center space-x-2">
                <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
                <li>/</li>
                <li><Link href={`/${decodedLocation.toLowerCase().replace(/\s+/g, '-')}/${decodedCategory.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gray-700">{decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}</Link></li>
                <li>/</li>
                <li className="text-gray-900">{decodedLocation.charAt(0).toUpperCase() + decodedLocation.slice(1)}</li>
              </ol>
            </nav>

            {/* Filters and Sort */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                {selectedServices.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Service Filters */}
              {allServices.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Services:</label>
                  <div className="flex flex-wrap gap-2">
                    {allServices.map(service => (
                      <button
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`px-3 py-1 text-xs rounded-full border ${
                          selectedServices.includes(service)
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Business List */}
            {sortedBusinesses.length > 0 ? (
              <div className="space-y-4">
                {sortedBusinesses.map((business) => (
                  <div key={business.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                          {business.isClaimed && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{business.rating}</span>
                            <span className="text-gray-500">({business.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{business.address}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3">{business.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {business.services.slice(0, 5).map((service, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {service}
                            </span>
                          ))}
                          {business.services.length > 5 && (
                            <span className="text-gray-500 text-xs">+{business.services.length - 5} more</span>
                          )}
                        </div>

                        {business.specialties && business.specialties.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-700">Specialties: </span>
                            <span className="text-sm text-gray-600">{business.specialties.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleCall(business.phone)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button
                          onClick={() => handleBusinessClick(business)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>

          {/* Advertisement Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* Featured Advertisement */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">AD</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Featured Business</h3>
                  <p className="text-sm text-gray-600">Promote your business here</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-medium text-gray-900">Premium Listing</h4>
                    <p className="text-sm text-gray-600">Get more visibility with premium placement</p>
                    <button className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700">
                      Learn More
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <h4 className="font-medium text-gray-900">Sponsored Results</h4>
                    <p className="text-sm text-gray-600">Appear at the top of search results</p>
                    <button className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded text-sm hover:bg-green-700">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Businesses</span>
                    <span className="font-medium">{filteredBusinesses.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="font-medium">
                      {(filteredBusinesses.reduce((sum, b) => sum + b.rating, 0) / filteredBusinesses.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verified</span>
                    <span className="font-medium">
                      {filteredBusinesses.filter(b => b.isClaimed).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Categories */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Categories</h3>
                <div className="space-y-2">
                  {['Restaurants', 'Hospitals', 'Schools', 'Shopping'].map((cat) => (
                    <Link
                      key={cat}
                      href={`/${decodedLocation.toLowerCase().replace(/\s+/g, '-')}/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-blue-600 hover:text-blue-800 text-sm py-1"
                    >
                      {cat} in {decodedLocation.charAt(0).toUpperCase() + decodedLocation.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 