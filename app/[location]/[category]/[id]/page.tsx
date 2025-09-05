'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Globe, 
  MessageSquare,
  ArrowLeft,
  // Share2,
  X,
  Camera,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Award,
  CheckCircle,
  User
} from 'lucide-react';
import Link from 'next/link';
import { Business } from '../../../../types';
import axios, { AxiosError } from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useAuth } from '@/contexts/AuthContext';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast';


interface BusinessPageProps {
  params: {
    location: string;
    category: string;
    id: string;
  };
}

interface Reviews {
  user: {_id: string, name: string, avatar: string};
  rating: number;
  comment: string;
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const {user} = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [business, setBusiness] = useState<Business | null>(null);
  const [noBusiness, setNoBusiness] = useState(false);
  const [similarBusinesses, setSimilarBusinesses] = useState<Business[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [showReview, setshowReview] = useState(false);
  const [comment,setComment] = useState('');


  const decodedLocation = decodeURIComponent(params.location.replace(/-/g, ' '));
  const decodedCategory = decodeURIComponent(params.category.replace(/-/g, ' '));
  const decodedId = decodeURIComponent(params.id);

  useEffect(()=>{
    if(user && reviews){
      reviews.forEach(e => {
        if(e.user._id === user._id){
          setSelected(e.rating);
        }
      });
    }
    else{
      setSelected(0);
    }
  },[user, reviews,showReview])


  const getSimilarBusinesses = async() => {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${decodedLocation}/category/${decodedCategory}`, {withCredentials: true});
        if(response.status == 200){
          setSimilarBusinesses(response.data.businesses.slice(0,3));
        }
      }catch(error){
        console.error('Error fetching businesses: ', error);
      }
  }

  const getReviews = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews/${decodedId}`);
      if(response.status === 200){
        setReviews(response.data.reviews);
      }
    }catch{
      console.error("error");
    }
  }

  useEffect(() => {
    const getBusinessByName = async () => {
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${decodedLocation}/category/${decodedCategory}/id/${decodedId}`, {withCredentials: true});
        if(response.status == 200){
          setBusiness(response.data.business);
        }
        else{
          setNoBusiness(true);
        }

      }catch(error){
        console.log('Error fetching business: ', error);
        setNoBusiness(true);
      }
    }
    getBusinessByName();
    getReviews();
    getSimilarBusinesses();
  }, [decodedId])
  
  if (!business) {
    return (
      <>
      {noBusiness ? 
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Not Found</h1>
                          <p className="text-gray-600 mb-6">
                  This business in {decodedCategory} category in {decodedLocation} could not be found.
                </p>
          <div className="space-y-3">
            <Link 
              href={`/${decodedLocation.toLowerCase().replace(/\s+/g, '-')}/${decodedCategory.toLowerCase().replace(/\s+/g, '-')}`}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Browse {decodedCategory} in {decodedLocation}
            </Link>
            <Link 
              href="/" 
              className="block bg-gray-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
  : (
    <div className='h-[100vh] w-[99vw] flex justify-center items-center'>
      <p className='text-2xl'>Loding...</p>
    </div>
  )}
      </>
    );
  }

  const formatHours = (hours: { [key: string]: { open: string; close: string; closed: boolean } } | undefined) => {
    if (!hours) return null;

    if(hours['24x7'].closed)
    {
      return <div className="flex justify-between py-1"><span>24X7</span><span className="text-green-500">Open</span></div>
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days.map(day => {
      const dayHours = hours[day];
      if (!dayHours) return null;
      
      const dayName = day.charAt(0).toUpperCase() + day.slice(1);
      if (dayHours.closed) {
        return <div key={day} className="flex justify-between py-1"><span>{dayName}</span><span className="text-red-500">Closed</span></div>;
      }
      return <div key={day} className="flex justify-between py-1"><span>{dayName}</span><span>{dayHours.open} - {dayHours.close}</span></div>;
    }).filter(Boolean);
  };

  const formatBusinessUrl = (business: { _id: string; name: string; category: string; city: string }) => {
    const location = business.city.toLowerCase().replace(/\s+/g, '-');
    const category = business.category.toLowerCase().replace(/\s+/g, '-');
    const name = business.name.replace(/\s+/g, '-');
    return `/${location}/${category}/${name}`;
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && business.images && business.images.length > 1) {
      setSelectedImageIndex((selectedImageIndex + 1) % business.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && business.images && business.images.length > 1) {
      setSelectedImageIndex(selectedImageIndex === 0 ? business.images.length - 1 : selectedImageIndex - 1);
    }
  };

  const shouldShowMenu = (business: Business) => {
    const foodCategories = ['restaurants', 'cafes', 'bars', 'hotels', 'resorts', 'catering'];
    const foodSubcategories = ['Coffee Shop', 'Bakery', 'Pizzeria', 'Sushi', 'Italian', 'Mexican', 'Chinese', 'Indian', 'Thai', 'American', 'French', 'Japanese', 'Korean', 'Mediterranean', 'Seafood', 'Steakhouse', 'BBQ', 'Food Truck', 'Deli', 'Ice Cream', 'Dessert'];
    
    return foodCategories.includes(business.category) || 
           foodSubcategories.includes(business.subcategory);
  };



  const stars = [1, 2, 3, 4, 5];

  const giveRating = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(selected, comment);
      try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews/new`,
      {
        selected,
        comment,
        business,
      },
      { withCredentials: true }
    );
    if(response.status == 200){
      console.log("✅ Review submitted:", response.data);
      setshowReview(false);
    }

  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    console.error("❌ Review error:", error);
  }
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
      {/* Breadcrumbs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/${decodedLocation}`} className="hover:text-blue-600 transition-colors capitalize">{decodedLocation}</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/${decodedLocation}/${decodedCategory}`} className="hover:text-blue-600 transition-colors capitalize">{decodedCategory}</Link>
            <span className="text-gray-400">›</span>
            {/* <span className="text-gray-800 font-medium capitalize">{decodedName}</span> */}
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="hidden lg:block container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Link>
      </div>

      <div className="container mx-auto mt-2 lg:mt-0 px-4 pb-12">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Image Gallery */}
          <div className="relative h-60 lg:h-[350px] bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="grid lg:grid-cols-3 space-x-2 p-4 h-full">
              <div className="">
                { business && business.images && business.images.length > 0 ? (<>
                  <img  onClick={() => openImageModal(0)} src={business?.images?.[0]?.url} alt="" className='lg:w-[600px]  lg:h-80 w-full h-full rounded-2xl cursor-pointer hover:opacity-90 transition-all duration-300 hidden lg:flex items-center justify-center' />
                  {/* <img  onClick={() => openImageModal(0)} src={business?.images?.[0]?.url} alt="" className='lg:w-[600px]  lg:h-80 w-full h-full rounded-2xl cursor-pointer hover:opacity-90 transition-all duration-300 lg:hidden flex items-center justify-center' /> */}

                  <Swiper
                    spaceBetween={30}
                    // centeredSlides={true}
                    loop={true}
        
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper w-[80vw] h-[200px]"
                  >
                    <style jsx>{`
                      :global(.swiper-pagination-bullet) {
                        background-color: #e3e9f0; /* Tailwind gray-300 */
                        width: 14px;
                        height: 14px;
                        opacity: 1;
                        margin: 0 4px;
                        border-radius: 9999px;
                      }
        
                      :global(.swiper-pagination-bullet-active) {
                        background-color: #079f9f; /* Tailwind orange-500 */
                        width: 14px;
                      }
                    `}</style>
                    {business && business.images.map((image,index)=> (
                      <SwiperSlide key={index} onClick={() => openImageModal(index)} className="h-full flex items-center justify-center rounded-xl">
                        <div className="flex lg:hidden justify-center cursor-pointer transition-transform slick-padding rounded-xl">
                          <img alt={`Slide ${index}`} loading="lazy" className='w-full h-full rounded-xl' src={image.url}></img>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>



                </>) : (
                <div 
                  className="lg:w-[480px] lg:h-80 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl cursor-pointer hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                  onClick={() => openImageModal(0)}
                >
                   <Camera/>
                </div>
                )}
              </div>
              <div className="hidden lg:block">
                { business && business.images && business.images.length > 1 ? (
                  <img  onClick={() => openImageModal(1)} src={business?.images?.[1]?.url} alt="" className='hidden lg:w-[600px] lg:h-80 rounded-2xl cursor-pointer hover:opacity-90 transition-all duration-300 lg:flex items-center justify-center' />
                ) : (
                <div
                  className="hidden lg:w-[480px] lg:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl cursor-pointer hover:opacity-90 transition-all duration-300 lg:flex items-center justify-center shadow-lg hover:shadow-xl"
                  onClick={() => openImageModal(1)}
                >
                   <Camera/>
                </div>
                )}
              </div>
              <div className="hidden w-[475px] h-80 lg:flex flex-col gap-x-1 gap-y-2">
      
                {business && business.images && business.images.length > 2 ? <div className={`flex space-x-2 w-full ${business.images.length == 3 ? 'h-[99%]' : 'h-[50%]'}`}> {business.images.slice(2, 4).map((image, index) => (
                  <img key={index+1} onClick={() => openImageModal(index + 2)} src={image?.url} className={`${business.images?.length == 3 ? 'w-full h-full' : 'w-[49%] h-full'} rounded-xl cursor-pointer`}></img>
                ))  }</div> : (
                  <div className='hidden w-[480px] ms-2 h-full lg:flex flex-wrap gap-x-2'>
                    {
                  [1,2,3,4].map((item,index) => (
                    <div 
                    key={item}
                    className="w-[48%] h-[48%] bg-gradient-to-br from-green-100 to-blue-100 rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                    onClick={() => openImageModal(index + 2)}
                  >
                    {/* <div className="text-2xl">☕</div> */}
                     <Camera/>
                  </div>
                  ))}
                  </div>
                )}
                <div className={`${business.images?.length == 4 ? 'lg:flex' : 'hidden'} w-[480px] ms-1 h-full gap-x-2`}>
                  <div 
                    // key={item}
                    className="w-[98%] h-full bg-gray-300 rounded-xl cursor-pointer hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                    // onClick={() => openImageModal(index + 1)}
                  >
                    {/* <div className="text-2xl">☕</div> */}
                    <Camera/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mr-4">{business.name}</h1>
                  {business.isClaimed || business.verified && (
                    <div className="flex items-center bg-[#60CE80] text-white px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-bold">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className={`flex items-center ${business.rating >=0 && business.rating <=2 ? 'bg-red-400' : business.rating >2 && business.rating <4 ? 'bg-yellow-400' : 'bg-green-400'} px-4 py-2 rounded-full`}>
                    <Star className="w-5 h-5 text-gray-800 mr-2" />
                    <span className="font-bold text-gray-800">{business.rating}</span>
                    <span className="text-gray-600 ml-1">({business.reviews} reviews)</span>
                  </div>
                  {/* <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Opens in 15 mins</span>
                  </div> */}
                  <div className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{business.yearsInBusiness} Years</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-medium">{business.city.charAt(0).toUpperCase() + business.city.slice(1)} • {business.category.charAt(0).toUpperCase() + business.category.slice(1)} • {business.subcategory}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-row flex-col lg:items-center items-start gap-4 mb-2">
                  <div className='flex justify-center items-center gap-x-4'>
                  <a 
                    href={`tel:${business.phone}`}
                    className="bg-blue-600 text-white lg:px-8 px-4 py-3 rounded-xl transition-all duration-300 flex items-center font-semibold"
                  >
                    <Phone className="w-5 h-5 mr-2" />  
                    Call Now
                  </a>

                  {/* <a 
                    href={`tel:${business.phone}`}
                    className="lg:hidden block"
                  >
                    <div className='lg:hidden bg-blue-600 text-white py-3 rounded-xl transition-all duration-300 flex justify-center items-center font-semibold'>
                      <Phone className="w-7 h-8" />
                    </div>
                    <p className='mt-1 font-semibold text-sm'>Call Now</p>  
                  </a> */}
                  <button className="bg-zinc-50 lg:px-8 px-4 py-3 border rounded-xl transition-all duration-300 flex items-center font-semibold">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </button>

                  {/* <button className="lg:hidden rounded-xl flex flex-col justify-center items-center text-sm font-semibold">
                    <img src="https://akam.cdn.jdmagicbox.com/images/icons/iphone/newicon/whatsappIcn2308x48.png" width={57} height={55} alt="" />
                    WhatsApp
                  </button> */}
{/* 
                  <button className="lg:hidden block">
                    <div className="lg:hidden block bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300">
                      <Share2 className="w-7 h-7" />
                    </div>
                    <p className='mt-1 font-semibold text-sm'>Share</p>
                  </button> */}
                  </div>
                    {/* <button className="hidden lg:block bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button> */}
                  {/* <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300">
                    <Bookmark className="w-5 h-5" />
                  </button> */}
                </div>

                {/* Specialties */}
                {business.specialties && (
                  <div className="flex flex-wrap gap-2">
                    {business.specialties.map((specialty, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div>
                <div className="flex gap-x-2">
      {stars.map((star) => (
        <div
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {setSelected(star); setshowReview(true)}}
          className={`${star <= (hovered ?? selected ?? 0)
                ? "bg-yellow-500"
                : "text-zinc-600"} p-3 flex justify-center items-center border border-zinc-600 rounded-2xl cursor-pointer`}
        >
          <Star
            className={
              star <= (hovered ?? selected ?? 0)
                ? "text-white fill-yellow-500"
                : "text-zinc-600"
            }
          />
        </div>
      ))}
    </div>
    <form onSubmit={giveRating} className={showReview ? 'block' : 'hidden'}>
      <textarea rows={5} placeholder='Tell us about your experience'
       required className='border border-gray-800 w-full mt-2 p-2'
       value={comment}
       onChange={(e)=> setComment(e.target.value)}/>
      <div className='relative mb-5 lg:mb-0'>
        <button onClick={()=> setshowReview(false)} className='p-2 rounded-lg bg-zinc-100 border absolute right-20'>Cancel</button>
        <input type="submit" value='Submit' className='bg-blue-600 p-2 rounded-lg text-white absolute right-1 cursor-pointer' />
      </div>
      </form>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-10 px-8 overflow-x-scroll hide-scrollbar">
                  {[
                    { id: 'overview', label: 'Overview', icon: '📋' },
                    ...(shouldShowMenu(business) ? [{ id: 'menu', label: 'Menu', icon: '🍽️' }] : []),
                    { id: 'services', label: 'Services', icon: '🛠️' },
                    { id: 'hours', label: 'Hours', icon: '🕒' },
                    { id: 'photos', label: 'Photos', icon: '📸' },
                    { id: 'reviews', label: 'Reviews', icon: '⭐' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-6 px-1 border-b-2 text-sm lg:text-[16px] font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">About Us</h3>
                      <p className="text-gray-700 leading-relaxed text-sm lg:text-lg">{business.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Services</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {business.services.map((service, index) => (
                          <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center">
                            <span className="font-medium text-gray-800">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {business.awards && business.awards.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Awards & Recognition</h3>
                        <div className="space-y-3">
                          {business.awards.map((award, index) => (
                            <div key={index} className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                              <Award className="w-5 h-5 text-yellow-600 mr-3" />
                              <span className="font-medium text-gray-800">{award}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Offer</h3>
                    <div className="flex flex-wrap gap-5 w-full ">
                      {business.services.map((service, index) => (
                            <span key={index} className="font-semibold bg-blue-100 text-blue-800 py-2 px-4 rounded-lg">{service}</span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'hours' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-blue-600" />
                      Operating Hours
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                      <div className="space-y-1">
                        {formatHours(business.hours)}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Photo Gallery</h3>
                    {business.images && business.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {business.images.map((image, index) => (
                          <img key={index} onClick={()=>openImageModal(index)} src={image.url} alt="" className='aspect-square rounded-xl cursor-pointer' />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No photos available</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'menu' && shouldShowMenu(business) && business.menu && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Menu</h3>
                    <div className="space-y-8">
                      {business.menu.categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                  <span className="font-bold text-green-600">{item.price}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.popular && (
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                                      Popular
                                    </span>
                                  )}
                                  {item.spicy && (
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                      Spicy
                                    </span>
                                  )}
                                  {item.vegetarian && (
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                      Vegetarian
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
                    {/* <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
                      <p className="text-gray-600">Reviews coming soon...</p>
                    </div> */}
                    <div className='max-h-[75vh] overflow-y-auto hide-scrollbar'>
                    {reviews.map((review,index)=>(
                      <div key={index}>
                      <div className='my-6'>
                        <div className='flex gap-2 items-center'>
                          {user && user.avatar ? (
                            <img src={review.user.avatar} alt="" className='w-8 h-8 rounded-full' />
                          ):(
                          <div className='p-3 rounded-full bg-blue-400'>
                            <User className='w-4 h-4'/>
                          </div>
                          )}
                          <span>{review.user.name}</span>
                          <div className={`flex items-center ${review.rating >=0 && review.rating <=2 ? 'bg-red-600' : review.rating >2 && review.rating <4 ? 'bg-yellow-500' : 'bg-green-600'} px-1 text-sm font-semibold rounded-sm text-white`}>{review.rating} <Star className='w-4 h-3 fill-white'/></div>
                        </div>
                        <p className='mt-4 text-sm ms-4'>{review.comment}</p>
                      </div>
                      <hr />
                      </div>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Businesses */}
            <div>
            { similarBusinesses && similarBusinesses.length > 1 && <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Similar Businesses</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarBusinesses.map((similarBusiness) => (
                    <Link 
                      key={similarBusiness._id}
                      href={formatBusinessUrl(similarBusiness)}
                      className={`block group ${business._id  == similarBusiness._id ? 'hidden' : 'block'}`}
                    >
                      {similarBusiness.images && similarBusiness.images.length > 0 ? (<img src={similarBusiness && similarBusiness.images && similarBusiness.images[0].url} alt="" className={`rounded-2xl h-48 mb-4 group-hover:shadow-lg transition-all duration-300`} />
                      ) : (
                        <div className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-48 mb-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                        {/* <div className="text-4xl">☕</div> */}
                         <Camera/>
                      </div>
                      )}
                      <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-lg">
                        {similarBusiness.name}
                      </h4>
                      <p className="text-gray-600 mb-2">{similarBusiness.category}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">{similarBusiness.rating}</span>
                        <span className="text-gray-600 ml-1">({similarBusiness.reviews} reviews)</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>}
          </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a href={`tel:${business.phone}`} className="text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      {business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className=''>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="w-[230px] text-sm text-gray-800 font-semibold">{business.address}</p>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors font-semibold">
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${business.email}`} className="w-[230px] text-sm text-gray-800 font-semibold hover:text-blue-600 transition-colors">
                      {business.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a 
                  href={`tel:${business.phone}`}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                
                <button className="w-full bg-zinc-50 border py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                {/* <Navigation className="w-6 h-6 mr-3 text-blue-600" /> */}
                Location
              </h3>
              <div className="rounded-2xl h-48 flex items-center justify-center">
                {/* <div className="text-center rounded-lg"> */}
                  {/* <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-gray-500 text-sm">Coming soon...</p> */}
                  <iframe
                    width="100%"
                    height="190"
                    style={{ border: 0 }}
                    loading="lazy"
                    className='rounded-2xl'
                    src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
                  />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-[90%] lg:w-[70%] max-h-full p-4">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              {business && business.images && business.images.length > 0 ? (
                <img className='rounded-3xl h-[400px] lg:h-[600px] w-full' src={business && business.images && business.images[selectedImageIndex].url} alt="" />
              ) : (
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl h-[600px] w-full flex items-center justify-center shadow-2xl">
                {/* <div className="text-gray-400 text-8xl">☕</div> */}
                 <Camera/>
              </div>
              )}
              
              {business.images && business.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </div>
            
            <div className="text-center mt-6">
              <span className="text-white text-lg font-medium">
                {selectedImageIndex + 1} of {business.images ? business.images.length : 0}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
} 