'use client';
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSection from '../components/FeaturedSection';
import TrendingSection from '../components/TrendingSection';
import BusinessModal from '../components/BusinessModal';
import LocationBasedResults from '../components/LocationBasedResults';
import { businesses } from '../data/mockData';
import { Business } from '../types';
import { Star,ArrowRight } from 'lucide-react';
import { useAutoLocation } from '../hooks/useAutoLocation';
import axios from 'axios';
export default function HomePage() {
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);

  // Auto-detect user location
  const { location: userLocation } = useAutoLocation();
  
  // Use userLocation to auto-populate search if needed
  // Note: userLocation is used for future auto-population feature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _userLocation = userLocation; // Suppress unused variable warning

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    setShowBusinessModal(true);
  };

  const handleSearch = async(query: string, location: string, category: string) => {
    setIsSearching(true);
    // Simulate search

    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${location}/category/${category}`, {withCredentials: true});
        if(response.status == 200){
          setSearchResults(response.data.businesses);
          setIsSearching(false);
        }
      }catch(error){
        console.error('Error fetching businesses: ', error);
      }
  };

  useEffect(() => {
    const getFeaturedBusinesses = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/featured`, {withCredentials: true});
      if(response.status == 200){
        setFeaturedBusinesses(response.data.businesses);
      }
    }
    getFeaturedBusinesses();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const categoryBusinesses = businesses.filter(business => 
      business.category.toLowerCase().includes(categoryName.toLowerCase()) ||
      business.subcategory.toLowerCase().includes(categoryName.toLowerCase())
    );
    setSearchResults(categoryBusinesses);
  };

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
        onSearch={handleSearch}
      />

      {isSearching && (
        <div className="text-center py-8 bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      )}

      {searchResults.length > 0 && !isSearching && (
        <LocationBasedResults
          businesses={searchResults}
          selectedLocation={searchResults[0]?.city || ''}
          onBusinessClick={handleBusinessClick}
        />
      )}

      <div id="categories">
        <CategoryGrid onCategoryClick={handleCategoryClick} />
      </div>

      {/* Featured Businesses Section */}
      <FeaturedSection businesses={featuredBusinesses} />
      <TrendingSection businesses={businesses} />

      {/* How It Works Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Stordial Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and connect with local businesses in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Search</h3>
              <p className="text-gray-600">Enter what you&apos;re looking for and your location to find nearby businesses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
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
        </div>
      </section> */}

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our growing community of satisfied customers and businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Local Businesses</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Verified Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
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



      {showBusinessModal && selectedBusiness && (
        <BusinessModal
          business={selectedBusiness}
          onClose={() => setShowBusinessModal(false)}
        />
      )}


    </div>
  );
}