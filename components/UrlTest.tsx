'use client';

import React from 'react';
import { businesses } from '../data/mockData';
import { Business } from '../types';

export default function UrlTest() {
  const testBusinesses = businesses.filter(b => b.featured).slice(0, 3);
  
  const formatBusinessUrl = (business: Business) => {
    const location = business.city.toLowerCase().replace(/\s+/g, '-');
    const category = business.category.toLowerCase().replace(/\s+/g, '-');
    const name = business.name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-');
    return `/${location}/${category}/${name}`;
  };

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">URL Test for Featured Businesses</h2>
      <div className="space-y-4">
        {testBusinesses.map((business) => (
          <div key={business.id} className="border p-4 rounded">
            <h3 className="font-semibold">{business.name}</h3>
            <p>Category: {business.category}</p>
            <p>City: {business.city}</p>
            <p>Generated URL: <code className="bg-gray-100 px-2 py-1 rounded">{formatBusinessUrl(business)}</code></p>
            <a 
              href={formatBusinessUrl(business)}
              className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 