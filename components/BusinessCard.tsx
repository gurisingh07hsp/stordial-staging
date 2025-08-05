'use client';

import React from 'react';
import { Business } from '../types';
import { Star, MapPin, Phone, ExternalLink } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  onClick: (business: Business) => void;
}

export default function BusinessCard({ business, onClick }: BusinessCardProps) {
  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
      onClick={() => onClick(business)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {business.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{business.city}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {business.category} • {business.subcategory}
            </p>
          </div>
          <div className="bg-blue-50 rounded-full p-2 group-hover:bg-blue-100 transition-colors duration-200">
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {business.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {business.rating}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({business.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {business.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
          {business.services.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{business.services.length - 3} more
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-medium">{business.address}</p>
              <p>{business.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`tel:${business.phone}`, '_self');
                }}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                title="Call Business"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(business);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}