import React from 'react';
import dubai from '@/images/dubai.jpg';
import { NewDevelopmentCard } from './NewDevelopmentCard';


const NewDevelopmentsSection = () => {
  
  return (
    <section id='#new-developments' className='p-8 my-20'>
      <div className='text-center lg:text-left mb-8'>
        <h2 className='text-4xl font-bold mb-4 text-black text-center lg:text-5xl'>The Boldest New<br />Developments</h2>
        <p className='mb-8 text-center text-gray-500'>Explore our transformative new projects that elevate modern luxury living.</p>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap'>
        <NewDevelopmentCard
          imageURL={dubai}
          title='The Luxe Residence'
          location='Dubai, UAE'
          description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
        />
        <NewDevelopmentCard
          imageURL={dubai}
          title='The Luxe Residence'
          location='Dubai, UAE'
          description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
        />
        <NewDevelopmentCard
          imageURL={dubai}
          title='The Luxe Residence'
          location='Dubai, UAE'
          description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
        />
        <NewDevelopmentCard
          imageURL={dubai}
          title='The Luxe Residence'
          location='Dubai, UAE'
          description='Experience unparalleled luxury in the heart of Dubai with stunning views and world-class amenities.'
        />
      </div>
    </section>
  );
};


export { NewDevelopmentsSection };