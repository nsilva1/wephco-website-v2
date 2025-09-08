import React from 'react';
import { Hero } from './(components)/Hero';
// import { Regions } from '@/components/Regions';
import { Footer } from '@/components/Footer';
import { Properties } from '@/components/Properties';

const BuyPage = () => {
  return (
    <section>
      <Hero />
      <div className="p-8">
        <Properties showForm />
      </div>
      <Footer />
    </section>
  );
};

export default BuyPage;
