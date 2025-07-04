'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { IProperty } from '@/interfaces/propertyInterface';
import { getAllProperties } from '@/actions/properties';
import { PropertyCard } from './PropertyCard';
import { Loader } from './Loader';
import { InterestForm } from './InterestForm';
// import { createPortal } from 'react-dom';

const Properties = ({showForm = false}: {showForm: boolean}) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<IProperty[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
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
      setFilteredProperties(data);
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterProperties = useCallback(
    (criteria: string) => {
      const filtered = properties.filter(
        (property) => property.city === criteria
      );
      setFilteredProperties(filtered);
      setFilterText(criteria);
    },
    [properties]
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      {interestModal}
      <h1 className='lg:text-5xl text-4xl font-bold text-black dark:text-white my-10 text-center'>
        Properties
      </h1>
      <div className='flex justify-center my-10'>
        <button
          onClick={() => filterProperties('Dubai')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 dark:hover:bg-white/80 cursor-pointer ${
            filterText === 'Dubai' ? 'bg-primary' : 'bg-black dark:bg-white dark:text-black'
          }`}
        >
          Dubai
        </button>
        <button
          onClick={() => filterProperties('Abu Dhabi')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 dark:hover:bg-white/80 cursor-pointer ${
            filterText === 'Abu Dhabi' ? 'bg-primary' : 'bg-black dark:bg-white dark:text-black'
          }`}
        >
          Abu Dhabi
        </button>
        <button
          onClick={() => filterProperties('London')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 dark:hover:bg-white/80 cursor-pointer ${
            filterText === 'London' ? 'bg-primary' : 'bg-black dark:bg-white dark:text-black'
          }`}
        >
          London
        </button>
      </div>
      {loading && <Loader />}
      {error && (
        <div className='flex justify-center'>
          <div className='bg-red-300 px-6 py-3 rounded-md'>
            <p className='text-red-500'>{error}</p>
          </div>
        </div>
      )}
      {filteredProperties?.length === 0 && <div className='flex justify-center'><h2 className='text-xl font-semibold'>No Property</h2></div>}
      <div
        className={`grid lg:grid-cols-3 grid-cols-1 gap-4`}
      >
        {filteredProperties?.map((property, index) => (
          <div key={index}>
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
