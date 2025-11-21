import React from 'react';
import ListBusinessPage from '../../components/ListBusinessPage';

export const metadata = {
  title: "List Your Business on Stordial & Grow",
  description:
    "Add your business to Stordial and reach more local customers with improved visibility, verified listings, and a simple onboarding process",
    alternates:{
    canonical: '/list-business'
  }
};

export default function ListBusinessPageComponent() {

  return (
    <ListBusinessPage/>
  );
}