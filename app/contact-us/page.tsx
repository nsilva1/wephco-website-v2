import React from 'react';
import { ContactUs } from '@/components/ContactUs';

const ContactPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 font-outfit">
        <p className="text-lg mb-8 mt-20">We'd love to hear from you!</p>
        <ContactUs />
      </div>
    </div>
  );
};

export default ContactPage;
