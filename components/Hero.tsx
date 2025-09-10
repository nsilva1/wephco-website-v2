
// import React, { useState } from 'react'
// import hero from '@/images/saadiyat2.jpg'
// import Image from 'next/image'
// import { BiSearch } from 'react-icons/bi'
// import { useRouter } from 'next/navigation'

const Hero = () => {
    // const router = useRouter()

    // const [searchTerm, setSearchTerm] = useState('')

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(e.target.value);
    // };
    
    // const handleSearchSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     router.push('/buy');
    // };

  return (
    <div className='relative h-[500px] lg:h-[600px]'>
        <video className='absolute inset-0 w-full h-full object-cover' autoPlay loop muted playsInline>
            <source src="/videos/saadiyat.mp4" type="video/mp4" />
        </video>
        <div className='absolute inset-0 bg-black/50 opacity-80 flex items-center justify-center'>
        {/* <div className='text-center text-white p-8 max-w-2xl'>
            <h1 className='lg:text-7xl text-4xl font-bold mb-4'>Make A Move For<br />Your Future</h1>
            <p className='text-2xl font-bold mb-6'>With Over $20 Million Sold<br /> The Most Reliable Real Estate Brand in the Country</p>
            <form onSubmit={handleSearchSubmit} className='bg-white flex items-center font-semibold rounded-full gap-4 p-2'>
                <input type='text' value={searchTerm} onChange={handleSearchChange} className="p-2 rounded-l-md text-black flex-grow focus:outline-none" placeholder='Search properties, locations...' />
                <div className='rounded-full cursor-pointer'>
                    <button type='submit' className='cursor-pointer rounded-full flex items-center justify-center'>
                        <BiSearch color='#808080' size={40} />
                    </button>
                </div>
            </form>
        </div> */}
        </div>
    </div>
  )
}

export { Hero }