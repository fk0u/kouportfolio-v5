import React from 'react';
import { Heart, Coffee, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';

const SupportSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  return (
    <section className="min-h-screen py-20">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16 transition-all duration-1000
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('nav.support')}
          </h2>
          <p className={`
            text-xl
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {currentLanguage.code === 'id' 
              ? 'Dukung pekerjaan saya dengan membeli saya kopi!' 
              : 'Support my work by buying me a coffee!'
            }
          </p>
        </div>

        {/* Support Card */}
        <div className={`
          transition-all duration-1000 delay-200
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <GlassCard className="p-8 md:p-12 text-center">
            <div className="space-y-8">
              {/* Coffee Icon Animation */}
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center animate-bounce">
                  <Coffee className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full blur-xl animate-pulse"></div>
              </div>

              {/* Support Message */}
              <div className="space-y-4">
                <h3 className={`
                  text-2xl md:text-3xl font-bold
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}>
                  {currentLanguage.code === 'id' 
                    ? 'Suka dengan karya saya?' 
                    : 'Like my work?'
                  }
                </h3>
                
                <p className={`
                  text-lg leading-relaxed max-w-2xl mx-auto
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' 
                    ? 'Jika Anda menghargai proyek-proyek yang saya buat dan ingin mendukung pekerjaan saya, pertimbangkan untuk membelikan saya kopi. Dukungan Anda sangat berarti dan membantu saya terus berkarya!'
                    : 'If you appreciate the projects I create and want to support my work, consider buying me a coffee. Your support means a lot and helps me continue creating!'
                  }
                </p>
              </div>

              {/* Support Button */}
              <div className="space-y-4">
                <a
                  href="https://trakteer.id/kousozo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Heart className="w-6 h-6" />
                  {currentLanguage.code === 'id' ? 'Dukung di Trakteer' : 'Support on Trakteer'}
                  <ExternalLink className="w-5 h-5" />
                </a>
                
                <p className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {currentLanguage.code === 'id' 
                    ? 'Setiap dukungan sangat dihargai 💙'
                    : 'Every support is greatly appreciated 💙'
                  }
                </p>
              </div>

              {/* Features Supported */}
              <div className="pt-8 border-t border-gray-200/20">
                <p className={`
                  text-sm font-medium mb-4
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' 
                    ? 'Dukungan Anda membantu saya:'
                    : 'Your support helps me:'
                  }
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className={`
                    flex items-center gap-2
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {currentLanguage.code === 'id' 
                      ? 'Membuat proyek open source'
                      : 'Create open source projects'
                    }
                  </div>
                  
                  <div className={`
                    flex items-center gap-2
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {currentLanguage.code === 'id' 
                      ? 'Belajar teknologi baru'
                      : 'Learn new technologies'
                    }
                  </div>
                  
                  <div className={`
                    flex items-center gap-2
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    {currentLanguage.code === 'id' 
                      ? 'Berbagi pengetahuan'
                      : 'Share knowledge'
                    }
                  </div>
                  
                  <div className={`
                    flex items-center gap-2
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    {currentLanguage.code === 'id' 
                      ? 'Tetap termotivasi'
                      : 'Stay motivated'
                    }
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;