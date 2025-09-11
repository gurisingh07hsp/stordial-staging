'use client';

import React from 'react';
import { Pricing } from '@/components/pricing';

export default function AdvertisePage() {

  const demoPlans = [
  {
    name: "FREE",
    price: "00",
    yearlyPrice: "00",
    period: "per month",
    features: [
      "Business Name, Address, Phone, Website",
      "Limited categories",
      "No priority ranking",
      "Valid for unlimited time",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "STANDARD PLAN",
    price: "49",
    yearlyPrice: "1499",
    period: "per month",
    features: [
      "Verified Badge",
      "Higher visibility than free listings",
      "Featured in search results (medium priority)",
      "Valid for unlimited time",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PREMIUM PLAN",
    price: "99",
    yearlyPrice: "2499",
    period: "per month",
    features: [
      "Verified Badge",
      "Priority listing (always shown before Free/Standard)",
      "WhatsApp Click-to-Chat Button",
      "Leads directly from customers (via whatsapp)",
      'Featured in homepage “Top Businesses”',
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "ELITE PLAN",
    price: "199",
    yearlyPrice: "5499",
    period: "per month",
    features: [
      "Verified Badge",
      "Top placement always (first 5 results)",
      "Banner advertisement on city/category page",
      "WhatsApp Click-to-Chat Button",
      "Direct calls & leads reports",
      "Free support for updates",
      'Featured in homepage “Top Businesses”',
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-[35px] font-bold text-gray-900 mb-4">Advertise with Stordial</h1>
          <p className="text-xl text-gray-600">Expand your business, reach more customers.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Why Advertise with Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <img src="/icons/audience.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Audience</h3>
              <p className="text-gray-600"> Reach out to those actively searching for local businesses and services nearby.</p>
            </div>
            <div className="text-center">
              <img src="/icons/results.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Measurable Results</h3>
              <p className="text-gray-600">Use powerful analytics and insights to track your performance and see how your business grows!</p>
            </div>
            <div className="text-center">
              <img src="/icons/retargeting.png" alt="audience" className='w-14 h-14 mx-auto' />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeted Advertising</h3>
              <p className="text-gray-600">Targeted Advertising You can target your potential customers according to location, interests, and preferences and promote your business.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Listing</h3>
            {/* <p className="text-gray-600 mb-4">Get your business featured at the top of search results with enhanced visibility.</p> */}
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Place your widget at the top of search results with high visibility and credibility.
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Featured placement in search results
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Enhanced and detailed business profile
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Priority access to customer support
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Performance insights and tracking
              </li>
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sponsored Results</h3>
            <p className="text-gray-600 mb-4">Get ahead of the competition, & be right in front of the customers when they search for businesses like you.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Sponsored placement in search results
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Use CTA buttons to generate leads
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Advanced geographic targeting
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Optimised performance for better results
              </li>
            </ul>
            <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div className="rounded-lg">
          <Pricing 
            plans={demoPlans}
            title="Simple, Transparent Pricing"
            description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Our Advertising Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-600">
                <p><strong>Email:</strong> info@stordial.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your business and advertising goals"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 