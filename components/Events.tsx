import React from 'react'

const Events = () => {
  return (
    <section className='bg-black p-8'>
        <div className='text-white text-center'>
            <h2 className='text-3xl font-bold mb-4'>Upcoming Events</h2>
            <p className='mb-8'>Join us for our upcoming events and workshops to learn more about our projects.</p>
            <div className='flex justify-center'>
            <a href='/events' className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>View All Events</a>
            </div>
        </div>
    </section>
  )
}

export { Events }