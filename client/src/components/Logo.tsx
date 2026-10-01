import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: { title: 'text-lg', sub: 'text-[9px]' },
    md: { title: 'text-2xl', sub: 'text-[10px]' },
    lg: { title: 'text-3xl', sub: 'text-[11px]' },
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Emblem Mark (from Stitch Design System) */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-2xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] shadow-sm flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Chef cloche / dome */}
          <path
            d="M8 22C8 17 12 13 18 13C24 13 28 17 28 22C28 26 25 28 21 28H15C11 28 8 26 8 22Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Golden garnish / flame spark */}
          <circle cx="18" cy="9.5" r="2.8" fill="#fef08a" />
          {/* Subtle grill lines */}
          <path
            d="M13 21H23M14 24H22"
            stroke="#ea580c"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-black ${textSizes[size].title} tracking-tight text-[#111c2d] leading-none`}>
            Cravo<span className="text-primary">.</span>
          </span>
          <span className={`font-display font-bold ${textSizes[size].sub} uppercase tracking-[0.18em] text-[#8e7166] mt-0.5 leading-none`}>
            Kitchen & Bar
          </span>
        </div>
      )}
    </div>
  );
};
