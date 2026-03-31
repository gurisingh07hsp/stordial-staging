import React from 'react';
import Script from "next/script";
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
    title: `${business.name.replace(/\s+/g, "-")} | ${business.category.charAt(0).toUpperCase() + business.category.slice(1)} in ${business.city.charAt(0).toUpperCase() + business.city.slice(1)}`,
    description: business.description || `Explore ${business.name} on Stordial`,
    alternates:{
      canonical: `/${location.replace(/\s+/g, "-")}/${category.replace(/\s+/g, "-")}/${business.name.replace(/\s+/g, "-")}`
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
    <div>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.stordial.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Location",
              item: "https://www.stordial.com/" + params.location,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Category",
              item: "https://www.stordial.com/" + params.location + "/" + params.category,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Business",
              item: "https://www.stordial.com/" + params.location + "/" + params.category + "/" + businessData?.business?.name.replace(/\s+/g, "-"),
            },
          ],
        })}
      </Script>
            <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": businessData?.business?.category, // or dynamic type
          name: businessData?.business?.name,
          image: businessData?.business?.image,
          address: {
            "@type": "PostalAddress",
            addressLocality: businessData?.business?.city,
            addressCountry: "IN",
          },
          telephone: businessData?.business?.phone,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: businessData?.business?.rating,
            reviewCount: businessData?.business?.reviewCount,
          },
        })}
      </Script>
      <BusinessDetail
        params={params}
        business={businessData?.business || null}
        similarBusinesses={similarBusinesses}
      />
    </div>
  );
} 