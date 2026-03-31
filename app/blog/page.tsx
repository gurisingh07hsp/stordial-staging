import React from 'react'
import Script from "next/script";
import BlogsDetails from '@/components/BlogsDetails';

export const metadata = {
  title: "Stordial Blog & Insights",
  description:
    "Explore guides, tips, and updates from Stordial to help local businesses grow, improve visibility, and connect with customers effectively",
    alternates:{
    canonical: '/blog'
  }
};

const BlogsPage = () => {

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
              name: "Blog",
              item: "https://www.stordial.com/blog",
            },
          ],
        })}
      </Script>
      <BlogsDetails/>
    </div>
  );
};

export default BlogsPage
