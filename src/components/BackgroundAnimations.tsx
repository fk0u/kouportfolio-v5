import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundAnimations: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className={`
              absolute rounded-full blur-xl opacity-30
              ${isDark 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                : 'bg-gradient-to-r from-blue-300/30 to-purple-300/30'
              }
              animate-float
            `}
            style={{
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`
              absolute opacity-10 animate-spin
              ${isDark ? 'border-white/20' : 'border-gray-400/30'}
            `}
            style={{
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              animationDuration: `${10 + Math.random() * 10}s`,
              animationDirection: Math.random() > 0.5 ? 'normal' : 'reverse'
            }}
          />
        ))}
      </div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`
              absolute w-1 h-1 rounded-full animate-pulse
              ${isDark ? 'bg-white/40' : 'bg-gray-600/40'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <div className={`
          absolute inset-0 bg-gradient-to-t 
          ${isDark 
            ? 'from-blue-900/50 via-purple-800/30 to-transparent' 
            : 'from-blue-200/50 via-purple-100/30 to-transparent'
          }
          animate-pulse
        `} style={{ animationDuration: '4s' }} />
      </div>

      {/* Interactive Mouse Trail Effect */}
      <div className="absolute inset-0">
        <div className={`
          w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none
          ${isDark 
            ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30' 
            : 'bg-gradient-to-r from-cyan-300/40 to-blue-300/40'
          }
          transition-all duration-1000 ease-out
        `} 
        style={{
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%'
        }} />
      </div>
    </div>
  );
};

export default BackgroundAnimations;