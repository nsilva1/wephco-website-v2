import React from 'react';
import Hero from './(components)/Hero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Footer } from '@/components/Footer';

const Abujaproperties = () => {
  return (
    <div>
      <Hero />
      <FeaturedProperties viewMore={false} />
      <Footer />
    </div>
  );
};

export default Abujaproperties;
