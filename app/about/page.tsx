import React from 'react';
import { Hero } from './(components)/Hero';
import { typography } from '@/lib/styles';

const AboutPage = () => {
  return (
    <div>
      <Hero />
      <div className="py-20 px-10">
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="font-outfit text-gray-500 uppercase font-semibold text-3xl mb-5">
            Welcome to Wephco Technologies
          </p>
          <p className="font-outfit text-sm lg:text-lg">
            At Wephco Technology, we are more than a real estate brokerage; we
            are your strategic partner in securing premium properties in some of
            the world's most desirable markets.
          </p>
          <p className="font-outfit text-sm lg:text-lg">
            With a commitment to integrity, excellence, and personalized
            service, we specialize in helping discerning clients invest in,
            relocate to, or acquire homes in Dubai, London, and Abu Dhabi
          </p>
          <p className="font-outfit text-sm lg:text-lg">
            Whether you're an investor, expatriate, or a first-time
            international buyer, we simplify your journey and deliver results.
          </p>
        </div>
        <h3 className="font-outfit text-wephco text-center uppercase font-semibold text-3xl my-20">
          Why Choose Us
        </h3>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-1 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <h4 className="font-outfit text-lg font-semibold mb-2">
                Global Expertise
              </h4>
              <p className="font-outfit text-sm lg:text-lg">
                With deep local knowledge and global reach, we guide clients
                through every aspect of cross-border property acquisition.
              </p>
            </div>
          </div>
          <div className="col-span-1 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <h4 className="font-outfit text-lg font-semibold mb-2">
                Curated Listings
              </h4>
              <p className="font-outfit text-sm lg:text-lg">
                We work only with verified developers and property owners to
                provide high-quality, high-potential properties
              </p>
            </div>
          </div>
          <div className="col-span-1 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <h4 className="font-outfit text-lg font-semibold mb-2">
                Tailored Approach
              </h4>
              <p className="font-outfit text-sm lg:text-lg">
                No two clients are alike. We customize our service to match your
                investment goals and lifestyle needs
              </p>
            </div>
          </div>
          <div className="col-span-1 text-center">
            <div className="hover:scale-105 transition-transform duration-300">
              <h4 className="font-outfit text-lg font-semibold mb-2">
                Trust & Transparency
              </h4>
              <p className="font-outfit text-sm lg:text-lg">
                Our process is built on clear communication, integrity, and full
                legal and financial transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-10">
        <h4 className={`${typography.heading2} text-center`}>Meet The Team</h4>
      </div>
    </div>
  );
};

export default AboutPage;
