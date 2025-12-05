import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-neon-surface/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
};