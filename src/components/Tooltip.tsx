import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-[#1E1E1E] rounded-md shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap min-w-max"
          style={{ pointerEvents: 'none' }}
        >
          {text}
          <div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-[#1E1E1E] rotate-45"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}
    </div>
  );
};