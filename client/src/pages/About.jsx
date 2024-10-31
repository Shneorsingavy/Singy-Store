import React from 'react';
import ContactIcons from './ContactIcons';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About SingiWatch</h1>
      <p className="text-lg text-gray-700 leading-relaxed text-center max-w-2xl">
        Welcome to SingiWatch, where timeless elegance and unmatched craftsmanship meet. Each watch in our collection is a masterpiece, blending luxury, precision, and sophistication. We are proud to offer our customers exclusive designs crafted with meticulous attention to detail, ensuring both style and durability.
      </p>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded with a passion for horology, SingiWatch is committed to excellence and elegance in every piece. Our founder, a connoisseur with over two decades in the luxury watch industry, set out to create a brand that epitomizes quality and distinction. Each watch in our collection reflects a legacy of sophistication and timeless beauty.
        </p>
        <p className="text-gray-700">
          We believe that a watch is more than just an accessory; it is an expression of personality and taste. That’s why we partner with master craftsmen who meticulously design and assemble each watch, ensuring that you receive a piece that will be treasured for generations.
        </p>
      </div>

      <div className="mt-10 bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">We would be delighted to assist you with any inquiries!</p>
        <p className="text-gray-700">
          <strong>Email:</strong> contact@singiwatch.com
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> +1 (555) 987-6543
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> 456 Luxury Ave, Elegance City, SW 67890
        </p>
        <ContactIcons />
      </div>

      <footer className="mt-12 text-center text-gray-600">
        © 2024 SingiWatch. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
