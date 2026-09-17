'use client'

import { useRouter } from "next/navigation"
// import heroVideo from '@/public/videos/WephcoV1-compressed.mp4';

const Hero = () => {
    const router = useRouter()

    // const videoLink = 'https://wephco-website-376564124699-eu-north-1-an.s3.eu-north-1.amazonaws.com/WephcoV1.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAVPLHYRQNQHVC5HPL%2F20260916%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20260916T152120Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCmV1LW5vcnRoLTEiRjBEAiBBoeldZwgc5JMnucs8o3IINbXQxILIdDaamxNk6DuyzwIgAw74ixekvLJ%2BHamZcGuqJ43OG58UEVKqduNeR03PSgoqmQIIGBAAGgwzNzY1NjQxMjQ2OTkiDPQMQH%2F25YbYs%2FTfrCr2AVbkzMCwtZud%2BRVSN8a7pdHZCEt0AqP4sQpuFUHZEVTWXUn5eASQUcpTK157XadkzhdJPCMdnqI%2B16onQ1BG8UUvWUVGRcTFcmdyr%2FalhiCZjSzSb9%2BSz1gNCN7adcDe%2FGfuen%2B%2BMm8wdU7wbHbr67008fbc%2Bva1ovPD9U2u29ZisYqIk%2F%2BN6gmc33KOE6ijR3O6Qbi1u51TOicIEnwhN7K9QFW3adX3pBbs%2FU89%2Fy8uGvBdoxvLjQhAFNiJCyEHOIcebOubMSt%2FqW7irMD%2BJuGf9XCllA5JVmc7e8ITON272kvpZ%2BG6dg4WOgYi0svdzk3JI5evEzDh2KrVBjrgAVFY4zIf00yS1Q5V7rTFtmNcvWUP0dwbHZkAoNkjOs%2BwmrOPq%2FebtfARmH08Pwn312bxhPqu5KylwJlSi5EqD2AZdsmx1rQ4UAEuYvlnDEPxKO9gUDjHPXLComzRI0%2BlVafEKcw1Gp0KNSkNiR%2BE3%2BapQSGoMx2vdKC%2B3gbfblmawL0hJIcGUqdQ7zXYN9nJ7%2FSWDxbWkdJQLpbAX604%2BCgvd3WTTJVlgE6X7XrrqbhUlgt2Mv27WDOSF3k49J6FXseFOM8%2B%2FmS8GGEVtt3WxL4lYh9mY5o5GSVZrgZJyZ9y&X-Amz-Signature=bb4e41e0c2551243a6fc7c489cc57b675e627dc1b727d7085758d233728218a7&X-Amz-SignedHeaders=host&response-content-disposition=inline'

    return (
        <div className='relative h-195 lg:h-screen w-full flex items-center justify-center overflow-hidden font-display z-10'>
            <video className='absolute inset-0 w-full h-full object-cover z-0' autoPlay loop muted playsInline preload="metadata" poster='../images/saadiyat.jpg'>
                <source src="/videos/WephcoV1-compressed.mp4" type="video/mp4" />
            </video>
            <div className='absolute inset-0 bg-linear-to-b from-background-dark/35 via-background-dark/20 to-background-dark/10 z-10'></div>

            <div className='relative z-20 text-center text-white px-6 max-w-4xl pt-16 w-full'>
                <h1 className='text-4xl md:text-7xl font-light mb-6 tracking-tight leading-tight'>
                    Secure Your<br className="md:hidden" />
                    <span className='font-extrabold italic text-primary'>Investment</span>
                </h1>
                <p className='text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-4'>
                    With Over $35 Million Sold — Wephco is the most reliable luxury real estate advisory, bridging ambition with generational legacy.
                </p>
                <div className="col-span-1">
                    <button onClick={() => router.push('/properties')} className="bg-primary px-3 py-4 rounded-lg hover:bg-primary/90 cursor-pointer text-black w-50">Search for Property</button>
                </div>
            </div>
        </div>
    )
}

export { Hero }
