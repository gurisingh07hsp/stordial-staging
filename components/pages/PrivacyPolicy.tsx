'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, list a business, or contact us. This may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Name and contact information</li>
                  <li>Business information and details</li>
                  <li>Reviews and ratings you submit</li>
                  <li>Messages you send through our platform</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Provide and maintain our services</li>
                  <li>Connect users with local businesses</li>
                  <li>Send you important updates and notifications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Respond to your questions and support requests</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
                <p className="text-gray-600 mb-6">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Business owners when you contact them through our platform</li>
                  <li>Service providers who help us operate our website</li>
                  <li>Law enforcement when required by law</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Security</h2>
                <p className="text-gray-600 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-6">
                  <li>Access your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cookies and Tracking</h2>
                <p className="text-gray-600 mb-6">
                  We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Third-Party Links</h2>
                <p className="text-gray-600 mb-6">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Children&apos;s Privacy</h2>
                <p className="text-gray-600 mb-6">
                  Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Changes to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 font-medium">LocalConnect</p>
                  <p className="text-gray-600">Email: privacy@localconnect.com</p>
                  <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                  <p className="text-gray-600">Address: 123 Business Street, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 