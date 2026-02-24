import React from 'react';

const AgentPerkItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-wephco font-bold text-2xl mb-6">{title}</h2>
      <p className="font-mono leading-6 text-black dark:text-gray-400 text-sm lg:text-lg">
        {description}
      </p>
    </div>
  );
};

export { AgentPerkItem };
