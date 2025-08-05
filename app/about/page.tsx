'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Stordial</h1>
          <p className="text-xl text-gray-600">Connecting communities with local businesses</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
              Stordial is dedicated to helping communities discover and connect with the best local businesses in their area. 
              We believe that strong local businesses are the backbone of vibrant communities, and we&apos;re committed to making it 
              easier for people to find the services they need right in their neighborhood.
            </p>
                      <p className="text-gray-600 leading-relaxed">
              Whether you&apos;re looking for a great restaurant, reliable healthcare, professional services, or anything in between, 
              Stordial provides comprehensive information, reviews, and contact details to help you make informed decisions.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Customers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Discover local businesses with detailed information
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Read authentic reviews from real customers
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Get contact information and directions easily
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Find businesses based on your location
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Businesses</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Increase your online visibility
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Connect with local customers
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Manage your business profile
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Get customer reviews and feedback
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Stordial?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Focus</h3>
              <p className="text-gray-600">We focus on connecting you with businesses in your local community.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Reviews</h3>
              <p className="text-gray-600">All reviews are from verified customers to ensure authenticity.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find exactly what you need with our powerful search and filtering.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}