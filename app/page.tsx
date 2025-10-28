'use client';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSection from '../components/FeaturedSection';
import TrendingSection from '../components/TrendingSection';
import { businesses } from '../data/mockData';
import { Business } from '../types';
import { Star,ArrowRight } from 'lucide-react';
import axios from 'axios';
export default function HomePage() {
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
  useEffect(() => {
    const getFeaturedBusinesses = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/featured`, {withCredentials: true});
      if(response.status == 200){
        setFeaturedBusinesses(response.data.businesses);
      }
    }
    getFeaturedBusinesses();
  }, []);

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="bg-gray-50">

      <div id='search'></div>
      <HeroSection
      />

      <div id="categories">
        <CategoryGrid/>
      </div>

      {/* Featured Businesses Section */}
      <FeaturedSection businesses={featuredBusinesses} />
      <TrendingSection businesses={businesses} />

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our growing community of satisfied customers and businesses
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="lg:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm lg:text-[16px]">Local Businesses</div>
            </div>
            
            <div className="text-center">
              <div className="lg:text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600 text-sm lg:text-[16px]">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="lg:text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 text-sm lg:text-[16px]">Verified Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm lg:text-[16px]">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who found their perfect local businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Local Resident</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Found the perfect coffee shop for my morning meetings. The reviews were spot on!&quot;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Mike Chen</div>
                  <div className="text-sm text-gray-500">Business Owner</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Stordial helped us reach more customers. Great platform for local businesses!&quot;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  E
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Emma Davis</div>
                  <div className="text-sm text-gray-500">Frequent User</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Love how easy it is to find and compare local services. Saved me so much time!&quot;
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Your Perfect Local Business?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have discovered amazing local businesses through Stordial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToSearch} className="bg-[#0765F2] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              Start Searching
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button onClick={()=>window.location.href = 'list-business'} className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
              List Your Business
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}