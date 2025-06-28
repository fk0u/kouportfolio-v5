import React from 'react';
import { Home, Briefcase, BookOpen, User, Award, GraduationCap, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface DockProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Dock: React.FC<DockProps> = ({ activeSection, onSectionChange }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const dockItems = [
    { id: 'home', icon: Home, label: t('nav.home'), color: 'from-blue-500 to-blue-600' },
    { id: 'projects', icon: Briefcase, label: t('nav.projects'), color: 'from-purple-500 to-purple-600' },
    { id: 'blog', icon: BookOpen, label: t('nav.blog'), color: 'from-green-500 to-green-600' },
    { id: 'about', icon: User, label: t('nav.about'), color: 'from-orange-500 to-orange-600' },
    { id: 'achievements', icon: Award, label: t('nav.achievements'), color: 'from-yellow-500 to-yellow-600' },
    { id: 'certificates', icon: GraduationCap, label: t('nav.certificates'), color: 'from-indigo-500 to-indigo-600' },
    { id: 'support', icon: Heart, label: t('nav.support'), color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40 px-4">
      <div className={`
        flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-2xl
        ${isDark 
          ? 'bg-black/40 border-white/20' 
          : 'bg-white/40 border-black/10'
        } 
        backdrop-blur-2xl border shadow-2xl
        animate-slide-up max-w-[calc(100vw-2rem)]
      `}>
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl
                transition-all duration-300 hover:scale-110 active:scale-95
                ${isActive 
                  ? `bg-gradient-to-br ${item.color} shadow-lg` 
                  : `${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`
                }
              `}
              title={item.label}
            >
              <Icon 
                className={`
                  w-5 h-5 md:w-6 md:h-6 transition-colors duration-300
                  ${isActive 
                    ? 'text-white' 
                    : isDark 
                      ? 'text-gray-300 group-hover:text-white' 
                      : 'text-gray-600 group-hover:text-gray-900'
                  }
                `} 
              />
              
              {/* Tooltip */}
              <div className={`
                absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap
                ${isDark 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-gray-900 text-white'
                }
                border opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none z-50
              `}>
                {item.label}
                <div className={`
                  absolute top-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDark ? 'border-t-gray-800' : 'border-t-gray-900'}
                `}></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;