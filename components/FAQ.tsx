"use client"

import { useState } from "react"
import { faqData } from "@/lib/constants"
import { Plus } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-24 bg-secondary/5 border-t border-primary/10 font-display z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
            Knowledge Base
          </span>
          <h3 className="text-4xl font-light text-white">
            Common <span className="font-extrabold text-primary">Inquiries</span>
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border border-primary/10 bg-background-dark/50 rounded-lg p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              onClick={() => toggleItem(index)}
            >
              <button
                className="w-full text-left flex justify-between items-center cursor-pointer outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-medium text-white pr-4">{item.question}</span>
                <span className={`material-symbols-outlined text-primary text-xl transition-transform duration-300 shrink-0 ${
                  openIndex === index ? "rotate-45" : "group-hover:rotate-45"
                }`}>
                  <Plus size={24} />
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-400 text-sm font-light leading-relaxed border-t border-primary/5 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { FAQ }
