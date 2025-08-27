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
    <div className='h-[99vh] w-[90%] mx-auto'>
      <h2 className='text-xl lg:ms-5 mt-5 font-bold'>More Categories</h2>
      { userLocation?.city ?
      <div className='flex mx-auto flex-wrap lg:justify-center w-full h-[90vh] overflow-y-auto lg:h-[80vh] lg:w-[100%] gap-5 mt-4'>
        {popularCategories.map((category, index)=> (
            <button key={index} onClick={()=>handleClick(category)} className='lg:w-52 w-44 text-start py-2 cursor-pointer hover:bg-[#ebebeb] rounded-md'>
                <p className='ms-3'>{category}</p>
            </button>
        ))}
      </div>
      : <div className='w-[90vw] h-[90vh] flex justify-center items-center text-xl '>Loading...</div>}
    </div>
  )
}

export default PopularCategories
