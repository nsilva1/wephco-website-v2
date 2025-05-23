'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { IProperty } from '@/interfaces/propertyInterface';
import { getAllProperties } from '@/actions/properties';
import { PropertyCard } from './PropertyCard';
import { Loader } from './Loader';

const Properties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<IProperty[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

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
      <h1 className='lg:text-5xl text-4xl font-bold text-black my-10 text-center'>
        Properties
      </h1>
      <div className='flex justify-center my-10'>
        <button
          onClick={() => filterProperties('Dubai')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 cursor-pointer ${
            filterText === 'Dubai' ? 'bg-primary' : 'bg-black'
          }`}
        >
          Dubai
        </button>
        <button
          onClick={() => filterProperties('Abu Dhabi')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 cursor-pointer ${
            filterText === 'Abu Dhabi' ? 'bg-primary' : 'bg-black'
          }`}
        >
          Abu Dhabi
        </button>
        <button
          onClick={() => filterProperties('London')}
          className={`text-white rounded-lg px-6 py-3 mx-2 hover:bg-black/80 cursor-pointer ${
            filterText === 'London' ? 'bg-primary' : 'bg-black'
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
              showForm
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Properties };
