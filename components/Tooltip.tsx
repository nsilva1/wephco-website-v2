import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface TooltipProps {
  text: string; // The text to display in the tooltip
  children: ReactNode; // The element to hover over
  position?: 'top' | 'bottom' | 'left' | 'right'; // Optional: Tooltip position
  className?: string; // Optional: Additional classes for the wrapper
  tooltipClassName?: string; // Optional: Additional classes for the tooltip itself
}

const Tooltip = ({
  text,
  children,
  position = 'top', // Default position is 'top'
  className = '',
  tooltipClassName = '',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const childrenRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Function to show the tooltip
  const showTooltip = () => setIsVisible(true);
  // Function to hide the tooltip
  const hideTooltip = () => setIsVisible(false);

  // Effect to calculate and update tooltip position when it becomes visible
  useEffect(() => {
    if (isVisible && childrenRef.current && tooltipRef.current) {
      const childrenRect = childrenRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const space = 10; // Space between the element and the tooltip

      let top = 0;
      let left = 0;

      // Calculate position based on the 'position' prop
      switch (position) {
        case 'top':
          top = childrenRect.top - tooltipRect.height - space;
          left = childrenRect.left + (childrenRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = childrenRect.bottom + space;
          left = childrenRect.left + (childrenRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = childrenRect.top + (childrenRect.height - tooltipRect.height) / 2;
          left = childrenRect.left - tooltipRect.width - space;
          break;
        case 'right':
          top = childrenRect.top + (childrenRect.height - tooltipRect.height) / 2;
          left = childrenRect.right + space;
          break;
        default: // Default to 'top'
          top = childrenRect.top - tooltipRect.height - space;
          left = childrenRect.left + (childrenRect.width - tooltipRect.width) / 2;
      }
      // Adjust for window scroll position
      setTooltipPosition({ top: top + window.scrollY, left: left + window.scrollX });
    }
  }, [isVisible, position, text]); // Rerun if visibility, position, or text changes

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip} // Show on focus for accessibility
      onBlur={hideTooltip} // Hide on blur for accessibility
      tabIndex={0} // Make it focusable
      ref={childrenRef}
    >
      {/* The element that triggers the tooltip */}
      {children}
      {/* The tooltip itself, rendered conditionally */}
      {isVisible && text && (
        <div
          ref={tooltipRef}
          role="tooltip" // ARIA role for accessibility
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          className={`
            fixed
            bg-gray-800 text-white text-xs rounded-md px-3 py-2 z-50
            whitespace-nowrap shadow-lg
            transition-opacity duration-200 ease-in-out
            ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            ${tooltipClassName}
          `}
        >
          {text}
          {/* Optional: Arrow for the tooltip (Tailwind doesn't have direct arrow classes, so this is a simple implementation) */}
          {position === 'top' && <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-800"></div>}
          {position === 'bottom' && <div className="absolute left-1/2 -translate-x-1/2 top-[-4px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-800"></div>}
          {position === 'left' && <div className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-800"></div>}
          {position === 'right' && <div className="absolute top-1/2 -translate-y-1/2 left-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-800"></div>}
        </div>
      )}
    </div>
  );
};

export { Tooltip };