
import React from 'react';
import PrivacyPolicy from '../../components/pages/PrivacyPolicy';

export const metadata = {
  title: "Stordial Privacy Policy",
  description:
    "Understand how Stordial collects, uses, and safeguards your information to ensure a secure and trustworthy experience on our platform.",
    alternates:{
    canonical: '/privacy'
  }
};

export default function Privacy() {
  return <PrivacyPolicy />;
}