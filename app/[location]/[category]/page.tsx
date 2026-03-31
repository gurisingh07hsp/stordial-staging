import React from 'react';
import Script from "next/script";
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
          ],
        })}
      </Script>
      <BusinessDetailByCategoryAndLocation params={params}/>
    </div>
  );
} 