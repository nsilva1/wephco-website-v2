import React from 'react';

interface ITabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ isActive, onClick, children }: ITabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-3 rounded-md text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-gray-500
        transition-colors duration-150 ease-in-out
        ${
          isActive
            ? 'bg-black text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white' // Inactive tab
        }
      `}>
      {children}
    </button>
  );
};

export { TabButton };
