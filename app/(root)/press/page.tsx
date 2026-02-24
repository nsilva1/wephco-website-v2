import React from 'react';
import { newsArticles } from '@/lib/constants';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { typography, layout } from '@/lib/styles';

const PressPage = () => {
  return (
    <div>
      <div className="p-8 my-20">
        <h3 className="lg:text-5xl text-4xl font-bold text-black dark:text-white mb-5 text-center">
          In the Press
        </h3>
        <p className="text-gray-500 mb-10 md:mb-20 text-center text-sm md:text-base">
          See what’s got everyone talking. Enjoy featured stories about our
          dynamic properties, agents, company,
          <br /> and more as the most followed real estate brand in the country.
        </p>
        {/* <hr className='my-8' /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {newsArticles.map((article, index) => (
            <div
              key={index}
              className={`p-4 flex flex-col gap-5 border-b md:border-b-0 md:border-r ${index === 2 ? 'border-b md:border-none' : ''}`}>
              <h4
                className={`${typography.subtitle} text-base font-semibold text-gray-500`}>
                {article.publication}
              </h4>
              <q className={`${typography.heading3} text-black font-bold`}>
                {article.title}
              </q>
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white hover:underline hover:animate-bounce flex">
                Read More
                <span>
                  <ChevronRight />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressPage;
