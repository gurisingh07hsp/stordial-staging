'use client';

import React from 'react';
import { Pricing } from '@/components/pricing';

export default function AdvertisePage() {

  const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
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
          <p className="text-xl text-gray-600">Reach more customers and grow your business</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Why Advertise with Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Audience</h3>
              <p className="text-gray-600">Connect with customers actively searching for local businesses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Measurable Results</h3>
              <p className="text-gray-600">Track your performance with detailed analytics and insights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeted Advertising</h3>
              <p className="text-gray-600">Reach customers based on location, interests, and behavior</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Listing</h3>
            <p className="text-gray-600 mb-4">Get your business featured at the top of search results with enhanced visibility.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Featured placement in search results
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Enhanced business profile
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Priority customer support
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Analytics and performance tracking
              </li>
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sponsored Results</h3>
            <p className="text-gray-600 mb-4">Appear prominently when customers search for relevant services in your area.</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Sponsored placement in search
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Custom call-to-action buttons
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Geographic targeting
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Performance optimization
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
                <p><strong>Email:</strong> advertise@stordial.com</p>
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