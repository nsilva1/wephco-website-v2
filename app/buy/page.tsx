'use client'

import React from 'react'
import { Hero } from './(components)/Hero'
import { Regions } from '@/components/Regions'
import { FeaturedProperties } from '@/components/FeaturedProperties'
import { ContactUs } from '@/components/ContactUs'
import { Footer } from '@/components/Footer'

const BuyPage = () => {

  const goToProperties = () => {
    const propertiesElement = document.getElementById('properties')
    propertiesElement?.scrollIntoView({behavior:'smooth'})
  }

  return (
    <section>
        <Hero goToProperties={goToProperties} />
        <Regions />
        <FeaturedProperties viewMore={false} numberOfProperties={9} id='properties' />
        <ContactUs />
        <Footer />
    </section>
  )
}

export default BuyPage