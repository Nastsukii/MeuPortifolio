import React from 'react';

interface GreenBeamCardProps {
  children: React.ReactNode;
  className?: string;
  beamColor?: string;
}

/**
 * GreenBeamCard Component
 * Wraps content in a card with a rotating green beam border effect.
 */
export const GreenBeamCard = ({ children, className = '', beamColor = '#22c55e' }: GreenBeamCardProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl p-[2px] group ${className}`}>
      {/* Rotating Beam Background */}
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-100"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${beamColor} 50%, transparent 100%)`
        }}
      />
      
      {/* Content Container */}
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-[10px] p-6 z-10 transition-colors duration-300">
        {children}
      </div>
    </div>
  );
};
