import React from 'react'
import CareerPage from '@/components/CareerPage';

export const metadata = {
  title: "Careers at Stordial",
  description:
    "Explore exciting opportunities at Stordial and build your career with a growing platform that connects local businesses and customers",
    alternates:{
    canonical: '/career'
  }
};

const Career = () => {
  return (
   <CareerPage/>
  )
}

export default Career