import React from 'react';

interface ITabPaneProps {
  isActive: boolean;
  children: React.ReactNode;
}

const TabPane = ({ isActive, children }: ITabPaneProps) => {
  return (
    <div
      className={`
        ${isActive ? 'block' : 'hidden'}
        p-6 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800
      `}>
      {children}
    </div>
  );
};

export { TabPane };
