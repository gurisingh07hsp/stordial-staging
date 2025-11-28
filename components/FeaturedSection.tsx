'use client';

import React from 'react';
import { Phone, MapPin, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Business } from '../types';
import { generateSlug } from '@/hooks/generateSlug';

interface FeaturedSectionProps {
  businesses: Business[];
}

export default function FeaturedSection({ businesses }: FeaturedSectionProps) {
  const formatBusinessUrl = (business: Business) => {
    const location = business.city.toLowerCase().replace(/\s+/g, '-');
    const category = business.category.toLowerCase().replace(/\s+/g, '-');
    const name = generateSlug(business.name);
    const id = name + '-' + business._id;
    const url = `/${location}/${category}/${id}`;
    return url;
  };

  // Filter featured businesses and limit to 4 businesses (1 row of 4)
  const featuredBusinesses = businesses;
  const limitedBusinesses = featuredBusinesses.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex mx-auto items-center justify-center mb-4 py-1 rounded-2xl bg-blue-100 w-[280px]">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            </div>
            <h2 className="text-[20px] font-bold text-gray-800">Featured Businesses</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our featured businesses - premium listings that have been handpicked for their exceptional quality and service. These businesses are trusted by our community.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedBusinesses.map((business) => (
            <div 
              key={business._id} 
              className="bg-white rounded-xl shadow-sm transition-shadow cursor-pointer border border-gray-200 overflow-hidden group"
            >
              <Link href={formatBusinessUrl(business)} className="block">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  {business && business.images && business.images.length > 0 ? (
                    <img src={business.images[0].url} alt="" className='w-full h-full'/>
                  ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">
                      {business.category === 'Restaurants' ? '🍽️' : 
                       business.category === 'Retail' ? '🛍️' : 
                       business.category === 'Services' ? '🔧' : '🏢'}
                    </div>
                  </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold ml-1">{business.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white rounded-full px-2 py-1 shadow-sm">
                    <span className="text-xs font-semibold">Featured</span>
                  </div>
                  <div className={`${business.verified ? 'block' : 'hidden'} absolute top-4 left-24 rounded-full shadow-sm`}>
                    <span className="bg-[#60CE80] text-white font-bold text-xs px-3 py-2 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
                
                <div className="px-6 py-3">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{business.name}</h3>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{business.city.charAt(0).toUpperCase() + business.city.slice(1)}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{business.category.charAt(0).toUpperCase() + business.category.slice(1)} • {business.subcategory}</span>
                  </div>
      
                  <div className="text-gray-500 text-sm">{business.address}</div>
                </div>
              </Link>
              
              <div className="pb-6 ms-6">
                <div className="flex items-center gap-x-4">
                  <button 
                    onClick={() => {
                      window.location.href = `tel:${business.phone}`;
                    }}
                    className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                  
                  <Link 
                    href={formatBusinessUrl(business)}
                    className="flex items-center bg-zinc-100 rounded-lg px-4 p-2 border transition-colors"
                  >
                    <span className="text-sm font-medium">View Details</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 