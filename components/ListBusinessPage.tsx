'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BusinessFormData, Business, User } from '../types';
import { ArrowLeft, Upload, Clock, MapPin, Phone, Image as ImageIcon, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Select from "react-select";
import { useTags } from '@/hooks/use-tags';

interface ListBusinessPageProps {
  onBack: () => void;
  allBusinesses: Business[];
  onBusinessClick: (business: Business) => void;
  onMenuToggle: () => void;
  onAuthClick: () => void;
  onListBusinessClick: () => void;
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface imageData {
  url: string;
  public_id: string;
}

export default function ListBusinessPage({
  onBack
}: ListBusinessPageProps) {

    const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '10:00', close: '15:00', closed: false },
    sunday: { open: '10:00', close: '15:00', closed: false },
    "24x7": { open: '10:00', close: '15:00', closed: false },
  });

  
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [images, setImages] = useState<imageData[]>([]);
  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    services: [],
    phone: '',
    email: '',
    address: '',
    city: '',
    website: '',
    images: images,
    hours: openingHours
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [is24x7, setIs24x7] = useState(false);

   const { user} = useAuth();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    let selectedfiles = files;
    if(files.length > 4)
    {
      selectedfiles = files.slice(0,4);
    }
    selectedfiles.forEach((file)=>{
      setUploadedImages((prev) => {
        if (prev.length < 4) {
          return [...prev, file];
        }
        return prev; // do not add if already 4
  });
    })
  };
  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const submitBusiness = async() => {
    formData.city = formData.city.toLowerCase();
    formData.category = formData.category.toLowerCase();

      try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/new`, formData,{withCredentials: true});
        if(response.status == 201){
          setIsSubmitting(false);
          setMessage('Business listing submitted successfully');
          setTimeout(()=>{
            onBack();
        },1000);
        }
      }catch(error){
      if (axios.isAxiosError(error)) {
    setIsSubmitting(false);
    setMessage('You must be logged in to submit a business listing')
  } else {
    setMessage('An unexpected error occurred');
  }
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

      if(uploadedImages.length > 0)
      {
        const formdata = new FormData();
        // Suppose uploadedImages is an array of File objects
        uploadedImages.forEach((file) => {
          formdata.append("files", file); // all files under "files" field
        });
        try{
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/uploadimages`, formdata);
        setImages(result.data.files);
        }catch(error){
          console.log(error);
        }
      }
      else{
        submitBusiness();
      }

  };


  useEffect(()=>{
    if(images.length > 0)
    {
      setFormData((prev) => ({
      ...prev,
      images: images,
    }));
    }
  },[images])

  useEffect(() => {
  if (formData.images.length > 0) {
    submitBusiness();
  }
}, [formData]);

  const categories: string[] = ['Restaurants','Hotels','Hospitals','Schools','Shopping','Automotive','Beauty','Spa',
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
    'Gastroenterologist','Pulmonologist Chest Specialist','Oncologist Cancer Specialist','Endocrinologist',
    'Rheumatologist','Surgeon General','Plastic Surgeon','Physiotherapist','Homeopathy Doctor','Ayurvedic Doctor',
    'Unani Doctor','Sexologist','Immunologist','Geriatric Specialist Elderly Care','Occupational Therapist',
    'Speech Therapist','Dietitian Nutritionist','ATM','Other'
  ];


  
const subcategories = {
  'Restaurants': ['Fine Dining Restaurants', 'Cafes', 'Fast Food Outlets', 'Food Courts', 'Bakeries & Confectioneries', 'Sweet Shops', 'Buffet Restaurants', 'Multi-Cuisine Restaurants', 'North Indian Restaurants', 'South Indian Restaurants','Chinese Restaurants','Punjabi Dhabas','Seafood Restaurants','Barbeque & Grill Restaurants','Biryani Outlets','Pizza Outlets','Burger Joints','Sandwich & Snacks Corners','Juice Bars & Shakes Parlours','Ice Cream Parlours','Pubs & Bars'],
  'Hotels': ['Resort', 'Motel', 'Hostel', 'Luxury Hotel', 'Boutique Hotel', 'Guest House', 'Bed & Breakfast', 'Lodge', 'Capsule Hotel', 'Other'],
  'Hospitals': ['Multi-Speciality Hospitals', 'Children’s Hospital', 'Super-Speciality Hospitals', 'Private Hospital','Government Hospitals','Maternity Hospitals','Women’s Hospitals','Eye Hospitals','ENT Hospitals','Orthopedic Hospitals','Cancer Hospitals','Heart Cardiac Hospitals','Neurology Hospitals','Kidney Urology Hospitals','Gastroenterology Hospitals','Pulmonology Chest Hospitals','Skin & Cosmetic Hospitals','Psychiatric Hospitals','Rehabilitation & Physiotherapy Centers','Ayurveda Hospitals','Homeopathy Hospitals','Veterinary Hospitals','Emergency & Trauma Care Hospitals','Day Care Hospitals','Nursing Homes','Charitable Trust Hospitals'],
  'Schools': ['Play Schools','Pre-Primary Schools','Primary School','Middle Schools', 'High School','Senior Secondary Schools','Government Schools','Private Schools', 'International School','CBSE Schools','ICSE Schools','IB International Baccalaureate Schools','IGCSE Cambridge Schools','Residential Boarding Schools','Montessori', 'Special Needs School'],
  'Shopping': ['Malls & Shopping Complexes', 'Supermarkets', 'Grocery Stores', 'Kirana Shops', 'Clothing Stores', 'Apparel Boutiques','Footwear Stores','Jewellery Shops','Watch Showrooms','Eyewear & Optical Stores','Electronics Stores','Mobile Phone Stores','Home Appliance Stores','Furniture Stores','Home Décor & Furnishing Shops','Kitchenware Stores','Toy Stores','Bookstores & Stationery Shops','Gift Shops','Handicrafts & Souvenir Shops','Sports Goods Stores','Cosmetic & Beauty Stores','Perfume Shops','Pet Shops','Baby Product Stores'],
  'Automotive': ['Car Dealers', 'Bike Dealers', 'Used Car Dealers', 'Used Bike Dealers', 'Car Repair & Service Centres', 'Bike Repair & Service Centres', 'Car Wash & Detailing','Car Accessories Shops','Bike Accessories Shops','Car Spare Parts Dealers','Bike Spare Parts Dealers','Tyre Shops','Battery Dealers','Car Insurance Providers','Bike Insurance Providers','Car Finance & Loan Providers','Bike Finance & Loan Providers','Car Rentals','Bike Rentals','Driving Schools','Vehicle Pollution Check Centres','Truck Dealers','Bus Dealers','Commercial Vehicle Service Centres','Auto Rickshaw Dealers & Services'],
  'Beauty': ['Salons', 'Beauty Parlours', 'Unisex Salons', 'Ladies Beauty Parlours', 'Men’s Grooming Centres', 'Makeup Studios', 'Bridal Makeup Services', 'Hair Styling & Cutting', 'Hair Colouring Services','Nail Art & Nail Extensions','Skin Care Clinics','Facial & Cleanup Services','Waxing & Threading Services','Mehndi Artists','Tattoo Studios','Cosmetic Clinics Botox Fillers etc','Ayurvedic Beauty Centres','Herbal Beauty Clinics','Spa & Wellness Centres','Beauty Academies Training Institutes'],
  'Spa': ['Day Spa', 'Medical Spa', 'Luxury Spa', 'Ayurvedic Spa', 'Thermal Spa', 'Other'],
  'Fitness': ['Gyms', 'Unisex Gyms', 'Women’s Fitness Centres', 'Personal Training Studios', 'Yoga Centres', 'Pilates Studios', 'Zumba Classes', 'Aerobics Centres', 'CrossFit Training Centres', 'Martial Arts Training Karate Taekwondo Judo','Boxing Training Centres','Mixed Martial Arts Training','Dance Fitness Studios','Weight Loss Centres','Bodybuilding Gyms','Meditation & Wellness Centres','Online Fitness Classes','Fitness Equipment Stores','Sports & Athletic Training Centres'],
  'Dentists': ['Orthodontist', 'Pediatric Dentist', 'Cosmetic Dentist', 'Oral Surgeon', 'Endodontist', 'Periodontist', 'Other'],
  'Lawyers': ['Criminal Lawyer', 'Corporate Lawyer', 'Family Lawyer', 'Immigration Lawyer', 'Tax Lawyer', 'Intellectual Property Lawyer', 'Other'],
  'Real Estate': ['Residential Sales', 'Commercial Sales', 'Property Management', 'Real Estate Investment', 'Rental Agency', 'Other'],
  'Banks': ['Commercial Bank', 'Investment Bank', 'Cooperative Bank', 'Credit Union', 'Online Bank', 'Other'],
  'Pharmacies': ['Retail Pharmacy', 'Hospital Pharmacy', 'Compounding Pharmacy', 'Online Pharmacy', 'Other'],
  'Petrol Pumps': ['Petrol Station', 'Diesel Station', 'CNG Station', 'EV Charging Station', 'Other'],
  'Pet Services': ['Pet Grooming', 'Pet Boarding', 'Pet Training', 'Pet Sitting', 'Veterinary Clinic', 'Other'],
  'Home Services': ['Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Pest Control', 'Home Renovation', 'Landscaping', 'Other'],
  'Coaching Centres': ['Exam Coaching', 'Language Coaching', 'Skill Development', 'Career Counseling', 'Other'],
  'Tuition Classes': ['Math Tuition', 'Science Tuition', 'Language Tuition', 'Test Preparation', 'Other'],
  'Colleges': ['Engineering College', 'Medical College', 'Arts College', 'Commerce College', 'Community College', 'Other'],
  'Universities': ['Public University', 'Private University', 'Technical University', 'Open University', 'Other'],
  'Government Offices': ['Municipal Office', 'Tax Office', 'Passport Office', 'Labor Office', 'Transport Office', 'Other'],
  'Travel Agencies': ['Domestic Travel', 'International Travel', 'Cruise Booking', 'Adventure Travel', 'Honeymoon Packages', 'Other'],
  'Tour Operators': ['Guided Tours', 'Adventure Tours', 'Cultural Tours', 'Wildlife Tours', 'Pilgrimage Tours', 'Other'],
  'Courier Services': ['Domestic Courier', 'International Courier', 'Same-Day Delivery', 'Logistics Services', 'Other'],
  'Logistics Services': ['Freight Forwarding', 'Warehousing', 'Transportation', 'Customs Clearance', 'Supply Chain Management', 'Other'],
  'Event Management': ['Corporate Events', 'Weddings', 'Concerts', 'Festivals', 'Private Parties', 'Other'],
  'Party Services': ['Party Planning', 'Event Decor', 'Catering', 'Entertainment', 'Photography', 'Other'],
  'Wedding Services': ['Wedding Planning', 'Bridal Makeup', 'Photography', 'Venue Booking', 'Catering', 'Other'],
  'Banquet Halls': ['Wedding Halls', 'Conference Halls', 'Party Halls', 'Banquet Facilities', 'Other'],
  'Caterers': ['Wedding Catering', 'Corporate Catering', 'Buffet Catering', 'Specialty Cuisine Catering', 'Other'],
  'Photographers': ['Wedding Photographer', 'Event Photographer', 'Portrait Photographer', 'Product Photographer', 'Other'],
  'Doctors': ['Pediatrician', 'Cardiologist', 'Dermatologist', 'Gynecologist Obstetrician', 'Orthopedic Doctor','Dentist','Neurologist','Psychiatrist','ENT Specialist Ear Nose Throat','Ophthalmologist Eye Specialist','Neurologist','Psychiatrist','Urologist','Nephrologist','Gastroenterologist','Endocrinologist','Rheumatologist','Surgeon','Plastic Surgeon','Physiotherapist','Homeopathy Doctor','Ayurvedic Doctor','Unani Doctor','Sexologist','Immunologist','Occupational Therapist','Speech Therapist'],
  'Clinics': ['Medical Clinic', 'Dental Clinic', 'Wellness Clinic', 'Physiotherapy Clinic', 'Other'],
  'Diagnostic Centres': ['Pathology Lab', 'Radiology Centre', 'Blood Test Centre', 'Health Check-up Centre', 'Other'],
  'Labs': ['Medical Lab', 'Research Lab', 'Industrial Lab', 'Testing Lab', 'Other'],
  'Repair Services': ['Appliance Repair', 'Electronics Repair', 'Furniture Repair', 'Watch Repair', 'Other'],
  'Maintenance Services': ['Building Maintenance', 'Garden Maintenance', 'Equipment Maintenance', 'Other'],
  'Grocery Stores': ['Supermarket', 'Mini-Mart', 'Organic Store', 'Discount Store', 'Other'],
  'Supermarkets': ['Hypermarket', 'Neighborhood Store', 'Discount Supermarket', 'Other'],
  'Sweet Shops': ['Traditional Sweets', 'Chocolate Shops', 'Bakery Sweets', 'Ice Cream Parlors', 'Other'],
  'Bakeries': ['Cake Shop', 'Pastry Shop', 'Bread Shop', 'Artisan Bakery', 'Other'],
  'Clothing Stores': ['Men’s Wear', 'Women’s Wear', 'Children’s Wear', 'Ethnic Wear', 'Sportswear', 'Other'],
  'Apparel Stores': ['Casual Wear', 'Formal Wear', 'Outdoor Wear', 'Undergarments', 'Other'],
  'Mobile Stores': ['Smartphones', 'Feature Phones', 'Mobile Accessories', 'Repairs', 'Other'],
  'Electronics Stores': ['TV & Home Appliances', 'Computers', 'Gaming Consoles', 'Audio Equipment', 'Other'],
  'Cyber Cafes': ['Gaming Cafe', 'Internet Access', 'Printing', 'Scanning', 'Other'],
  'Printing Services': ['Digital Printing', 'Offset Printing', 'Screen Printing', '3D Printing', 'Other'],
  'Temples': ['Hindu Temple', 'Jain Temple', 'Buddhist Temple', 'Other'],
  'Gurudwaras': ['Main Gurudwara', 'Community Gurudwara', 'Other'],
  'Churches': ['Catholic Church', 'Protestant Church', 'Orthodox Church', 'Other'],
  'Mosques': ['Sunni Mosque', 'Shia Mosque', 'Community Mosque', 'Other'],
  'NGOs': ['Educational NGO', 'Healthcare NGO', 'Environmental NGO', 'Animal Welfare NGO', 'Other'],
  'Charitable Organizations': ['Orphanages', 'Food Banks', 'Shelters', 'Other'],
  'Public Transport Services': ['Bus Service', 'Metro Service', 'Taxi Service', 'Ride Sharing', 'Other'],
  'Bus Services': ['Local Bus', 'Intercity Bus', 'Tourist Bus', 'Other'],
  'Taxi Services': ['City Taxi', 'Outstation Taxi', 'Airport Taxi', 'Other'],
  'Auto Services': ['Auto Rickshaw', 'E-Rickshaw', 'Shared Auto', 'Other'],
  'Metro Services': ['City Metro', 'Suburban Metro', 'Other'],
  'Driving Schools': ['Car Driving', 'Bike Driving', 'Commercial Vehicle Training', 'Other'],
  'Car Rentals': ['Self-Drive Cars', 'Chauffeur Cars', 'Luxury Car Rentals', 'Other'],
  'Bike Rentals': ['Scooter Rentals', 'Motorbike Rentals', 'Electric Bike Rentals', 'Other'],
  'Agricultural Services': ['Farming Equipment', 'Crop Consultancy', 'Seed Supply', 'Other'],
  'Equipment Dealers': ['Construction Equipment', 'Agricultural Equipment', 'Industrial Equipment', 'Other'],
  'Hardware Stores': ['Construction Hardware', 'Tools', 'Plumbing Supplies', 'Electrical Supplies', 'Other'],
  'Building Material Suppliers': ['Cement', 'Steel', 'Bricks', 'Wood', 'Other'],
  'Cement Dealers': ['Portland Cement', 'White Cement', 'Ready Mix Cement', 'Other'],
  'AC Dealers': ['Window AC', 'Split AC', 'Portable AC', 'Central AC', 'Other'],
  'AC Repair Services': ['AC Gas Filling', 'AC Maintenance', 'AC Part Replacement', 'Other'],
  'AC Installation Services': ['Window AC Installation', 'Split AC Installation', 'Central AC Setup', 'Other'],
  'General Physician': ['Family Doctor', 'Internal Medicine', 'Preventive Care', 'Other'],
  'Pediatrician': ['Newborn Care', 'Child Vaccination', 'Child Nutrition', 'Other'],
  'Cardiologist': ['Heart Surgery', 'Heart Check-up', 'Other'],
  'Dermatologist': ['Skin Care', 'Cosmetic Dermatology', 'Laser Treatment', 'Other'],
  'Gynecologist Obstetrician': ['Pregnancy Care', 'Infertility Treatment', 'Gynecological Surgery', 'Other'],
  'Orthopedic Doctor': ['Joint Replacement', 'Fracture Treatment', 'Sports Injury', 'Other'],
  'ENT Specialist Ear Nose Throat': ['Hearing Care', 'Sinus Treatment', 'Throat Surgery', 'Other'],
  'Ophthalmologist Eye Specialist': ['Cataract Surgery', 'Lasik', 'Glaucoma Treatment', 'Other'],
  'Dentist': ['General Dentistry', 'Orthodontics', 'Cosmetic Dentistry', 'Other'],
  'Neurologist': ['Brain Surgery', 'Stroke Care', 'Epilepsy Treatment', 'Other'],
  'Psychiatrist': ['Therapy', 'Medication Management', 'Addiction Treatment', 'Other'],
  'Urologist': ['Kidney Stone Treatment', 'Urinary Tract Care', 'Other'],
  'Nephrologist': ['Dialysis', 'Kidney Transplant', 'Other'],
  'Gastroenterologist': ['Endoscopy', 'Liver Care', 'Digestive Disorder Treatment', 'Other'],
  'Pulmonologist Chest Specialist': ['Asthma Care', 'COPD Treatment', 'Other'],
  'Oncologist Cancer Specialist': ['Chemotherapy', 'Radiation Therapy', 'Cancer Surgery', 'Other'],
  'Endocrinologist': ['Diabetes Care', 'Hormone Therapy', 'Other'],
  'Rheumatologist': ['Arthritis Treatment', 'Autoimmune Disease Care', 'Other'],
  'Surgeon General': ['Appendectomy', 'Hernia Repair', 'Other'],
  'Plastic Surgeon': ['Cosmetic Surgery', 'Reconstructive Surgery', 'Other'],
  'Physiotherapist': ['Sports Injury Rehab', 'Post-Surgery Rehab', 'Pain Management', 'Other'],
  'Homeopathy Doctor': ['Classical Homeopathy', 'Acute Illness Care', 'Other'],
  'Ayurvedic Doctor': ['Panchakarma', 'Herbal Medicine', 'Other'],
  'Unani Doctor': ['Herbal Treatments', 'Massage Therapy', 'Other'],
  'Sexologist': ['Male Sexual Health', 'Female Sexual Health', 'Other'],
  'Immunologist': ['Allergy Testing', 'Immune Disorder Care', 'Other'],
  'Geriatric Specialist Elderly Care': ['Elderly Rehab', 'Chronic Illness Management', 'Other'],
  'Occupational Therapist': ['Workplace Injury Care', 'Hand Therapy', 'Other'],
  'Speech Therapist': ['Speech Delay Therapy', 'Voice Therapy', 'Other'],
  'Dietitian Nutritionist': ['Weight Loss Programs', 'Clinical Nutrition', 'Sports Nutrition', 'Other'],
  'ATM': ['SBI Bank ATM', 'PNB Bank ATM', 'Indian Bank ATM', 'HDFC Bank ATM', 'ICIC Bank ATM', 'Axis Bank ATM', 'Punjab and Sind Bank ATM','Bank of Baroda ATM', 'Bank of India ATM', 'Union Bank of India ATM','Canara Bank ATM', 'Bank of Maharashtra ATM','Central Bank of India ATM','Indian Overseas Bank ATM', 'Indian Bank ATM', 'UCO Bank ATM', 'Other'],
  'Other': ['Other']
};

const categoryOptions = categories.map(cat => ({
  value: cat,
  label: cat
}));

  const days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' },
    { key: '24x7', label: 'Open 24x7' }
  ];

  useEffect(()=>{
    setFormData({...formData, hours: openingHours});
  },[openingHours]);


  const [inputValue, setInputValue] = useState("");
  const { tags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
    maxTags: 30,
    onChange: (tags) => console.log("Tags updated:", tags),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      removeLastTag();
    }
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag({ id: inputValue.toLowerCase(), label: inputValue });
      setInputValue("");
    }
  };

  useEffect(()=>{
    setFormData({...formData, services: tags.map((e)=> e.label)});
  },[tags]);

  if(!user){
    return(
      <div className='flex justify-center item-center h-[400px]'>
        <p className='my-auto text-2xl lg:text-3xl font-bold'>Please Login to List the Business</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">List Your Business</h2>
              <p className="text-gray-600 text-sm">Share your business with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Business Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter business name"
                    />
                  </div>
                  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category *
      </label>
      <Select
        options={categoryOptions}
        required
        value={categoryOptions.find(opt => opt.value === formData.category) || null}
        onChange={(selected) => setFormData({
          ...formData,
          category: selected?.value || "",
        })}
        placeholder="Select Category"
        isSearchable
        menuPlacement="auto" // auto-detects space but prefers bottom
        className="text-sm"
      />
    </div>

                  {formData.category && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory
                      </label>
                      {/* <select
                        value={formData.subcategory}
                        required
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories[formData.category as keyof typeof subcategories]?.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select> */}
                      <Select
                        options={subcategories[formData.category as keyof typeof subcategories]?.map(
                          (sub) => ({ value: sub, label: sub })
                        )}
                        value={
                          formData.subcategory
                            ? { value: formData.subcategory, label: formData.subcategory }
                            : null
                        }
                        onChange={(e) =>
                          setFormData({ ...formData, subcategory: e ? e.value : "" })
                        }
                        placeholder="Select Subcategory"
                        menuPlacement="bottom"
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your business..."
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  Contact Info
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="business@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Business Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City Name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.yourbusiness.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
              <label className="text-sm font-medium">Amenities</label>
              <div className="rounded-lg border border-input bg-background p-1">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm ${tag.color || "bg-primary/10 text-primary"}`}
                  >
                    {tag.label}
                    <button
                      onClick={() => removeTag(tag.id)}
                      className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={hasReachedMax ? "Max amenities reached" : "Add Amenities..."}
                  disabled={hasReachedMax}
                  className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>
            </div>
            </div>




                              {/* Opening Hours */}
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                  Opening Hours
                                </h4>
                                
                                <div className="grid gap-3">
                                  {days.map(({ key, label }) => (
                                    <div key={key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                      <div className="w-10 lg:w-16 text-sm font-medium text-gray-700">
                                        {label}
                                      </div>
                                      {key == "24x7" ? (
                                        <label className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={openingHours[key].closed}
                                          onChange={()=> {setIs24x7(!is24x7); setOpeningHours({
                                            ...openingHours,
                                            [key]: { ...openingHours[key], closed: !is24x7 }
                                          })}}
                                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        {/* <span className="text-sm text-gray-700">Open 24X7</span> */}
                                      </label>
                                      ):(
                                        <>
                                        <div className="flex flex-col lg:flex-row items-center space-x-2">
                                        <input
                                          type="time"
                                          value={openingHours[key].open}
                                          onChange={(e) => setOpeningHours({
                                            ...openingHours,
                                            [key]: { ...openingHours[key], open: e.target.value, }
                                          })}
                                          disabled={openingHours[key].closed}
                                          className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-200"
                                        />
                                        <div>
                                          <span className="text-gray-500">to</span>
                                        </div>
                                        <input
                                          type="time"
                                          value={openingHours[key].close}
                                          onChange={(e) => setOpeningHours({
                                            ...openingHours,
                                            [key]: { ...openingHours[key], close: e.target.value }
                                          })}
                                          disabled={openingHours[key].closed}
                                          className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-200"
                                        />
                                      </div>
                                      {!is24x7 &&
                                      <label className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={openingHours[key].closed}
                                          onChange={(e) =>
          setOpeningHours((prev) => ({
            ...prev,
            [key]: { ...prev[key],closed: e.target.checked }
          }))
        }
                                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Closed</span>
                                      </label>}
                                      </>
                                      )}
                                      

                                    </div>
                                  ))}
                                </div>
                              </div>

              {/* Media Upload - Compact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                  Images
                </h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Upload Business Images
                    </div>
                    <div className="text-xs text-gray-500">
                      Click to browse or drag images here
                    </div>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-16 object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {message && <p className={`${message == 'Business listing submitted successfully' ? 'text-green-500' : 'text-red-500'} text-center font-bold`}>{message}</p>}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0765F2] text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Business Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 