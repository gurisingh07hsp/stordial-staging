"use client"
import React from 'react'
import { useAutoLocation } from '@/hooks/useAutoLocation';

const PopularCategories = () => {
    const { location: userLocation} = useAutoLocation();

    const handleClick = (category: string) => {
        const locationPath = userLocation?.city.toLowerCase().replace(/\s+/g, '-');
        const categoryPath = category.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/${locationPath}/${categoryPath}`;
    }
    const popularCategories: string[] = [
   // Food & Stay
  'Restaurants','Hotels','Bakeries','Sweet Shops','Caterers','Banquet Halls','Party Services','Wedding Services',
  'Event Management','Photographers',
   // Health & Fitness
  'Hospitals','Clinics','Doctors','Dentists','Diagnostic Centres','Labs','Pharmacies','Fitness','Spa','Beauty',
  'Physiotherapist','Dietitian Nutritionist',
   // Education
  'Schools','Colleges','Universities','Coaching Centres','Tuition Classes','Driving Schools',
  // Shopping & Services
  'Shopping','Supermarkets','Grocery Stores','Clothing Stores','Electronics Stores','Mobile Stores',
  'Apparel Stores','Home Services','Repair Services','Maintenance Services', 'AC Repair Services',
  // Travel & Transport
  'Travel Agencies','Tour Operators','Taxi Services','Car Rentals','Bike Rentals','Bus Services','Metro Services',
  // Financial & Government
  'Banks','Government Offices',
  // Religion & NGOs
  'Temples','Gurudwaras','Churches','ATM','NGOs','Charitable Organizations'
];
  return (
    <div className='h-[99vh] w-[85%] mx-auto'>
      <h2 className='text-xl ms-3 mt-10 font-bold'>More Categories</h2>
      { userLocation?.city ?
      <div className='flex flex-wrap w-full max-h-[90vh] overflow-y-auto lg:w-[100%] gap-2 mt-8'>
        {popularCategories.map((category, index)=> (
            <button key={index} onClick={()=>handleClick(category)} className='lg:w-52 w-44 text-start py-1 cursor-pointer hover:bg-[#ebebeb] rounded-md'>
                <p className='ms-3'>{category}</p>
            </button>
        ))}
      </div>
      : <div className='w-[90vw] h-[90vh] flex justify-center items-center text-xl '>Loading...</div>}
    </div>
  )
}

export default PopularCategories
