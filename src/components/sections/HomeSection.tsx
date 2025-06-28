import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin, TrendingUp, Star, GitFork, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';
import TypewriterText from '../TypewriterText';
import CVDownloadButton from '../CVDownloadButton';
import { useState, useEffect } from 'react';
import { getGitHubStats } from '../../lib/github';

const HomeSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);
  const [githubStats, setGithubStats] = useState<any>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const stats = await getGitHubStats('fk0u');
        setGithubStats(stats);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/fk0u',
      handle: 'Fk0u',
      color: 'hover:text-gray-900'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/alghani',
      handle: 'alghani',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/kou.sozo',
      handle: '@kou.sozo',
      color: 'hover:text-pink-600'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:official@kou.my.id',
      handle: 'official@kou.my.id',
      color: 'hover:text-red-600'
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      currentLanguage.code === 'id' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-6 px-6">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 text-center lg:text-left space-y-8">
            {/* Profile Image */}
            <div className={`
              transition-all duration-1000 delay-200
              ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                  <div className={`
                    w-full h-full rounded-3xl flex items-center justify-center text-4xl font-bold text-white
                    ${isDark ? 'bg-gray-900' : 'bg-white'}
                  `}>
                    <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      KOU
                    </span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>

            {/* Name and Title */}
            <div className={`
              space-y-6 transition-all duration-1000 delay-300
              ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <div className="space-y-2">
                <h1 className={`
                  text-4xl md:text-6xl lg:text-7xl font-bold
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}>
                  Al-Ghani Desta Setyawan
                </h1>
                <p className={`
                  text-xl md:text-2xl
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  (aka) KOU
                </p>
              </div>

              <div className="space-y-2">
                <p className={`
                  text-lg md:text-xl
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {t('profile.bio')} <TypewriterText />
                </p>
                <p className={`
                  text-lg md:text-xl
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {t('profile.experience')}
                </p>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{t('profile.basedIn')}</span>
              </div>
            </div>

            {/* CV Download Button - Positioned to avoid overlap with proper z-index */}
            <div className={`
              flex justify-center lg:justify-start transition-all duration-1000 delay-400 relative z-10
              ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <CVDownloadButton />
            </div>

            {/* Social Links - Lower z-index to ensure CV modal appears above */}
            <div className={`
              transition-all duration-1000 delay-500 relative z-0
              ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <GlassCard
                      key={social.name}
                      className={`
                        transition-all duration-300 delay-${index * 100} relative z-0
                        ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      `}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex flex-col items-center gap-3 p-6 rounded-2xl
                          transition-colors duration-300 ${social.color}
                          ${isDark ? 'text-gray-300' : 'text-gray-700'}
                        `}
                      >
                        <Icon className="w-6 h-6" />
                        <div className="text-center">
                          <div className="font-medium">{social.name}</div>
                          <div className="text-sm opacity-70">{social.handle}</div>
                        </div>
                      </a>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GitHub Stats Sidebar */}
          <div className={`
            lg:col-span-1 space-y-6 transition-all duration-1000 delay-700 relative z-0
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {githubStats && (
              <>
                {/* GitHub Profile Card */}
                <GlassCard className="p-6">
                  <div className="text-center space-y-4">
                    <img
                      src={githubStats.user.avatar_url}
                      alt="GitHub Avatar"
                      className="w-16 h-16 rounded-2xl mx-auto"
                    />
                    <div>
                      <h3 className={`
                        text-lg font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}
                      `}>
                        GitHub Profile
                      </h3>
                      <p className={`
                        text-sm
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                      `}>
                        @{githubStats.user.login}
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* GitHub Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <GlassCard className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`
                        text-2xl font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}
                      `}>
                        {githubStats.totalStars}
                      </span>
                    </div>
                    <div className={`
                      text-xs
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {currentLanguage.code === 'id' ? 'Bintang' : 'Stars'}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GitFork className="w-4 h-4 text-blue-500" />
                      <span className={`
                        text-2xl font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}
                      `}>
                        {githubStats.totalForks}
                      </span>
                    </div>
                    <div className={`
                      text-xs
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {currentLanguage.code === 'id' ? 'Fork' : 'Forks'}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className={`
                        text-2xl font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}
                      `}>
                        {githubStats.totalRepos}
                      </span>
                    </div>
                    <div className={`
                      text-xs
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {currentLanguage.code === 'id' ? 'Repo' : 'Repos'}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full bg-purple-500"></span>
                      <span className={`
                        text-2xl font-bold
                        ${isDark ? 'text-white' : 'text-gray-900'}
                      `}>
                        {githubStats.languagesCount}
                      </span>
                    </div>
                    <div className={`
                      text-xs
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {currentLanguage.code === 'id' ? 'Bahasa' : 'Languages'}
                    </div>
                  </GlassCard>
                </div>

                {/* Latest Repository */}
                {githubStats.topRepos && githubStats.topRepos[0] && (
                  <GlassCard className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className={`
                          text-sm font-medium
                          ${isDark ? 'text-white' : 'text-gray-900'}
                        `}>
                          {currentLanguage.code === 'id' ? 'Update Terbaru' : 'Latest Update'}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className={`
                          font-bold text-sm line-clamp-1
                          ${isDark ? 'text-blue-300' : 'text-blue-600'}
                        `}>
                          {githubStats.topRepos[0].name}
                        </h4>
                        <p className={`
                          text-xs line-clamp-2 mt-1
                          ${isDark ? 'text-gray-400' : 'text-gray-600'}
                        `}>
                          {githubStats.topRepos[0].description}
                        </p>
                        <p className={`
                          text-xs mt-2
                          ${isDark ? 'text-gray-500' : 'text-gray-500'}
                        `}>
                          {formatDate(githubStats.topRepos[0].updated_at)}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`
          text-center mt-12 transition-all duration-1000 delay-900 relative z-0
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="flex justify-center">
            <div className="animate-bounce">
              <div className={`
                w-6 h-10 rounded-full border-2 flex justify-center
                ${isDark ? 'border-white/30' : 'border-gray-400'}
              `}>
                <div className={`
                  w-1 h-3 rounded-full mt-2 animate-pulse
                  ${isDark ? 'bg-white/50' : 'bg-gray-500'}
                `}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;