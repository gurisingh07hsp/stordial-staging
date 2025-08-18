'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Check,
  X,
  Star,
  MapPin,
  Phone,
  Upload,
  Clock,
  Image as ImageIcon,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { Business, BusinessFormData,} from '../../types';
import axios from 'axios';
import Select from "react-select";
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

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

export default function BusinessManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkImportFile, setBulkImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<Array<{
    name: string;
    description: string;
    category: string;
    subcategory: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    website: string;
    status: string;
  }>>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<string[]>([]);
    const [is24x7, setIs24x7] = useState(false);
    const [message, setMessage] = useState('');

    const [businesses, setBusinesses] = useState<Business[]>([]);


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

    const [id,setId] = useState('');

    const editBusiness = async() => {
      try{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/${id}`, formData,{withCredentials: true});
        if(response.status == 200){
          setIsSubmitting(false);
          setMessage('Business Edited successfully');
          setTimeout(() => {
            setShowAddModal(false);
            setIsEditing(false);
            setUploadedImages([]);
            setImages([]);
            setMessage('');
            setId('');
          }, 1000);
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

      const submitBusiness = async() => {
        try{
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/new`, formData,{withCredentials: true});
          if(response.status == 201){
            setIsSubmitting(false);
            setIsSubmit(false);
            setMessage('Business listing submitted successfully');
            setTimeout(()=>{
              setShowAddModal(false);
          },1000);
          }
        }catch(error){
          if (axios.isAxiosError(error)) {
            setIsSubmitting(false);
            setIsSubmit(false);
            setMessage('You must be logged in to submit a business listing')
          } else {
            setMessage('An unexpected error occurred');
          }
        }
      }

  const uploadimages = async() => {
    const formdata = new FormData();
    uploadedImages.forEach((file) => {
      formdata.append("files", file);
    });
    try{
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/uploadimages`, formdata);
      setImages(result.data.files);
      setUploadedImages([]);
    }catch(error){
      console.log(error);
    }
  }

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      formData.city = formData.city.toLowerCase();
      formData.category = formData.category.toLowerCase();
      if(isEditing){
        if(uploadedImages.length > 0)
        {
          uploadimages();
        }
        else{
          editBusiness();
        }
      }
      else{
        if(uploadedImages.length > 0)
        {
          uploadimages();
        }
        else{
        submitBusiness();
        }
      }
  };
  
  const [issubmit, setIsSubmit] = useState(false);
    useEffect(()=>{
      if(images.length > 0)
      {
        setFormData((prev) => ({
        ...prev,
        images: images,
      }));
      setIsSubmit(true);
      }
    },[images])
  
    useEffect(() => {
    if (issubmit) {
      if(isEditing)
      {
        editBusiness();
      }
      else{
        submitBusiness();
      }
    }
  }, [issubmit]);
  

  useEffect(()=>{
    if(!showAddModal){
      setImages([]);
      setFormData({
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
      hours: openingHours // or empty if you want {}
    });
    setId('');
    }
  },[showAddModal])

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
      'Speech Therapist','Dietitian Nutritionist',
    ];
  
  
    
  const subcategories = {
    'Restaurants': ['Coffee Shop', 'Fine Dining', 'Fast Food', 'Cafe', 'Bar', 'Pizza', 'Asian', 'Mexican', 'Italian', 'American', 'Other'],
    'Hotels': ['Resort', 'Motel', 'Hostel', 'Luxury Hotel', 'Boutique Hotel', 'Guest House', 'Bed & Breakfast', 'Lodge', 'Capsule Hotel', 'Other'],
    'Hospitals': ['General Hospital', 'Specialty Hospital', 'Children’s Hospital', 'Teaching Hospital', 'Private Hospital', 'Public Hospital', 'Other'],
    'Schools': ['Primary School', 'Secondary School', 'High School', 'International School', 'Boarding School', 'Montessori', 'Special Needs School', 'Other'],
    'Shopping': ['Malls', 'Department Stores', 'Boutiques', 'Street Markets', 'Online Stores', 'Other'],
    'Automotive': ['Car Showroom', 'Bike Showroom', 'Car Wash', 'Tire Shop', 'Auto Repair', 'Spare Parts Store', 'Other'],
    'Beauty': ['Hair Salon', 'Spa', 'Nail Salon', 'Barber Shop', 'Makeup Artist', 'Tanning', 'Tattoo', 'Piercing', 'Other'],
    'Spa': ['Day Spa', 'Medical Spa', 'Luxury Spa', 'Ayurvedic Spa', 'Thermal Spa', 'Other'],
    'Fitness': ['Gym', 'Yoga Studio', 'Personal Training', 'Swimming Pool', 'Dance Studio', 'Martial Arts', 'Pilates', 'CrossFit', 'Boxing', 'Other'],
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
    'Doctors': ['General Physician', 'Specialist', 'Surgeon', 'Family Doctor', 'Other'],
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
    'Dietitian Nutritionist': ['Weight Loss Programs', 'Clinical Nutrition', 'Sports Nutrition', 'Other']
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

  const statuses = ['All', 'Featured'];

const filteredBusinesses = businesses;

  const handleSelectAll = () => {
    if (selectedBusinesses.length === filteredBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(filteredBusinesses.map(b => b._id));
    }
  };

  const handleSelectBusiness = (id: string) => {
    setSelectedBusinesses(prev => 
      prev.includes(id) 
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };


  const handleDelete = async(business: Business) => {
    try{
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/${business._id}`, {withCredentials: true});
      toast.success(response.data.message || 'Business deleted successfully!')
      fetchBusinesses();

    }catch(error){
      console.log(error);
      toast.error('Failed to delete business. Please try again.');
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  const handleEditBusiness = (business: Business) => {
    setFormData({...formData, ...business});
    setIsEditing(true);
    setShowAddModal(true);

  };


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



  const handleBulkImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBulkImportFile(file);
      // Simulate CSV parsing - in real app, you'd use a CSV parser
      const mockPreview = [
        {
          name: 'Sample Business 1',
          description: 'A sample business for import',
          category: 'Restaurants',
          subcategory: 'Coffee Shop',
          phone: '+1 (555) 111-1111',
          email: 'sample1@example.com',
          address: '123 Sample St, City, State',
          city: 'Sample City',
          website: 'https://sample1.com',
          status: 'valid'
        },
        {
          name: 'Sample Business 2',
          description: 'Another sample business',
          category: 'Services',
          subcategory: 'Consulting',
          phone: '+1 (555) 222-2222',
          email: 'sample2@example.com',
          address: '456 Sample Ave, City, State',
          city: 'Sample City',
          website: 'https://sample2.com',
          status: 'valid'
        },
        {
          name: '',
          description: 'Invalid business - missing name',
          category: 'Retail',
          subcategory: 'Clothing',
          phone: '+1 (555) 333-3333',
          email: 'invalid@example.com',
          address: '789 Sample Blvd, City, State',
          city: 'Sample City',
          website: 'https://invalid.com',
          status: 'error'
        }
      ];
      setImportPreview(mockPreview);
    }
  };

  const handleBulkImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      alert(`Successfully imported ${importPreview.filter(item => item.status === 'valid').length} businesses!`);
      setShowBulkImportModal(false);
      setBulkImportFile(null);
      setImportPreview([]);
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = `name,description,category,subcategory,services,phone,email,address,city,website,image_url,monday_open,monday_close,monday_closed,tuesday_open,tuesday_close,tuesday_closed,wednesday_open,wednesday_close,wednesday_closed,thursday_open,thursday_close,thursday_closed,friday_open,friday_close,friday_closed,saturday_open,saturday_close,saturday_closed,sunday_open,sunday_close,sunday_closed
Sample Business,Description of the business,Restaurants,Coffee Shop,"Coffee, Pastries, Breakfast",+1 (555) 123-4567,business@example.com,123 Main St,New York,https://example.com,https://example.com/image.jpg,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,09:00,17:00,false,10:00,15:00,false,10:00,15:00,true
Tech Solutions,IT consulting and development services,Services,Consulting,"IT Consulting, Web Development, System Administration",+1 (555) 987-6543,contact@techsolutions.com,456 Tech Ave,San Francisco,https://techsolutions.com,https://techsolutions.com/image.jpg,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,09:00,18:00,false,10:00,16:00,false,00:00,00:00,true
Green Gardens,Landscaping and garden maintenance,Services,Cleaning,"Landscaping, Garden Maintenance, Tree Trimming",+1 (555) 456-7890,hello@greengardens.com,789 Garden Blvd,Los Angeles,https://greengardens.com,https://greengardens.com/image.jpg,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,08:00,17:00,false,09:00,14:00,false,00:00,00:00,true`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleToggleFeatured = async(businessId: string) => {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/admin/featured/${businessId}`, {}, {withCredentials: true} );
      console.log(response);

    setFeaturedBusinesses(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);


    const fetchBusinesses = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/?page=${page}
        &limit=5&search=${searchQuery}&category=${selectedCategory}&${selectedStatus.toLowerCase()}=${true}`);
      setBusinesses(response.data.businesses);
       setTotalPages(response.data.totalPages);
  };

    const handleDeleteSelected = async() => {
    for (let i = 0; i < selectedBusinesses.length; i++) {
  try {
    const id = selectedBusinesses[i];
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/${id}`,
      { withCredentials: true }
    );

    if (i === selectedBusinesses.length - 1) {
      toast.success(`${selectedBusinesses.length} Businesses Deleted Successfully` || response.data.message) // ✅ Last one
    }
  } catch (error) {
    console.log(error);
     toast.error('Failed to delete businesses. Please try again.');
  }
}
    setSelectedBusinesses([]);
    fetchBusinesses();
  };

  useEffect(() => {
    fetchBusinesses();
  }, [page, selectedCategory, searchQuery,selectedStatus]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 4000, // auto-close after 4s
    style: {
      borderRadius: '8px',
      background: '#333',
      color: '#fff',
    },
    success: {
      style: {
        background: 'green',
      },
    },
    error: {
      style: {
        background: 'red',
      },
    },
  }}
/>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Business Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage all business listings and their information</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setShowBulkImportModal(true)}
            className="flex items-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Bulk Import</span>
            <span className="sm:hidden">Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Add Business</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery }
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option>All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-xs sm:text-sm text-gray-600">
              {filteredBusinesses.length} businesses found
            </span>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBusinesses.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs sm:text-sm font-medium text-blue-800">
              {selectedBusinesses.length} businesses selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  selectedBusinesses.forEach(id => handleToggleFeatured(id));
                  setSelectedBusinesses([]);
                }}
                className="flex items-center px-2 sm:px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-xs sm:text-sm"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Toggle Featured</span>
                <span className="sm:hidden">Featured</span>
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center px-2 sm:px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </button>
              <button
                onClick={() => setSelectedBusinesses([])}
                className="flex items-center px-2 sm:px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Clear Selection</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Businesses Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBusinesses.length === filteredBusinesses.length && filteredBusinesses.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Rating
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Featured
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBusinesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedBusinesses.includes(business._id)}
                      onChange={() => handleSelectBusiness(business._id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                          src={business.images && business.images[0]?.url}
                          alt={business.name}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{business.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{`${business.description.slice(0,25)}...`}</div>
                        <div className="sm:hidden text-xs text-gray-500">
                          {business.category} • {business.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{business.city.charAt(0).toUpperCase() + business.city.slice(1)}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-900">{business.rating}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <button
                      onClick={() => handleToggleFeatured(business._id)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        featuredBusinesses.includes(business._id) || business.featured
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={featuredBusinesses.includes(business._id) || business.featured ? 'Remove from Featured' : 'Add to Featured'}
                    >
                      <Star className={`w-3 h-3 mr-1 ${featuredBusinesses.includes(business._id) || business.featured ? 'fill-current' : ''}`} />
                      {featuredBusinesses.includes(business._id) || business.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={() => {handleEditBusiness(business); setId(business._id)}}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button onClick={()=>handleDelete(business)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-3 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{filteredBusinesses.length}</span> of{' '}
            <span className="font-medium">{businesses.length}</span> results
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
            disabled={page === 1}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-blue-600 rounded-md">
              {page}
            </button>
            <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
            disabled={page === totalPages}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Add Business Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-2 mx-auto  p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">{`${isEditing ? "Edit Business" : "Add New Business"}`}</h3>
                <button
                  onClick={() => {setShowAddModal(false); setIsEditing(false); setUploadedImages([]); setImages([])}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
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
                      <select
                        value={formData.subcategory}
                        required
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories[formData.category as keyof typeof subcategories]?.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
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
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
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

              {message && <p className={`${message == 'Business listing submitted successfully' || message == 'Business Edited successfully' ? 'text-green-500' : 'text-red-500'} text-center font-bold`}>{message}</p>}

              {/* Submit Button */}
              <div className="flex justify-center py-4 ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? isEditing ? 'Editing...' : 'Submitting...' : isEditing ? 'Edit Business' : 'Submit Business'}
                </button>
              </div>
            </form> 
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 mx-auto p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">Bulk Import Businesses</h3>
                <button
                  onClick={() => setShowBulkImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* File Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Upload File
                  </h4>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="bulk-import-file" className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                        Choose CSV/Excel File
                      </label>
                      <input
                        id="bulk-import-file"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleBulkImportFile}
                        className="hidden"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum file size: 10MB
                    </p>
                  </div>

                  {bulkImportFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          File uploaded: {bulkImportFile.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Download */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Download className="w-4 h-4 mr-2 text-blue-600" />
                    Download Template
                  </h4>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-3">
                      Download our CSV template to ensure your file has the correct format and column headers.
                    </p>
                    <button
                      onClick={downloadTemplate}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </button>
                  </div>
                </div>

                {/* Import Preview */}
                {importPreview.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Import Preview</h4>
                    
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Business Name
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                City
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {importPreview.map((item, index) => (
                              <tr key={index} className={item.status === 'error' ? 'bg-red-50' : ''}>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    item.status === 'valid' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {item.status === 'valid' ? 'Valid' : 'Error'}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.name || <span className="text-red-600">Missing name</span>}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.category}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.city}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                  {item.email}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Valid entries: {importPreview.filter(item => item.status === 'valid').length}
                      </span>
                      <span>
                        Errors: {importPreview.filter(item => item.status === 'error').length}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowBulkImportModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkImport}
                    disabled={!bulkImportFile || isImporting}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isImporting ? 'Importing...' : 'Import Businesses'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 