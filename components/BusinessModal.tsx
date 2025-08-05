'use client';

import React from 'react';
import { Business } from '../types';

interface BusinessModalProps {
  business: Business | null;
  onClose: () => void;
}

export default function BusinessModal({ business, onClose }: BusinessModalProps) {
  if (!business) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {business.name}
              </h2>
              <p className="text-gray-600">{business.category} • {business.subcategory}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{business.description}</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {business.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Phone:</span> {business.phone}</p>
                  <p><span className="font-medium">Email:</span> {business.email}</p>
                  <p><span className="font-medium">Address:</span> {business.address}</p>
                  <p><span className="font-medium">City:</span> {business.city.charAt(0).toUpperCase() + business.city.slice(1)}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Rating & Reviews</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(business.rating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">{business.rating}</span>
                  <span className="ml-2 text-gray-600">({business.reviews} reviews)</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                  <p><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM</p>
                  <p><span className="font-medium">Sunday:</span> Closed</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                    Call Now
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
                    Get Directions
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200">
                    Visit Website
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 