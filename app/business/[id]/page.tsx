'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import BusinessDetailPage from '../../../components/BusinessDetailPage';
import { businesses } from '../../../data/mockData';


export default function BusinessDetail() {
  const [business, setBusiness] = useState(null);
  const params = useParams();
  const businessId = params.id as string;

  useEffect(() => {
    const getBusinessById = async() => {
      try{
        const response = await axios.get(`http://localhost:5001/api/v1/businesses/${businessId}`, {withCredentials: true});
        if(response.status == 200){
          setBusiness(response.data.business);
        }

      }catch(error){
        console.log('Error fetching business: ', error);
      }
    }
    getBusinessById();
  }, [])
  
  
  
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