'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BusinessFormData} from '../types';
import { ArrowLeft, Upload, Clock, MapPin, Phone, Image as ImageIcon, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Select from "react-select";
import { useTags } from '@/hooks/use-tags';
import { categories } from '@/hooks/categories';
import MenuSection from './MenuSection';

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

export default function ListBusinessPage() {

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
    // subcategory: '',
    services: [],
    phone: '',
    email: '',
    address: '',
    city: '',
    website: '',
    images: images,
    hours: openingHours,
    menu: {
    categories: [{
      name: '',
      items: [{
        name: '',
        description: '',
        price: '',
        image: '',
        popular: false,
        spicy: false,
        vegetarian: false,
      }],
    }],
  }
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [is24x7, setIs24x7] = useState(false);

   const {user} = useAuth();

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

  const onBack = ()=> {
    window.history.back();
  }

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


//     const addCategory = () => {
//       setFormData((prev) => ({
//         ...prev,
//         menu: {
//           ...prev.menu,
//           categories: [
//             ...(prev?.menu?.categories || []),
//             {
//               name: '',
//               items: [
//                 {
//                   name: '',
//                   description: '',
//                   price: '',
//                   image: '',
//                   popular: false,
//                   spicy: false,
//                   vegetarian: false,
//                 }
//               ]
//             }
//           ]
//         }
//       }));
//     // setMenu({
//     //   categories: [...menu.categories, { name: '', items: [] }]
//     // });
//   };

//   const removeCategory = (categoryIndex: number) => {

//     setFormData((prev) => ({
//       ...prev,
//       menu: {
//         ...prev.menu,
//         categories: (prev.menu?.categories ?? []).filter((_, i) => i !== categoryIndex)
//       }
//     }));
//   };

//  const updateCategoryName = (categoryIndex: number, name: string) => {
//     setFormData(prev => ({
//       ...prev,
//       menu: {
//         ...prev.menu,
//         categories: (prev.menu?.categories || []).map((cat, i) =>
//           i === categoryIndex
//             ? { ...cat, name }
//             : cat
//         )
//       }
//     }));
//   };

// const addItem = (categoryIndex: number) => {
//   setFormData(prev => ({
//     ...prev,
//     menu: {
//       ...prev.menu,
//       categories: (prev.menu?.categories || []).map((cat, i) => {
//         if (i === categoryIndex) {
//           return {
//             ...cat,
//             items: [
//               ...cat.items,
//               {
//                 name: '',
//                 description: '',
//                 price: '',
//                 image: '',
//                 popular: false,
//                 spicy: false,
//                 vegetarian: false,
//               }
//             ]
//           };
//         }
//         return cat;
//       })
//     }
//   }));
// };


//   const removeItem = (categoryIndex: number, itemIndex: number) => {
//   setFormData(prev => ({
//     ...prev,
//     menu: {
//       ...prev.menu,
//       categories: (prev.menu?.categories || []).map((cat, i) => {
//           if (i === categoryIndex) {
//             return {
//               ...cat,
//               items: cat.items.filter((_, j) => j !== itemIndex)
//             };
//           }
//           return cat;
//         })
//       }
//     }));
//   };


//   const updateItem = (
//   categoryIndex: number,
//   itemIndex: number,
//   field: keyof any,
//   value: any
// ) => {
//   setFormData(prev => ({
//     ...prev,
//     menu: {
//       ...prev.menu,
//       categories: (prev.menu?.categories || []).map((cat, i) => {
//         if (i === categoryIndex) {
//           return {
//             ...cat,
//             items: cat.items.map((item, j) => {
//               if (j === itemIndex) {
//                 return {
//                   ...item,
//                   [field]: value
//                 };
//               }
//               return item;
//             })
//           };
//         }
//         return cat;
//       })
//     }
//   }));
// };

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


              {/* Menu Section */}
              <MenuSection formData={formData} setFormData={setFormData}/>
              {/* {isShowMenu(formData.category) && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Menu className="w-4 h-4 mr-2 text-blue-600" />
                  Menu
                </h4>
                {formData?.menu?.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8 border mt-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Category Name (e.g., Appetizers)"
                    value={category.name}
                    onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(categoryIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4 p-4 bg-white border border-gray-200 rounded-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-700">Item {itemIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeItem(categoryIndex, itemIndex)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Price (e.g., $9.99)"
                        value={item.price}
                        onChange={(e) => updateItem(categoryIndex, itemIndex, 'price', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <textarea
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'description', e.target.value)}
                      className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      required
                    />

                    <input
                      type="text"
                      placeholder="Image URL (optional)"
                      value={item.image || ''}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'image', e.target.value)}
                      className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex gap-4 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.popular || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'popular', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Popular</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.spicy || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'spicy', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Spicy</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.vegetarian || false}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'vegetarian', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Vegetarian</span>
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem(categoryIndex)}
                  className="w-full mt-3 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addCategory}
              className="w-full mb-6 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
              </div>
              )} */}


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
                          className="w-full lg:h-32 h-20 object-contain rounded"
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