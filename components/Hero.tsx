

const Hero = () => {
    

  return (
    <div className='relative h-[500px] lg:h-[600px]'>
        <video className='absolute inset-0 w-full h-full object-cover' autoPlay loop muted playsInline preload="metadata">
            <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
        <div className='absolute inset-0 bg-black/50 opacity-80 flex items-center justify-center'>
        <div className='text-center text-white p-8 max-w-2xl'>
            <h1 className='lg:text-7xl text-4xl font-bold mb-4'>Make A Move For<br />Your Future</h1>
            <p className='text-2xl font-bold mb-6'>With Over $20 Million Sold<br /> The Most Reliable Real Estate Brand in the Country</p>
        </div>
        </div>
    </div>
  )
}

export { Hero }