import React from 'react';

const Loader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div
          className={`animate-spin rounded-full border-4 border-black dark:border-white dark:border-t-transparent border-t-transparent ${sizeClasses[size]}`}
        ></div>
      </div>
    </div>
  );
};

export { Loader };
