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
    title: `${category} in ${location}`,
    alternates:{
      canonical: `/${location}/${category}`
    } 
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {

  return (
    <BusinessDetailByCategoryAndLocation params={params}/>
  );
} 