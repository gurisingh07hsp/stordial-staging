import React from 'react';
import TermsOfService from '../../components/pages/TermsOfService';

export const metadata = {
  title: "Stordial Terms of Service",
  description:
    "Read Stordial’s terms outlining user responsibilities, platform rules, and policies to ensure a transparent, secure, and fair service experience.",
    alternates:{
    canonical: '/terms'
  }
};

export default function Terms() {
  return <TermsOfService />;
}