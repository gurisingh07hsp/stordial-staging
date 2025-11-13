'use client';

import React from 'react';

import Link from 'next/link';
import { Business } from '../types';

interface TrendingSectionProps {
  businesses: Business[];
}

export default function TrendingSection({ businesses }: TrendingSectionProps) {
  const formatBusinessUrl = (business: Business) => {
    const location = business.city.toLowerCase().replace(/\s+/g, '-');
    const category = business.category.toLowerCase().replace(/\s+/g, '-');
    const id = business._id;
    const url = `/${location}/${category}/${id}`;
    return url;
  };

  // Limit to 8 businesses (2 rows of 4)
  const trandingBusinesses = businesses.filter((business)=> business.verified === true);
  const limitedBusinesses = trandingBusinesses.slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold text-gray-800 mb-4">Trending This Week</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">See what&apos;s popular and getting great reviews in your community</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedBusinesses.map((business, index) => (
            <Link
              key={business._id}
              href={formatBusinessUrl(business)}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">#{index + 1} Trending</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold ml-1">{business.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{business.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{business.category}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{business.reviews} reviews</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(business.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 