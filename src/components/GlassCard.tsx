import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  const { isDark } = useTheme();

  return (
    <div className={`
      ${isDark 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/20 border-black/5'
      } 
      backdrop-blur-md border rounded-2xl
      ${hover ? 'hover:scale-105 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;