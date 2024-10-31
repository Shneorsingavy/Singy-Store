import React from 'react';
import ContactIcons from './ContactIcons';

const About = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-green-800 mb-6">About Our Store</h1>
      <p className="text-lg text-gray-700 leading-relaxed text-center max-w-2xl">
        Welcome to our vegetable store! We pride ourselves on offering the highest quality, fresh produce directly from our farms to your table. Our products are carefully selected to ensure the best taste, nutritional value, and freshness for our customers.
      </p>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Our owner, with over 30 years of experience in the market, has dedicated his life to providing top-quality vegetables and fruits. His extensive knowledge and passion for fresh produce have helped our store become a trusted name in the community.
        </p>
        <p className="text-gray-700">
          Our commitment to quality means you get the best selection of vegetables, from organic to seasonal favorites. We work directly with local farmers to ensure that every product meets our strict standards.
        </p>
      </div>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">Have any questions? We'd love to hear from you!</p>
        <p className="text-gray-700">
          <strong>Email:</strong> contact@vegstore.com
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> 123 Fresh Street, Market City, VE 12345
        </p>
        <ContactIcons/>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        © 2024 Vegetable Store. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
