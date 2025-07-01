import React from 'react';
import saadiyat3 from '@/images/saadiyat3.jpg';
import saadiyat4 from '@/images/saadiyat4.jpg';
import saadiyat5 from '@/images/saadiyat5.jpg';
import { NewDevelopmentCard } from './NewDevelopmentCard';
import Link from 'next/link';
import { BiArrowToRight } from 'react-icons/bi';

const NewDevelopmentsSection = () => {
  return (
    <section id='#new-developments' className='p-8 my-20 font-outfit'>
      <div className='text-center lg:text-left mb-8'>
        <h2 className='text-4xl font-bold mb-4 text-black text-center lg:text-5xl'>
          The Boldest New
          <br />
          Developments
        </h2>
        <p className='mb-8 text-center text-gray-500'>
          Explore our transformative new projects that elevate modern luxury
          living.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='col-span-1'>
          <div className='flex justify-center gap-10 mb-5'>
            <NewDevelopmentCard
              imageURL={saadiyat4}
              title='MANDARIN ORIENTAL RESIDENCES'
              location='Saadiyat Cultural District, Abu Dhabi'
              description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <NewDevelopmentCard
            imageURL={saadiyat5}
            title='MANDARIN ORIENTAL RESIDENCES'
            location='Saadiyat Cultural District, Abu Dhabi'
            description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
          />
        </div>
        <div className='col-span-1'>
          <NewDevelopmentCard
            imageURL={saadiyat3}
            title='MANDARIN ORIENTAL RESIDENCES'
            location='Saadiyat Cultural District, Abu Dhabi'
            description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
          />
        </div>
      </div>
      <div className='mt-8'>
        <Link
          href='/new-developments'
          className='bg-black text-white rounded-full px-5 py-3 flex justify-between items-center hover:bg-black/80 cursor-pointer w-full lg:w-40'
        >
          <p>View More</p>
          <BiArrowToRight className='text-2xl ml-2' />
        </Link>
      </div>
    </section>
  );
};

export { NewDevelopmentsSection };
