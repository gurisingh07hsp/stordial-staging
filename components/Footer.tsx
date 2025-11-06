'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Youtube, Mail, Phone,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img src="/Stordial crop.png" alt="Logo" width={150} height={80}/>
            <p className="text-gray-600 mb-6 mt-4 max-w-md">
              Connect with the best local businesses in your area. From restaurants to services, 
              find what you need right in your neighborhood.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/stordial" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/stordial" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/stordialofficial/" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/stordial/" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/list-business" className="text-gray-600 hover:text-blue-600 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@stordial.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+91 75890-75361</span>
              </div>

               <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md">
            <h3 className="font-semibold text-gray-800 mb-2">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest updates about new businesses and local events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-[#0765F2] text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

            </div>
          </div>
        </div>

        {/* Newsletter */}
       

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Stordial. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}