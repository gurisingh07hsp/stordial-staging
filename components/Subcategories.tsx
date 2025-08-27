'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
const Subcategories = () => {
    const searchParams = useSearchParams();
    const location = searchParams.get("location")?.replace(/-/g, ' ');
    const category = searchParams.get("category")?.replace(/-/g, ' ');
       
    const subcategories = {
    'restaurants': ['Fine Dining Restaurants', 'Casual Dining Restaurants', 'Cafes', 'Fast Food Outlets', 'Food Courts', 'Bakeries & Confectioneries', 'Sweet Shops', 'Buffet Restaurants', 'Multi-Cuisine Restaurants', 'North Indian Restaurants', 'South Indian Restaurants','Chinese Restaurants','Punjabi Dhabas','Seafood Restaurants','Barbeque & Grill Restaurants','Biryani Outlets','Pizza Outlets','Burger Joints','Sandwich & Snacks Corners','Juice Bars & Shakes Parlours','Ice Cream Parlours','Pubs & Bars'],
    'hotels': ['Resort', 'Motel', 'Hostel', 'Luxury Hotel', 'Boutique Hotel', 'Guest House', 'Bed & Breakfast', 'Lodge', 'Capsule Hotel', 'Other'],
    'hospitals': ['General Hospital', 'Multi-Speciality Hospitals', 'Children’s Hospital', 'Super-Speciality Hospitals', 'Private Hospital', 'Public Hospital', 'Government Hospitals','Maternity Hospitals','Women’s Hospitals','Eye Hospitals','ENT Hospitals','Dental Hospitals','Orthopedic Hospitals','Cancer Hospitals','Heart Cardiac Hospitals','Neurology Hospitals','Kidney Urology Hospitals','Gastroenterology Hospitals','Pulmonology Chest Hospitals','Skin & Cosmetic Hospitals','Psychiatric Hospitals','Rehabilitation & Physiotherapy Centers','Ayurveda Hospitals','Homeopathy Hospitals','Veterinary Hospitals','Emergency & Trauma Care Hospitals','Surgical Hospitals','Day Care Hospitals','Nursing Homes','Charitable Trust Hospitals'],
    'schools': ['Play Schools','Pre-Primary Schools','Primary School','Middle Schools', 'High School','Senior Secondary Schools','Government Schools','Private Schools', 'International School','CBSE Schools','ICSE Schools','IB International Baccalaureate Schools','IGCSE Cambridge Schools','Residential Boarding Schools','Montessori', 'Special Needs School'],
    'shopping': ['Malls & Shopping Complexes', 'Supermarkets', 'Grocery Stores', 'Kirana Shops', 'Clothing Stores', 'Apparel Boutiques','Footwear Stores','Jewellery Shops','Watch Showrooms','Eyewear & Optical Stores','Electronics Stores','Mobile Phone Stores','Home Appliance Stores','Furniture Stores','Home Décor & Furnishing Shops','Kitchenware Stores','Toy Stores','Bookstores & Stationery Shops','Gift Shops','Handicrafts & Souvenir Shops','Sports Goods Stores','Cosmetic & Beauty Stores','Perfume Shops','Pet Shops','Baby Product Stores'],
    'automotive': ['Car Dealers', 'Bike Dealers', 'Used Car Dealers', 'Used Bike Dealers', 'Car Repair & Service Centres', 'Bike Repair & Service Centres', 'Car Wash & Detailing','Car Accessories Shops','Bike Accessories Shops','Car Spare Parts Dealers','Bike Spare Parts Dealers','Tyre Shops','Battery Dealers','Car Insurance Providers','Bike Insurance Providers','Car Finance & Loan Providers','Bike Finance & Loan Providers','Car Rentals','Bike Rentals','Driving Schools','Vehicle Pollution Check Centres','Truck Dealers','Bus Dealers','Commercial Vehicle Service Centres','Auto Rickshaw Dealers & Services'],
    'beauty': ['Salons', 'Beauty Parlours', 'Unisex Salons', 'Ladies Beauty Parlours', 'Men’s Grooming Centres', 'Makeup Studios', 'Bridal Makeup Services', 'Hair Styling & Cutting', 'Hair Colouring Services','Nail Art & Nail Extensions','Skin Care Clinics','Facial & Cleanup Services','Waxing & Threading Services','Mehndi Artists','Tattoo Studios','Cosmetic Clinics Botox Fillers etc','Ayurvedic Beauty Centres','Herbal Beauty Clinics','Spa & Wellness Centres','Beauty Academies Training Institutes'],
    'fitness': ['Gyms', 'Unisex Gyms', 'Women’s Fitness Centres', 'Personal Training Studios', 'Yoga Centres', 'Pilates Studios', 'Zumba Classes', 'Aerobics Centres', 'CrossFit Training Centres', 'Martial Arts Training Karate Taekwondo Judo','Boxing Training Centres','Mixed Martial Arts Training','Dance Fitness Studios','Weight Loss Centres','Bodybuilding Gyms','Meditation & Wellness Centres','Online Fitness Classes','Fitness Equipment Stores','Sports & Athletic Training Centres'],
    'dentists': ['Orthodontist', 'Pediatric Dentist', 'Cosmetic Dentist', 'Oral Surgeon', 'Endodontist', 'Periodontist', 'Other'],
    'lawyers': ['Criminal Lawyer', 'Corporate Lawyer', 'Family Lawyer', 'Immigration Lawyer', 'Tax Lawyer', 'Intellectual Property Lawyer', 'Other'],
    'real estate': ['Residential Sales', 'Commercial Sales', 'Property Management', 'Real Estate Investment', 'Rental Agency', 'Other'],
    'banks': ['Commercial Bank', 'Investment Bank', 'Cooperative Bank', 'Credit Union', 'Online Bank', 'Other'],
    'pharmacies': ['Retail Pharmacy', 'Hospital Pharmacy', 'Compounding Pharmacy', 'Online Pharmacy', 'Other'],
    'petrol pumps': ['Petrol Station', 'Diesel Station', 'CNG Station', 'EV Charging Station', 'Other'],
    'pet services': ['Pet Grooming', 'Pet Boarding', 'Pet Training', 'Pet Sitting', 'Veterinary Clinic', 'Other'],
  };

  const handleClick = (subcategory: string) =>{
    const locationName = location?.replace(/\s+/g, '-');
    const categoryName = category?.replace(/\s+/g, '-');
    const subname = subcategory.replace(/\s+/g, '-');
    window.location.href = `/${locationName}/${categoryName}?subcategory=${subname}`;
  } 


  return (
    <div className='h-[99vh] w-[90%] mx-auto'>
      <h2 className='text-xl lg:ms-5 mt-5 font-bold'>Select Category</h2>
      { location ?
      <div className='flex mx-auto flex-wrap lg:justify-center w-full h-[90vh] overflow-y-auto lg:h-[80vh] lg:w-[100%] gap-5 mt-4'>
        {subcategories[category as keyof typeof subcategories].map((category, index)=> (
            <button key={index} onClick={()=>handleClick(category)} className='lg:w-64 w-44 text-start py-2 cursor-pointer hover:bg-[#ebebeb] rounded-md'>
                <p className='ms-3'>{category}</p>
            </button>
        ))}
      </div>
      : <div className='w-[90vw] h-[90vh] flex justify-center items-center text-xl '>Loading...</div>}
    </div>
  )
}

export default Subcategories
