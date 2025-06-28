import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, languages } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4 md:p-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className={`
          flex items-center gap-3 px-4 py-2 rounded-xl
          ${isDark 
            ? 'bg-black/20 border-white/10' 
            : 'bg-white/20 border-black/5'
          } 
          backdrop-blur-md border
        `}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">KOU</span>
          </div>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Portfolio
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative group">
            <button className={`
              flex items-center gap-2 px-3 py-2 rounded-xl
              ${isDark 
                ? 'bg-black/20 border-white/10 hover:bg-black/30' 
                : 'bg-white/20 border-black/5 hover:bg-white/30'
              } 
              backdrop-blur-md border transition-all duration-200
            `}>
              <Globe className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentLanguage.flag}
              </span>
            </button>
            
            {/* Language Dropdown */}
            <div className={`
              absolute top-full right-0 mt-2 py-2 rounded-xl min-w-[120px]
              ${isDark 
                ? 'bg-black/40 border-white/10' 
                : 'bg-white/40 border-black/10'
              } 
              backdrop-blur-md border shadow-xl
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none group-hover:pointer-events-auto
            `}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang)}
                  className={`
                    flex items-center gap-2 w-full px-3 py-2 text-left
                    ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-gray-900'}
                    transition-colors duration-200
                    ${currentLanguage.code === lang.code ? 'opacity-50' : ''}
                  `}
                  disabled={currentLanguage.code === lang.code}
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              flex items-center justify-center w-10 h-10 rounded-xl
              ${isDark 
                ? 'bg-black/20 border-white/10 hover:bg-black/30' 
                : 'bg-white/20 border-black/5 hover:bg-white/30'
              } 
              backdrop-blur-md border transition-all duration-200 hover:scale-105
            `}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;