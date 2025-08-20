export interface Business {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  services: string[];
  phone: string;
  email: string;
  address: string;
  city: string;
  rating: number;
  reviews: number;
  image?: string;
  website?: string;
  featured?: boolean;
  hours?: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  images?: imageData[];
  yearsInBusiness?: number;
  isClaimed?: boolean;
  specialties?: string[];
  teamSize?: number;
  awards?: string[];
  menu?: {
    categories: {
      name: string;
      items: {
        name: string;
        description: string;
        price: string;
        image?: string;
        popular?: boolean;
        spicy?: boolean;
        vegetarian?: boolean;
      }[];
    }[];
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SearchFilters {
  query: string;
  location: string;
  category: string;
  rating: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  businessOwner: boolean;
}

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

export interface BusinessFormData {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  services: string[];
  phone: string;
  email: string;
  address: string;
  city: string;
  website: string;
  images: imageData[];
  hours: OpeningHours; 
} 