'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { IProperty } from '@/interfaces/propertyInterface';
import { getAllProperties } from '@/actions/properties';
import { PropertyCard } from './PropertyCard';
import { Loader } from './Loader';
import { InterestForm } from './InterestForm';


const Properties = ({showForm = false}: {showForm: boolean}) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  
    const showModal = () => {
      if (!showForm) {
        return;
      }
  
      setOpenModal(true);
    };

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


  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <h1 className='lg:text-5xl text-4xl font-bold text-black dark:text-white my-10 text-center'>
        Properties
      </h1>
      {loading && <Loader />}
      {error && (
        <div className='flex justify-center'>
          <div className='bg-red-300 px-6 py-3 rounded-md'>
            <p className='text-red-500'>{error}</p>
          </div>
        </div>
      )}
      {!loading && properties?.length === 0 && <div className='flex justify-center'><h2 className='text-xl font-semibold'>No Property</h2></div>}
      <div
        className={`flex flex-col md:flex-row justify-center items-center flex-wrap gap-5`}
      >
        {properties?.map((property, index) => (
            <PropertyCard
              key={index}
              {...property}
              showModal={showModal}
              openModal={openModal}
            />
        ))}
        
      </div>
    </div>
  );
};

export { Properties };
