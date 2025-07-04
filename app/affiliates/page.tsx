'use client'

import React from 'react'
import { Hero } from './(components)/Hero'
import { Footer } from '@/components/Footer'
import celebration from '@/images/group-celebration.jpg'
import Image from 'next/image'
import { AgentPerkItem } from './(components)/AgentPerkItem'
import Link from 'next/link'
import { BiCaretRight } from 'react-icons/bi'
import luxuryAgent from '@/images/luxury-agent.jpg'
import agentNetwork from '@/images/agent-network.jpg'
import { AgentForm } from './(components)/AgentForm'


const AgentsPage = () => {

    const goToAgentForm = () => {
        const form = document.getElementById('agent-form')
        form?.scrollIntoView({behavior:'smooth'})
    }

  return (
    <div>
        <Hero onButtonClick={goToAgentForm} />

        <section className='py-20 px-10 font-outfit'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='col-span-1'>
                    <h3 className='text-gray-500 uppercase font-semibold text-lg mb-5 text-center md:text-start'>The Wephco Difference</h3>
                    <h2 className='text-primary font-bold text-3xl text-center md:text-start'>Respect For Your Talent. Value For Your Business</h2>
                </div>
                <div className='col-span-1'>
                    <p className='text-gray-600 font-mono text-sm lg:text-lg'>
                    Don't just join another brokerage; become part of a revolution. The WEPHCO Difference is an ecosystem designed for ambitious, driven, and forward-thinking luxury real estate agents like you. The future of real estate is here—don't miss your opportunity to be a part of it.
                    </p>
                </div>
            </div>
        </section>

        <section className='py-20 px-10 font-outfit'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='col-span-1'>
                    <div>
                        <Image src={celebration} alt='Agents Celebrating' className='rounded-4xl' />
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-8'>
                    <h3 className='text-gray-500 uppercase text-lg font-semibold'>What you can look forward to</h3>
                    <AgentPerkItem title='Boost Your Average Deal Size by Double-Digits' description='We empower agents to realize unprecedented growth in average deal size. In a market where every edge counts, backing yourself with the most followed real estate brand in the world elevates you to a level most only dream of reaching. High-value transactions await, and WEPHCO. is the key to helping you unlock them' />
                    <AgentPerkItem title='Experience Exponential Growth in Lead Generation' description="Take control of your narrative with our suite of unique, industry-leading services, including a full-scale in-house studio for your branding needs. Gain unparalleled authority and credibility, because when you succeed, we all do. With WEPHCO, you're not just growing a brand; you're building an empire." />
                    <AgentPerkItem title='Save Hours Per Week with State-of-the-Art Tech & Talented Advisors' description="Why let cumbersome processes eat away your valuable time? Our state-of-the-art technology cuts hours off your workflow. Spend your time where it matters most: closing deals and providing exceptional service. At WEPHCO, our technology and people serve you, not the other way around." />
                    <AgentPerkItem title='Build a World-Class Brand & Amplify Your Real Estate Following' description='Back your brand and your business with a full-service creative workshop, an award-winning cinema-quality content studio, and the proven formulas and modern strategies that built the most followed real estate brand on the planet. Supercharge your reach, capitalize on shifting consumer trends to social media, and establish yourself as a leading voice in your market and on the global stage.' />
                </div>
            </div>
        </section>

        <section className='py-20 px-10 font-outfit'>
            <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-12 my-20'>
                <div className="col-span-1 flex flex-col gap-10">
                    <AgentPerkItem title='Increase Your Earning Potential at WEPHCO.' description="Discover your true earning potential at WEPHCO, where agents earn on average four times more than industry standards. You're not just an agent; you're a business. We recognize that and invest in your success, making your profitability our priority." />
                    <Link href='#agent-form' className='bg-primary text-white py-2 px-3 w-full md:w-28 rounded-full flex items-center justify-between'>Join Us <BiCaretRight /></Link>
                </div>
                <div className="col-span-1">
                    <div>
                        <Image src={luxuryAgent} alt='Luxury' className='rounded-4xl' />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 my-20'>
                <div className="col-span-1">
                    <div>
                        <Image src={agentNetwork} alt='Luxury' className='rounded-4xl' />
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-10">
                    <AgentPerkItem title='Join a Network of Over 1,000 Like-Minded Agents' description="Join a network of over 1,000 agents who are shaping the future of real estate. Our proven models and systems aren't just theories—they're practices that have stood the test of success. Here, mentorship is mutual, and wisdom is shared. It's not just about individual success; it's about collective growth." />
                    <Link href='#agent-form' className='bg-primary text-white py-2 px-3 w-full md:w-28 rounded-full flex items-center justify-between'>Join Us <BiCaretRight /></Link>
                </div>
            </div>
        </section>
        <AgentForm id='agent-form' />
        <Footer />
    </div>
  )
}

export default AgentsPage