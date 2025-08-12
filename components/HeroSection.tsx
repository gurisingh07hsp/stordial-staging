'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Filter, ArrowRight, ChevronDown } from 'lucide-react';
import { categories, popularCities } from '../data/mockData';
import { useAutoLocation } from '../hooks/useAutoLocation';
import axios from 'axios';

interface HeroSectionProps {
  onSearch: (query: string, location: string, category: string) => void;
  onBrowseCategories: () => void;
}

interface Suggestion {
  word: string;
  score: number;
}

export default function HeroSection({ onSearch, onBrowseCategories }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const locationRef = useRef<HTMLDivElement>(null);

  // Auto-detect user location
  const { location: userLocation, isLoading: locationLoading } = useAutoLocation();

  // Filter cities based on user input
  useEffect(() => {
    if (location.trim() === '') {
      setFilteredCities(popularCities.slice(0, 10)); // Show top 10 cities
    } else {
      const filtered = popularCities.filter(city =>
        city.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 8)); // Limit to 8 suggestions
    }
  }, [location]);

  // Auto-populate location when detected
  useEffect(() => {
    if (userLocation && !locationLoading) {
      setLocation(userLocation.city.charAt(0).toUpperCase() + userLocation.city.slice(1));
    }
  }, [userLocation, locationLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    // onSearch(searchQuery, location, category);
    if (location && !locationLoading && searchQuery !== 'All Categories' && searchQuery !== '') {
      const locationPath = location.toLowerCase().replace(/\s+/g, '-');
      const categoryPath = searchQuery.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `/${locationPath}/${categoryPath}`;
    }
  };

  const handleLocationSelect = (selectedCity: string) => {
    setLocation(selectedCity);
    setShowLocationDropdown(false);
  };

  const handleLocationFocus = () => {
    setShowLocationDropdown(true);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setShowLocationDropdown(true);
  };

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchSuggestions(false);
  }

  const Categories: string[] = ['Restaurants','Hotels','Hospitals','Schools','Shopping','Automotive','Beauty','Spa',
    'Fitness','Dentists','Lawyers','Real Estate','Banks','Pharmacies','Petrol Pumps','Pet Services','Home Services',
    'Coaching Centres','Tuition Classes','Colleges','Universities','Government Offices','Travel Agencies',
    'Tour Operators','Courier Services','Logistics Services','Event Management','Party Services','Wedding Services',
    'Banquet Halls','Caterers','Photographers','Doctors','Clinics','Diagnostic Centres','Labs','Repair Services',
    'Maintenance Services','Grocery Stores','Supermarkets','Sweet Shops','Bakeries','Clothing Stores',
    'Apparel Stores','Mobile Stores','Electronics Stores','Cyber Cafes','Printing Services','Temples','Gurudwaras',
    'Churches','Mosques','NGOs','Charitable Organizations','Public Transport Services','Bus Services','Taxi Services',
    'Auto Services','Metro Services','Driving Schools','Car Rentals','Bike Rentals','Agricultural Services',
    'Equipment Dealers','Hardware Stores','Building Material Suppliers','Cement Dealers','AC Dealers',
    'AC Repair Services','AC Installation Services','General Physician','Pediatrician','Cardiologist',
    'Dermatologist','Gynecologist Obstetrician','Orthopedic Doctor','ENT Specialist Ear Nose Throat',
    'Ophthalmologist Eye Specialist','Dentist','Neurologist','Psychiatrist','Urologist','Nephrologist',
    'Gastroenterologist','Pulmonologist (Chest Specialist)','Oncologist Cancer Specialist','Endocrinologist',
    'Rheumatologist','Surgeon General','Plastic Surgeon','Physiotherapist','Homeopathy Doctor','Ayurvedic Doctor',
    'Unani Doctor','Sexologist','Immunologist','Geriatric Specialist Elderly Care','Occupational Therapist',
    'Speech Therapist','Dietitian Nutritionist',
  ];
  
  const fetchSuggestions = (value: string) => {
    try{
      setSearchQuery(value);
      setShowSearchSuggestions(true);

      const filteredSuggestions = Categories.filter((item) => item.toLowerCase().includes(value.toLowerCase()));

      console.log(filteredSuggestions);
      if(value !== '')
        {
          setSuggestions(filteredSuggestions.slice(0.8));
        }
        else{
        setShowSearchSuggestions(false);
        setSuggestions([]);
      }
    }catch(error){
      console.error(error);
    }
  }

  return (
    <section className="relative py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            Find Local Businesses
            <br />
            <span className="text-3xl md:text-4xl text-blue-600">That Deliver</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and connect with the best local businesses in your area.
          </p>
        </div>

        {/* Search Container - Single Line */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">

            {/* Location Input with Autocomplete */}
            <div className="relative flex-1 min-w-0" ref={locationRef}>
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={locationLoading ? "Detecting location..." : "Enter your location"}
                value={location}
                onChange={handleLocationChange}
                onFocus={handleLocationFocus}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              
              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                      <button
                        key={index}
                        onClick={() => handleLocationSelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-gray-800">{city}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No cities found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => fetchSuggestions(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />

              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchQueryChange(item)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{item}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No item found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-base whitespace-nowrap"
            >
              Search
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Browse Categories Button */}
            <button
              onClick={onBrowseCategories}
              className="bg-white text-gray-700 py-3 px-6 rounded-lg font-medium text-base border border-gray-300 hover:bg-gray-50 transition-all duration-200 whitespace-nowrap"
            >
              Browse
            </button>
          </div>
        </div>

        {/* Popular Cities Quick Access */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Popular Cities</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCities.slice(0, 8).map((city, index) => (
              <button
                key={index}
                onClick={() => {
                  setLocation(city);
                  onSearch('', city, 'All Categories');
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-gray-800 mb-1">10,000+</div>
            <div className="text-xs text-gray-600">Local Businesses</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-gray-800 mb-1">50,000+</div>
            <div className="text-xs text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
            <div className="text-lg font-bold text-gray-800 mb-1">100%</div>
            <div className="text-xs text-gray-600">Verified Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
} 