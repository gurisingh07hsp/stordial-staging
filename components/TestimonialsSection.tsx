'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Local Resident",
      avatar: "👩‍💼",
      rating: 5,
      text: "LocalConnect helped me find the perfect coffee shop near my office. The reviews were spot-on and I love supporting local businesses!",
      business: "Downtown Coffee Co."
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      avatar: "👨‍💼",
      rating: 5,
      text: "As a business owner, LocalConnect has been incredible for getting our name out there. The platform is easy to use and brings us real customers.",
      business: "TechFix Pro"
    },
    {
      name: "Emily Rodriguez",
      role: "Community Member",
      avatar: "👩‍🎨",
      rating: 5,
      text: "I discovered amazing local services I never knew existed. The search filters are so helpful and the business details are always accurate.",
      business: "Beauty Haven Salon"
    },
    {
      name: "David Thompson",
      role: "Frequent User",
      avatar: "👨‍🔧",
      rating: 5,
      text: "LocalConnect is my go-to for finding reliable local services. The ratings and reviews help me make confident decisions every time.",
      business: "Green Thumb Garden Center"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have discovered amazing local businesses through LocalConnect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                &quot;{testimonial.text}&quot;
              </blockquote>
              
              <div className="text-sm text-blue-600 font-medium">
                Found via: {testimonial.business}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Quote className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Join Our Growing Community
              </h3>
            </div>
            <p className="text-lg text-gray-600 mb-6">
              Thousands of people trust LocalConnect to discover and support local businesses. 
              Be part of a community that values local commerce and authentic experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>✓ 10,000+ Local Businesses</span>
              <span>✓ 50,000+ Happy Customers</span>
              <span>✓ 100% Verified Reviews</span>
              <span>✓ 24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 