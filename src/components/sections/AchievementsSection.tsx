import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';
import { Achievement } from '../../types';

const AchievementsSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  const achievements: Achievement[] = [
    {
      title: { en: 'Student Competency Competition (LKS) 2025', id: 'Lomba Kompetensi Siswa (LKS) 2025' },
      organization: { en: 'Samarinda City Government', id: 'Pemerintah Kota Samarinda' },
      position: { en: '3rd Place', id: 'Juara 3' },
      date: 'May 2025',
      level: { en: 'Web Technology - City Level', id: 'Teknologi Web - Tingkat Kota' }
    },
    {
      title: { en: 'Sentech in Borneo SMKN 7 Samarinda Classmeet', id: 'Sentech in Borneo SMKN 7 Samarinda Classmeet' },
      organization: { en: 'SMKN 7 Samarinda', id: 'SMKN 7 Samarinda' },
      position: { en: '1st Place', id: 'Juara 1' },
      date: 'December 2025',
      level: { en: 'Web Design', id: 'Desain Web' }
    },
    {
      title: { en: 'Ruangguru Science Competition (KSR) 2025', id: 'Kompetisi Sains Ruangguru (KSR) 2025' },
      organization: { en: 'Ruangguru', id: 'Ruangguru' },
      position: { en: 'Top 200', id: 'Top 200' },
      date: 'September 2024',
      level: { en: 'Biology SMA', id: 'Biologi SMA' }
    },
    {
      title: { en: 'CBP SummerFest 2025 Bank Indonesia East Kalimantan', id: 'CBP SummerFest 2025 Bank Indonesia Prov. Kalimantan Timur' },
      organization: { en: 'Bank Indonesia East Kalimantan', id: 'Bank Indonesia Prov. Kalimantan Timur' },
      position: { en: 'Honorable Mention 1', id: 'Honorable Mention 1' },
      date: 'August 2024',
      level: { en: 'Creative Content - Provincial Level', id: 'Konten Kreatif - Tingkat Provinsi' }
    },
    {
      title: { en: 'CBP SummerFest 2025 Bank Indonesia East Kalimantan', id: 'CBP SummerFest 2025 Bank Indonesia Prov. Kalimantan Timur' },
      organization: { en: 'Bank Indonesia East Kalimantan', id: 'Bank Indonesia Prov. Kalimantan Timur' },
      position: { en: '3rd Place', id: 'Juara 3' },
      date: 'August 2024',
      level: { en: 'Creative Content - City Level', id: 'Konten Kreatif - Tingkat Kota' }
    }
  ];

  const getPositionColor = (position: string) => {
    if (position.includes('1st') || position.includes('Juara 1')) {
      return 'from-yellow-500 to-yellow-600';
    } else if (position.includes('2nd') || position.includes('Juara 2')) {
      return 'from-gray-400 to-gray-500';
    } else if (position.includes('3rd') || position.includes('Juara 3')) {
      return 'from-orange-500 to-orange-600';
    } else {
      return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <section className="min-h-screen py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16 transition-all duration-1000
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('nav.achievements')}
          </h2>
          <p className={`
            text-xl
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {currentLanguage.code === 'id' ? 'Pencapaian' : 'My Achievements'}
          </p>
        </div>

        {/* Achievements List */}
        <div className="space-y-6">
          {achievements.map((achievement, index) => (
            <GlassCard
              key={index}
              className={`
                p-6 transition-all duration-500 delay-${index * 100}
                ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <div className="flex items-start gap-4">
                {/* Trophy Icon */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl
                  bg-gradient-to-br ${getPositionColor(achievement.position[currentLanguage.code])}
                  flex items-center justify-center
                `}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                
                {/* Achievement Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className={`
                      text-xl font-bold
                      ${isDark ? 'text-white' : 'text-gray-900'}
                    `}>
                      {achievement.title[currentLanguage.code]}
                    </h3>
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      bg-gradient-to-r ${getPositionColor(achievement.position[currentLanguage.code])}
                      text-white
                    `}>
                      {achievement.position[currentLanguage.code]}
                    </span>
                  </div>
                  
                  <p className={`
                    text-lg font-medium
                    ${isDark ? 'text-blue-300' : 'text-blue-600'}
                  `}>
                    {achievement.organization[currentLanguage.code]}
                  </p>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className={`
                        w-4 h-4
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `} />
                      <span className={`
                        text-sm
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        {achievement.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className={`
                        w-4 h-4
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `} />
                      <span className={`
                        text-sm
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        {achievement.level[currentLanguage.code]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Stats Summary */}
        <div className={`
          mt-16 transition-all duration-1000 delay-500
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="p-6 text-center">
              <div className={`
                text-3xl font-bold mb-2
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                5
              </div>
              <div className={`
                text-sm
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {currentLanguage.code === 'id' ? 'Total Pencapaian' : 'Total Achievements'}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className={`
                text-3xl font-bold mb-2 text-yellow-500
              `}>
                1
              </div>
              <div className={`
                text-sm
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {currentLanguage.code === 'id' ? 'Juara 1' : '1st Place'}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className={`
                text-3xl font-bold mb-2 text-orange-500
              `}>
                2
              </div>
              <div className={`
                text-sm
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {currentLanguage.code === 'id' ? 'Juara 3' : '3rd Place'}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className={`
                text-3xl font-bold mb-2 text-blue-500
              `}>
                2
              </div>
              <div className={`
                text-sm
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {currentLanguage.code === 'id' ? 'Lainnya' : 'Others'}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;