import React from 'react'
import Hero from './(components)/Hero'
import { FeaturedProperties } from '@/components/FeaturedProperties'
import { Footer } from '@/components/Footer'

const Dubaiproperties = () => {
  return (
    <div>
        <Hero />
        <FeaturedProperties viewMore={false} />
        <Footer />
    </div>
  )
}

export default Dubaiproperties