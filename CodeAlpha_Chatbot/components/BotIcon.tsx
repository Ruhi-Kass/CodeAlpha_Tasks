
import React from 'react';

interface BotIconProps {
  className?: string;
  size?: number;
}

export const BotIcon: React.FC<BotIconProps> = ({ className = "", size = 120 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
        {/* Main Body */}
        <circle cx="100" cy="110" r="70" fill="#ffffff" />
        <circle cx="100" cy="110" r="65" fill="#f0f9ff" />
        
        {/* Screen Face */}
        <rect x="55" y="80" width="90" height="60" rx="20" fill="#0ea5e9" />
        
        {/* Eyes */}
        <path d="M75 105 Q 85 95, 95 105" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M105 105 Q 115 95, 125 105" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        
        {/* Mouth */}
        <path d="M90 125 Q 100 135, 110 125" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Ears/Antennas */}
        <path d="M60 70 L 40 40 Q 35 35, 45 45 L 65 75 Z" fill="#0284c7" />
        <path d="M140 70 L 160 40 Q 165 35, 155 45 L 135 75 Z" fill="#0284c7" />
        
        {/* Glow Effects */}
        <circle cx="100" cy="110" r="80" fill="#0ea5e9" fillOpacity="0.1" />
      </svg>
    </div>
  );
};
