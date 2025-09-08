'use client'

import React, { useState } from 'react'
import { Hero } from './(components)/Hero'
import { wephcoServices } from '@/lib/constants'
import { ServiceCard } from './(components)/ServiceCard'

const ServicesPage = () => {
    const [step, setStep] = useState(0)

    const servicesLength = wephcoServices.length - 1

    const increaseStep = () => {
        setStep((prev) => prev + 1)
    }

    const decreaseStep = () => {
        setStep((prev) => prev - 1)
    }


  return (
    <div>
        <Hero />
        <div className='bg-[#eee3d1] p-20'>
            <ServiceCard increaseStep={increaseStep} decreaseStep={decreaseStep} step={step} length={servicesLength} imageURL={wephcoServices[step].image} title={wephcoServices[step].title} description={wephcoServices[step].description} />
        </div>
    </div>
  )
}

export default ServicesPage