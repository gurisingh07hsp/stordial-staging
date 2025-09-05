'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-[35px] font-bold text-gray-900 mb-4">About Stordial</h1>
          <p className="text-xl text-gray-600">Connecting communities with local businesses</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-[30px] font-semibold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Stordial, we make it easy for people in an area to find and connect with local businesses they
              trust. We know that local businesses are central to strong communities, and we aim to make it
              easier for everyone to access local services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are searching for a trending restaurant, trustworthy healthcare, a professional,
              or any other local business, at Stordial, you access comprehensive information, customer reviews,
              and contact details to make informed choices confidently.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Customers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Find local businesses to know more about
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Read Genuine Reviews from Swimming Customers
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Get access to contact details and directions fast
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Service and business locator
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">For Businesses</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Enhance your online profile and exposure
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Get in front of and engage your local customers
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Easily manage/update your business profile
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Solicit customer feedback and reviews
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Stordial?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <img src="/icons/audience.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Focus</h3>
              <p className="text-gray-600">We connect you to Nearby businesses you can trust, and find something you need locally.</p>
            </div>
            <div className="text-center">
              <img src="/icons/rating.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Our reviews are from real users so you can be confident in your chosen services and businesses.</p>
            </div>
            <div className="text-center">
                 <img src="/icons/search.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find businesses, products, or services and quickly get accurate information and reliable details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}