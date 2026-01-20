import React from 'react';

export const GlassCard = ({ children, className = "", onClick, hoverEffect = true }: { children: React.ReactNode, className?: string, onClick?: () => void, hoverEffect?: boolean }) => (
    <div
        onClick={onClick}
        className={`
      backdrop-blur-2xl bg-white/5 
      border border-white/30 
      rounded-3xl p-8 
      shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]
      transition-all duration-500 
      ${hoverEffect ? 'hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)]' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
        style={{
            boxShadow: '0 0 30px -5px rgba(255, 255, 255, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.02)'
        }}
    >
        {children}
    </div>
);
