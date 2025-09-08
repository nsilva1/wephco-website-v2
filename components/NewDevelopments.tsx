'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { IProperty } from '@/interfaces/propertyInterface';
import saadiyat3 from '@/images/saadiyat3.jpg';
import saadiyat4 from '@/images/saadiyat4.jpg';
import saadiyat5 from '@/images/saadiyat5.jpg';
import { NewDevelopmentCard } from './NewDevelopmentCard';
import Link from 'next/link';
import { BiArrowToRight } from 'react-icons/bi';
import { typography, layout } from '@/lib/styles';
import Select from 'react-select'
import { getAllProperties } from '@/actions/properties';
import { Loader } from './Loader';
import Slider from 'react-slick';
import { lightSelectStyles, darkSelectStyles } from '@/lib/styles';
import { useBrowserTheme } from '@/hooks/browserTheme';

const NewDevelopmentsSection = () => {

  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');


  const theme = useBrowserTheme();
  const selectStyle = theme === 'dark' ? darkSelectStyles : lightSelectStyles;


  const fetchProperties = useCallback(async () => {
      setLoading(true);
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }, []);


    // Create a list of unique countries for dropdown
  const countryOptions = useMemo(() => {
    const countries = Array.from(new Set(properties.map((p) => p.country)));
    return countries.map((c) => ({ label: c, value: c }));
  }, [properties]);


  // Filter properties by selectedCountry
  const filteredProperties = useMemo(() => {
    if (!selectedCountry) return [];
    return properties.filter((p) => p.country === selectedCountry);
  }, [properties, selectedCountry]);
  
  
    useEffect(() => {
      fetchProperties();
    }, []);


    const sliderSettings = {
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  

  return (
    <section id='#new-developments' className={`${layout.columnSection}`}>
      <div className='flex flex-col items-center justify-center text-center mb-6'>
        <h2 className={`${typography.heading2}`}>
          The Boldest New
          <br />
          Developments
        </h2>
        <p className={typography.subtitle}>
          Explore our transformative new projects that elevate modern luxury
          living.
        </p>
      </div>

      {loading ? <Loader /> : <div className='max-w-lg mx-auto mb-8'>
        <Select styles={selectStyle} options={countryOptions} placeholder='Project Location' onChange={(e) => setSelectedCountry(e!.value)} />
      </div>}

      

      {filteredProperties.length > 0 ? (
          <div className='slider-container'>
            <Slider {...sliderSettings}>
          {filteredProperties.map((property) => (
            <div key={property.id} className="px-2">
              <NewDevelopmentCard {...property} />
            </div>
          ))}
        </Slider>
          </div>
      ) : (
        <div></div>
      )}

      <div className='mt-8'>
        <Link
          href='/projects'
          className='bg-white dark:bg-black text-black dark:text-white px-5 py-3 flex justify-between items-center cursor-pointer w-full lg:w-40'
        >
          <p>View More</p>
          <BiArrowToRight className='text-2xl ml-2' />
        </Link>
      </div>
    </section>
  );
};

export { NewDevelopmentsSection };
