import React from 'react';
import BusinessDetailByCategoryAndLocation from '@/components/BusinessDetailByCategoryAndLocation';
interface CategoryPageProps {
  params: {
    location: string;
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const location = decodeURIComponent(params.location.replace(/-/g, " "));
  const category = decodeURIComponent(params.category.replace(/-/g, " "));

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)}`,
    alternates:{
      canonical: `/${location.replace(/\s+/g, "-")}/${category.replace(/\s+/g, "-")}`
    } 
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {

  return (
    <BusinessDetailByCategoryAndLocation params={params}/>
  );
} 