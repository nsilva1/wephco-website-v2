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
  
    let interestModal = (
      <InterestForm open={openModal} close={() => setOpenModal(false)} />
    );

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
      {interestModal}
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
      {properties?.length === 0 && <div className='flex justify-center'><h2 className='text-xl font-semibold'>No Property</h2></div>}
      <div
        className={`grid lg:grid-cols-3 grid-cols-1 xl:grid-cols-4 gap-5`}
      >
        {properties?.map((property, index) => (
          <div key={index} className='col-span-1'>
            <PropertyCard
              {...property}
              showModal={showModal}
              openModal={openModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Properties };
