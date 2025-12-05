import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 rounded-xl font-bold transition-all duration-200 uppercase tracking-wider transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,255,0.5)] border border-neon-pink hover:bg-fuchsia-600 hover:shadow-[0_0_25px_rgba(255,0,255,0.7)]",
    secondary: "bg-transparent text-neon-cyan border-2 border-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]",
    danger: "bg-red-600 text-white border border-red-500 shadow-lg hover:bg-red-700",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Glitch Overlay Effect on Primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
      )}
      {children}
    </button>
  );
};