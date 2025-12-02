"use client"
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Business, BusinessFormData } from '@/types'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Select from "react-select";
import { useTags } from '@/hooks/use-tags';
import { useRouter } from 'next/navigation'
import { categories } from '@/hooks/categories'
import { 
  Edit, 
  Trash2, 
  Eye, 
  X,
  Star,
  MapPin,
  Phone,
  Upload,
  Clock,
  Image as ImageIcon,
  Building2, 
  MessageSquare,
} from 'lucide-react';
import { generateSlug } from '@/hooks/generateSlug'

interface imageData {
  url: string;
  public_id: string;
}

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}
const UserDashboard = () => {
    const router = useRouter();
    const [businesses,setBusinesses] = useState<Business[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [is24x7, setIs24x7] = useState(false);
    const [message, setMessage] = useState('');
    const [loading,setloading] = useState(true);
    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const {user, setUser} = useAuth();
    const [stat,setStat] = useState('weekly');
    const [images, setImages] = useState<imageData[]>([]);
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

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    })
  
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

    const isLogin = async() => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      if (!response.data.success) {
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;
        router.push('/');

        if (status === 401) {
          // If there is *no token*, it means first-time visitor — no redirect.
          if (message === 'Please login to access this resource') {
            // Check if user was already logged in before
            if (user) {
              // User existed → this is a logout or expired session
              setUser(null);
              router.push('/');
            } else {
              router.push('/');
              // First-time visitor → silently ignore
              setUser(null);
            }
          }
        } else {
          router.push('/');
          console.error('Profile fetch failed:', message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
    }

      useEffect(()=>{
        isLogin();
      },[]);
    
      useEffect(()=>{
        setFormData({...formData, hours: openingHours});
      },[openingHours]);

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
        
        const removeImageFormForm = (index: number) => {
          setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index),
          }));
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

  const [id,setId] = useState('');

    const editBusiness = async() => {
      try{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/${id}`, formData,{withCredentials: true});
        if(response.status == 200){
          setIsSubmitting(false);
          setMessage('Business Edited successfully');
          getBusinesses();
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
    };

      useEffect(()=>{
        if(images.length > 0)
        {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...images], // merge old + new
          }));
        }
      },[images])

    
      useEffect(() => {
      if (formData.images.length > 0 && isSubmitting) {
        editBusiness();
      }
    }, [formData]);

      useEffect(()=>{
        if(!showAddModal){
          setImages([]);
          setFormData({
          name: '',
          description: '',
          category: '',
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
    
    const getBusinesses = async() => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/user/${user?._id}`,  { withCredentials: true });
            if(response.status == 200){
                setBusinesses(response.data.businesses);
                setloading(false);
            }
            else{
                setloading(false);
            }
        } catch {
            console.log("Server Error")
        }
    }

    const handleView = (business: Business) => {
        const locationPath = business.city.replace(/\s+/g, '-');
        const categoryPath = business.category.replace(/\s+/g, '-');
        const name = generateSlug(business.name);
        const id = name + '-' + business._id;
        const url = `/${locationPath}/${categoryPath}/${id}`;
        window.location.href = url;
    }

    const handleDelete = async(business: Business) => {
    try{
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/${business._id}`, {withCredentials: true});
      toast.success(response.data.message || 'Business deleted successfully!')
      getBusinesses();

    }catch(error){
      console.log(error);
      toast.error('Failed to delete business. Please try again.');
    }
  }

    const [isEditing, setIsEditing] = useState(false);
    const handleEditBusiness = (business: Business) => {
      console.log(business);
      setFormData({...formData,...business,});

      business.services.forEach((service)=>{
        addTag({ id: service.toLowerCase(), label: service });
      });

      setIsEditing(true);
      setShowAddModal(true);
    };

    useEffect(()=> {
      console.log("form data : ", formData);
    },[formData]);
  
  useEffect(()=>{
    if(user && user._id){
        getBusinesses();
        setUserData({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
    }
  },[user]);

  const handleProfileEdit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(showChangePassword){
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/changepassword`, {currPassword, newPassword}, {withCredentials: true});
        if(response.status === 200){
          setMessage(response.data.message);
          setNewPassword('');
          setCurrPassword('');
          setTimeout(()=>{
            setShowEditModal(false);
            setShowChangePassword(false);
          },1500);
        }
        else{
          setMessage("Current password is incorrect");
        }
      } catch(error){
        setMessage("Current password is incorrect");
       console.error(error);
      }
    }
    else{
      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me/update`, userData, {withCredentials:true});
        if(response.status == 200){
          toast.success('Profile Updated Successfully!');
          setUser(response.data.user);
          setShowEditModal(false);
        }
      } catch {
        console.error("Server Error");
      }
    }
  }

  const totalReviews = () => {
    let totalreviews = 0;
    businesses.forEach((business)=> {
      totalreviews += business.reviews;
    });
    return totalreviews;
  }


  function getAnalyticsSummary(business: Business, period = 'weekly') {
  const now = new Date();
  const filtered = business?.analytics?.dailyStats.filter((entry) => {
    const diffDays = (now.getTime() - new Date(entry.date).getTime()) / (1000 * 60 * 60 * 24);
    if (period === 'weekly') return diffDays <= 7;
    if (period === 'monthly') return diffDays <= 30;
    return true;
  });

  return filtered?.reduce(
    (acc: { calls: number; whatsapp: number; directions: number }, cur: { calls: number; whatsapp: number; directions: number }) => {
      acc.calls += cur.calls;
      acc.whatsapp += cur.whatsapp;
      acc.directions += cur.directions;
      return acc;
    },
    { calls: 0, whatsapp: 0, directions: 0 }
  );
}

const [analytics, setAnalytics] = useState<{ calls: number; whatsapp: number; directions: number }>({ calls: 0, whatsapp: 0, directions: 0 });

  useEffect(()=>{
    const initialStats = { calls: 0, whatsapp: 0, directions: 0 };
    businesses.forEach((business)=> {
      const stats = getAnalyticsSummary(business, stat);
      if (stats) {
        initialStats.calls += stats.calls;
        initialStats.whatsapp += stats.whatsapp;
        initialStats.directions += stats.directions;
      }
    });
    setAnalytics(initialStats);
  },[businesses, stat]);

      const [inputValue, setInputValue] = useState("");
      const { tags, setTags, addTag, removeTag, removeLastTag, hasReachedMax } = useTags({
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
  return (
    <div className='h-[135vh]  lg:h-[110vh]'>
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
    <div className='w-[87%] mx-auto'>
        <div className='flex items-center lg:flex-row flex-col-reverse gap-x-5 lg:gap-y-0 gap-y-3 mt-6 relative'>
          <div className='grid lg:grid-cols-4 grid-cols-2 lg:space-y-0 space-y-1 space-x-1'>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:w-64 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Businesses</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{businesses.length || 0}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg bg-green-500 flex-shrink-0 ml-3`}>
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:w-64 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Reviews</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{totalReviews()}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg bg-purple-500 flex-shrink-0 ml-3`}>
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:w-64 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Calls</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{analytics.calls}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg bg-blue-500 flex-shrink-0 ml-3`}>
                   <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:w-64 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">WhatsApp Messages</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{analytics.whatsapp}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg bg-green-500 flex-shrink-0 ml-3`}>
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center">
              </div>
            </div>
            </div>

            <div className="lg:absolute right-0 bg-white py-4 sm:p-6">
              <div className="flex flex-col gap-4 items-center justify-between">
                <button onClick={()=>setShowEditModal(true)} className={`p-2 flex sm:p-3 rounded-lg bg-blue-500 flex-shrink-0 ml-3`}>
                  <Edit className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-white mr-2" />
                  <p className='text-white'>Edit Profile</p>
                </button>
                <select onChange={(e)=>setStat(e.target.value)} className='border px-6 py-2 rounded-lg'>
                  <option value={'weekly'} >Weekly</option>
                  <option value={'monthly'} >Monthly</option>
                </select>
              </div>
            </div>
        </div>
    </div>

          {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 mx-auto w-[86vw] mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold text-gray-800">{totalCalls}</p>
            </div>
            <div className="p-2 lg:p-3 rounded-lg bg-blue-500">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Avg Duration: {formatDuration(avgCallDuration)}</p>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">WhatsApp Messages</p>
              <p className="text-2xl font-bold text-gray-800">{totalWhatsApp}</p>
            </div>
            <div className="p-2 lg:p-3 rounded-lg bg-green-500">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Avg Response: {avgResponseTime.toFixed(2)}min</p>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Direction Clicks</p>
              <p className="text-2xl font-bold text-gray-800">{totalDirectionClicks}</p>
            </div>
            <div className="p-2 lg:p-3 rounded-lg bg-purple-500">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Most Active: Mobile</p>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Interactions</p>
              <p className="text-2xl font-bold text-gray-800">{totalCalls + totalWhatsApp + totalDirectionClicks}</p>
            </div>
            <div className="p-2 lg:p-3 rounded-lg bg-orange-500">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">This week</p>
          </div>
        </div> */}
      </div>

    <h1 className='text-3xl mt-6 text-center font-semibold'>Your Businesses</h1>
    {/* Businesses Table */}
      <div className="bg-white rounded-xl mt-3 w-[89%] mx-auto shadow-sm border border-gray-200">
        <div className="overflow-x-auto overflow-y-auto max-h-[400px] hide-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className='h-16'>
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
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                  Promote Business
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {businesses.length > 0 && <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business._id} className="hover:bg-gray-50 h-28">
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
                        <p className="text-sm font-medium text-gray-900 truncate max-w-80 break-words whitespace-normal">{business.name}</p>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{`${business?.description?.slice(0,25)}...`}</div>
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
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        business.featured
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={business.featured ? 'Remove from Featured' : 'Add to Featured'}
                    >
                      <Star className={`w-3 h-3 mr-1 ${business.featured ? 'fill-current' : ''}`} />
                      {business.featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="text-center px-3 sm:px-6 py-4 whitespace-nowrap md:table-cell">
                    <button onClick={()=> {if(!business.featured){window.location.href = '/advertise'}}}
                      className={`mx-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        business.featured
                          ? 'text-green-800 bg-green-100'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                    {business.featured ? 'Promoted' : 'Promote'}
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
                      <button onClick={()=>handleView(business)} className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button onClick={()=>handleDelete(business)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
        {loading ? (
            <div className={`my-8`}>
            <p className='text-center text-2xl text-gray-600'>Loading...</p>
        </div>
        ) : (
        <div className={`my-8 ${businesses.length > 0 ? 'hidden' : 'block'}`}>
            <p className='text-center text-2xl text-gray-600'>You have not listed any business.</p>
        </div>
        )}
      </div>

          {/* Comprehensive Add Business Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-2 mx-auto  p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-gray-900">{`${isEditing ? "Edit Business" : "Add New Business"}`}</h3>
                <button
                  onClick={() => {setShowAddModal(false); setIsEditing(false); setUploadedImages([]); setImages([]); setTags([])}}
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

                  {/* {formData.category && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subcategory
                      </label>
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
                  )} */}

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
                        // checked={openingHours[key].closed}
                        checked={formData?.hours?.[key as string]?.closed ?? openingHours[key].closed}
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
                        // value={formData && formData.hours && formData?.hours?.[key]?.open || openingHours[key].open}
                        value={formData?.hours?.[key as string]?.open ?? openingHours[key].open}

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
                        // value={openingHours[key].close}
                        value={formData?.hours?.[key as string]?.close ?? openingHours[key].close}
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
                        checked={formData?.hours?.[key as string]?.closed ?? openingHours[key].closed}
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

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={file.url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-16 object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageFormForm(index)}
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
                  className="bg-[#0765F2] text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? isEditing ? 'Editing...' : 'Submitting...' : isEditing ? 'Edit Business' : 'Submit Business'}
                </button>
              </div>
            </form> 
            </div>
          </div>
        </div>
      )}


            {/* Add/Edit Post Modal */}
      {(showEditModal) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-4 sm:p-5 border w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {!showChangePassword ? 'Edit Profile' : 'Change Password'}
              </h3>
              <form onSubmit={handleProfileEdit} className="space-y-4">
                {!showChangePassword ? <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                  <input
                    type="text"
                    required
                    value={userData.name}
                    onChange={(e)=>setUserData({...userData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={userData.email}
                    onChange={(e)=>setUserData({...userData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">phone</label>
                  <input
                    type="tel"
                    required
                    value={userData.phone}
                    onChange={(e)=>setUserData({...userData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                {user?.authProvider == 'credentials' && (
                  <p onClick={()=> setShowChangePassword(true)} className='text-sm text-blue-600 cursor-pointer hover:underline'>Change Password</p>
                )}
                </> : (
                  <div className='flex flex-col'>
                    <label className='mt-4 text-sm'>Current Password</label>
                    <input type="password"
                      required
                      value={currPassword}
                      onChange={(e)=> setCurrPassword(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
                    />

                    <label className='mt-4 text-sm'>New Password</label>
                    <input type='password'
                      required
                      value={newPassword}
                      onChange={(e)=> setNewPassword(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
                    />
                    <div className={`${message == "Password has been Changed Successfully" ? 'text-green-600' : 'text-red-600'} mt-3 text-center`}>{message}</div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setShowChangePassword(false)}}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {!showChangePassword ? 'Update Profile' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default UserDashboard
