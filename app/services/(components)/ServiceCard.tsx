'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ServiceCard = ({
  imageURL,
  title,
  description,
  step,
  length,
  increaseStep,
  decreaseStep,
}: {
  imageURL: StaticImageData;
  title: string;
  description: string;
  step: number;
  length: number;
  increaseStep: () => void;
  decreaseStep: () => void;
}) => {
  return (
    <div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 md:p-16 font-outfit">
        <div className="col-span-1 relative image-shadow-container">
          <Image
            src={imageURL}
            alt="Service"
            width={400}
            height={500}
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-start items-start">
          <h2 className="text-wephco uppercase font-semibold">Our Services</h2>
          <hr className="text-black w-full" />
          <h2 className="text-black text-3xl my-8">{title}</h2>
          <p className="font-light mb-4 text-black">{description}</p>
          <div className="flex justify-between gap-20">
            <button
              onClick={decreaseStep}
              className={`${step === 0 ? 'bg-[#eee3d1] text-[#eee3d1] pointer-events-none' : 'flex bg-wephco'} items-center gap-2 text-wephco-foreground px-4 py-2 rounded-lg font-medium hover:bg-wephco/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors`}>
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={increaseStep}
              className={`${step === length ? 'bg-[#eee3d1] text-[#eee3d1] pointer-events-none' : 'flex bg-wephco'} items-center gap-2 text-wephco-foreground px-4 py-2 rounded-lg font-medium hover:bg-wephco/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors`}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex flex-col gap-4">
          <h2 className="text-wephco uppercase font-semibold text-center">
            Our Services
          </h2>
          <hr className="text-black w-full" />
          <h2 className="text-black text-xl font-bold my-8 text-center">
            {title}
          </h2>
          <p className="font-light mb-4 text-black text-center">
            {description}
          </p>
          <div className="flex justify-between">
            <button
              onClick={decreaseStep}
              className={`${step === 0 ? 'bg-[#eee3d1] text-[#eee3d1] pointer-events-none' : 'flex bg-wephco'} items-center gap-2 text-wephco-foreground px-4 py-2 rounded-lg font-medium hover:bg-wephco/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors`}>
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={increaseStep}
              className={`${step === length ? 'bg-[#eee3d1] text-[#eee3d1] pointer-events-none' : 'flex bg-wephco'} items-center gap-2 text-wephco-foreground px-4 py-2 rounded-lg font-medium hover:bg-wephco/80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors`}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServiceCard };
