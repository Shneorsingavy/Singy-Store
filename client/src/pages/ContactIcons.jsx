import React from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const ContactIcons = () => {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {/* Phone Icon */}
      <a
        href="tel:+972535586995"
        className="text-green-700 hover:text-green-900 transition-colors duration-200"
        aria-label="Call us"
      >
        <FaPhone size={30} />
      </a>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/972535586995"
        className="text-green-600 hover:text-green-800 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Email Icon */}
      <a
        href="mailto:szs4911@gmail.com"
        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        aria-label="Send us an email"
      >
        <FaEnvelope size={30} />
      </a>
    </div>
  );
};

export default ContactIcons;
