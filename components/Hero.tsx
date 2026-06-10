// import { HeroSearch } from '@/app/(root)/_components/HeroSearch';

const Hero = () => {
  return (
    <div className='relative h-[780px] lg:h-screen w-full flex items-center justify-center overflow-hidden font-display z-10'>
        <video className='absolute inset-0 w-full h-full object-cover z-0' autoPlay loop muted playsInline preload="metadata">
            <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
        <div className='absolute inset-0 bg-linear-to-b from-background-dark/65 via-background-dark/50 to-background-dark z-10'></div>
        
        <div className='relative z-20 text-center text-white px-6 max-w-4xl pt-16 w-full'>
            <h1 className='text-4xl md:text-7xl font-light mb-6 tracking-tight leading-tight'>
                Make A Move For<br />
                Your <span className='font-extrabold italic text-primary'>Masterpiece Future</span>
            </h1>
            <p className='text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-4'>
                With Over $10 Million Sold — Wephco is the most reliable luxury real estate advisory, bridging ambition with generational legacy.
            </p>
            {/* <HeroSearch /> */}
        </div>
    </div>
  )
}

export { Hero }
