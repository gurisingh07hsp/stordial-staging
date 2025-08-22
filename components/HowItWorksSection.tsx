'use client';

import React from 'react';
import { Search, Star, MapPin, Users } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold text-gray-800 mb-4">How LocalConnect Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and connect with local businesses in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Search</h3>
            <p className="text-gray-600">Enter what you&apos;re looking for and your location to find nearby businesses</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Compare</h3>
            <p className="text-gray-600">Browse reviews, ratings, and details to find the perfect match</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect</h3>
            <p className="text-gray-600">Contact businesses directly or visit their locations</p>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose LocalConnect?</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We make it easy to discover and connect with the best local businesses in your area
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Local Focus</h4>
                <p className="text-sm text-gray-600">Find businesses right in your neighborhood</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Verified Reviews</h4>
                <p className="text-sm text-gray-600">Read authentic reviews from real customers</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Community Driven</h4>
                <p className="text-sm text-gray-600">Built by and for local communities</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Easy Search</h4>
                <p className="text-sm text-gray-600">Find exactly what you need quickly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 