'use client';

import React from 'react';
import { Search, Star, MessageSquare, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search & Discover',
      description: 'Find local businesses in your area using our powerful search engine. Filter by category, location, and ratings.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Star,
      title: 'Read Reviews',
      description: 'Browse authentic reviews from real customers to make informed decisions about which businesses to choose.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: MessageSquare,
      title: 'Contact & Connect',
      description: 'Reach out to businesses directly through our platform. Get quotes, ask questions, and book services.',
      color: 'bg-green-100 text-green-600'
    }
  ];

  const features = [
    {
      title: 'Verified Businesses',
      description: 'All businesses are verified and reviewed for quality assurance.',
      icon: CheckCircle
    },
    {
      title: 'Real Reviews',
      description: 'Authentic customer reviews help you make the best choices.',
      icon: CheckCircle
    },
    {
      title: 'Easy Contact',
      description: 'Contact businesses directly through our platform.',
      icon: CheckCircle
    },
    {
      title: 'Local Focus',
      description: 'Find businesses right in your neighborhood.',
      icon: CheckCircle
    },
    {
      title: 'Free to Use',
      description: 'Search and contact businesses completely free.',
      icon: CheckCircle
    },
    {
      title: 'Mobile Friendly',
      description: 'Use our platform on any device, anywhere.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">How LocalConnect Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how easy it is to find and connect with the best local businesses in your area. Our platform makes local business discovery simple and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Simple 3-Step Process</h2>
            <p className="text-lg text-gray-600">Find the perfect local business in just a few clicks</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose LocalConnect?</h2>
            <p className="text-lg text-gray-600">We make local business discovery simple and reliable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Businesses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">For Business Owners</h2>
              <p className="text-lg text-gray-600 mb-6">
                Are you a local business owner? Join our platform to reach more customers and grow your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Free business listing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Customer reviews and ratings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Direct customer inquiries</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Business dashboard</span>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  List Your Business
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-center">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Thousands of Businesses</h3>
                <p className="text-gray-600 mb-6">
                  Over 1,000 local businesses trust LocalConnect to connect with their customers.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">1,234</div>
                    <div className="text-sm text-gray-600">Active Businesses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">5,678</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Real stories from real people</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Local Resident</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;LocalConnect helped me find the perfect restaurant for my anniversary. The reviews were spot-on!&quot;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Mike Chen</h4>
                  <p className="text-sm text-gray-600">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;Since listing my business on LocalConnect, I&apos;ve seen a 40% increase in new customers.&quot;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Emily Davis</h4>
                  <p className="text-sm text-gray-600">Local Resident</p>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;I love how easy it is to find and contact local businesses. The platform is so user-friendly!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already discovering amazing local businesses through LocalConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Searching
            </button>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
              List Your Business
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 