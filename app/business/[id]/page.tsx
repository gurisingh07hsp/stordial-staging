'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BusinessDetailPage from '../../../components/BusinessDetailPage';
import { businesses } from '../../../data/mockData';


export default function BusinessDetail() {
  const params = useParams();
  const businessId = params.id as string;
  
  const business = businesses.find(b => b.id === businessId);
  
  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h1>
          <p className="text-gray-600">The business you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return <BusinessDetailPage business={business} />;
}