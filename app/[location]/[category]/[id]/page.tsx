import React from 'react';
import BusinessDetail from '@/components/BusinessDetail';
interface BusinessPageProps {
  params: {
    location: string;
    category: string;
    id: string;
  };
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const location = decodeURIComponent(params.location.replace(/-/g, " "));
  const category = decodeURIComponent(params.category.replace(/-/g, " "));
  const id = params.id.split('-').filter(Boolean).pop();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${location}/category/${category}/id/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Business Not Found | Stordial",
      description: "This business listing could not be found on Stordial.",
    };
  }

  const data = await res.json();
  const business = data.business;

  return {
    title: `${business.name} | ${business.subcategory} in ${business.city}`,
    description: business.description || `Explore ${business.name} on Stordial`,
    alternates:{
      canonical: `/${location}/${category}/${business.name}`
    } 
  };
}

export default async function BusinessPage({ params }: BusinessPageProps) {


  const location = decodeURIComponent(params.location.replace(/-/g, ' '));
  const category = decodeURIComponent(params.category.replace(/-/g, ' '));
  const id = params.id.split('-').filter(Boolean).pop();


// Fetch business
  const businessRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${location}/category/${category}/id/${id}`,
    { cache: "no-store" }
  );

  const businessData = businessRes.ok ? await businessRes.json() : null;

  // Fetch similar businesses
  const similarRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/location/${location}/category/${category}`,
    { cache: "no-store" }
  );
  const similarBusinesses = similarRes.ok
    ? (await similarRes.json()).businesses.slice(0, 3)
    : [];

  return (
    <BusinessDetail
      params={params}
      business={businessData?.business || null}
      similarBusinesses={similarBusinesses}
    />
  );
} 