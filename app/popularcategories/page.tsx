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
  'Apparel Stores','Home Services','Repair Services','Maintenance Services',
  // Travel & Transport
  'Travel Agencies','Tour Operators','Taxi Services','Car Rentals','Bike Rentals','Bus Services','Metro Services',
  // Financial & Government
  'Banks','Government Offices',
  // Religion & NGOs
  'Temples','Gurudwaras','Churches','Mosques','NGOs','Charitable Organizations'
];
  return (
    <div className='h-[99vh]'>
      <h2 className='text-xl ms-4 mt-2 font-bold'>Popular Categories</h2>
      { userLocation?.city ?
      <div className='flex mx-auto flex-wrap w-[90%] gap-5 mt-4'>
        {popularCategories.map((category, index)=> (
            <div key={index} onClick={()=>handleClick(category)} className='w-52 py-2 cursor-pointer hover:bg-[#ebebeb] rounded-md'>
                <p className='ms-3'>{category}</p>
            </div>
        ))}
      </div>
      : <div className='w-[99vw] h-[90vh] flex justify-center items-center text-xl '>Loading...</div>}
    </div>
  )
}

export default PopularCategories
