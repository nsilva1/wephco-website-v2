'use client';

import React, { useState, useEffect } from 'react';
import { PropertyCard, PropertyCardProps } from './PropertyCard';
import { BiArrowToRight } from 'react-icons/bi';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';

interface PropertyProps extends React.ComponentPropsWithoutRef<'div'> {
  numberOfProperties?: number;
  viewMore?: boolean;
}

const FeaturedProperties = ({ numberOfProperties = 3, viewMore = true, ...rest }: PropertyProps) => {
  const [properties, setProperties] = useState<PropertyCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'properties'));

        const allProperties: PropertyCardProps[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            openModal: false,
            title: data.title || data.name || '',
            developer: data.developer || '',
            price: data.price || 0,
            description: data.description || '',
            location: data.location || (data.city && data.country ? `${data.city}, ${data.country}` : ''),
            category: data.category || data.type || 'Sale',
            tag: data.tag || 'Local',
            status: data.status || 'Available',
            currency: data.currency || 'USD',
            bedroom: data.bedroom || data.beds || 0,
            bathroom: data.bathroom || data.baths || 0,
            square_foot: data.square_foot || data.sqft || 0,
            verified: data.verified || false,
            interests: data.interests || [],
            images: data.images || [],
            pdfUrl: data.pdfUrl || null,
            featured: data.featured === true,
            createdAt: data.createdAt ? new Date(data.createdAt) : null,
          };
        });

        // Filter properties explicitly marked as featured (featured === true)
        const featuredProps = allProperties.filter(p => p.featured === true);

        if (featuredProps.length > 0) {
          // Display up to numberOfProperties featured properties
          setProperties(featuredProps.slice(0, numberOfProperties));
        } else {
          // Fallback: If no properties are marked as featured, display the 3 most recent properties
          // const recentProps = [...allProperties].sort((a, b) => {
          //   const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          //   const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          //   return timeB - timeA;
          // });
          setProperties(allProperties.slice(0, numberOfProperties));
        }
      } catch (error) {
        console.error("Error fetching properties from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [numberOfProperties]);

  return (
    <div {...rest} className='bg-background-dark py-24 px-6 max-w-7xl mx-auto font-display'>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Curated Collection
          </span>
          <h3 className="text-4xl font-light text-slate-100 leading-tight">
            Featured <span className="font-extrabold text-primary">Properties</span>
          </h3>
          <div className="h-1 w-24 bg-primary mt-6 mx-auto md:mx-0"></div>
        </div>
        
        {viewMore && (
          <Link href='/properties' className="group flex items-center gap-3 text-primary font-bold tracking-widest text-sm uppercase transition-all duration-300">
            View All Properties
            <BiArrowToRight className="group-hover:translate-x-2 transition-transform text-xl" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 w-full">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-items-center w-full'>
          {properties.map((property, index) => (
            <div className='w-full flex justify-center' key={property.id || index}>
              <PropertyCard {...property} />
            </div>
          ))}
          {properties.length === 0 && (
            <p className="text-slate-400 text-sm text-center col-span-full">No properties available at this time.</p>
          )}
        </div>
      )}
      
      {viewMore && (
        <div className='mt-12 flex justify-center md:hidden'>
          <Link href='/properties' className='bg-primary text-background-dark px-10 py-4 rounded-lg font-bold transition-all w-full text-center block uppercase tracking-wider'>
            View All Portfolio
          </Link>
        </div>
      )}
    </div>
  );
};

export { FeaturedProperties };
