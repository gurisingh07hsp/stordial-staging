'use client';

import React from 'react';
import { useAutoLocation } from '../hooks/useAutoLocation';


export default function CategoryGrid() {
  const { location: userLocation, isLoading: locationLoading } = useAutoLocation();

  const categories = [
    { name: 'Restaurants', icon: '/icons/restaurant.png', description: 'Find the best restaurants and cafes' },
    { name: 'Hotels', icon: '/icons/hotel.png', description: 'Book hotels and accommodations' },
    { name: 'Hospitals', icon: '/icons/hospital.png', description: 'Healthcare and medical services' },
    { name: 'Schools', icon: '/icons/school.png', description: 'Educational institutions' },
    { name: 'Shopping', icon: '/icons/online-shopping.png', description: 'Retail stores and shopping centers' },
    { name: 'Automotive', icon: '/icons/car.png', description: 'Car services and dealerships' },
    { name: 'Beauty', icon: '/icons/beauty.png', description: 'Salons and wellness centers' },
    { name: 'Fitness', icon: '/icons/fitness.png', description: 'Gyms and fitness centers' },
    { name: 'Dentists', icon: '/icons/male.png', description: 'Dental care and orthodontics' },
    { name: 'Lawyers', icon: '/icons/lawyer-man.png', description: 'Legal services and attorneys' },
    { name: 'Real Estate', icon: '/icons/agreement.png', description: 'Property and real estate agents' },
    { name: 'Banks', icon: '/icons/bank.png', description: 'Financial services and banking' },
    { name: 'Pharmacies', icon: '/icons/pharmacy.png', description: 'Medicine and health products' },
    { name: 'Petrol Pumps', icon: '/icons/fuel-pump.png', description: 'Fuel and convenience stores' },
    { name: 'Pet Services', icon: '/icons/petcare.png', description: 'Veterinary and pet care' },
    { name: 'More Categories', icon: '/icons/more categories.png', description: '' }
  ];

  const handleCategoryClick = (categoryName: string) => {
    if(categoryName === 'More Categories'){
      window.location.href = '/popularcategories'
    }
    else if (userLocation && !locationLoading) {
      const location = userLocation.city.toLowerCase().replace(/\s+/g, '-');
      let category = categoryName.toLowerCase().replace(/\s+/g, '-');
      
      if(category === 'restaurants' || category === 'hospitals' || category === 'schools' || category === 'shopping' || category === 'automotive' || category === 'beauty' || category === 'fitness'){
        category = categoryName.replace(/\s+/g, '-');
        window.location.href = `/subcategories?location=${location}&category=${category}`;
      }
      else{
        window.location.href = `/${location}/${category}`;
      }
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">Discover local businesses in your area</p>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-blue-100 hover:border-blue-200"
            >
              <img src={category.icon} className='lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] mx-auto'></img>
              <h3 className="text-[10px] text-center md:text-base font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-xs text-center text-gray-600 hidden md:block">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 