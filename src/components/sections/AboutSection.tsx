import React from 'react';
import { Code, Palette, Camera, Video, Lightbulb, Cpu, Monitor } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  const skills = [
    { name: t('skills.webDesign'), icon: Monitor, color: 'from-blue-500 to-blue-600' },
    { name: t('skills.uiDesign'), icon: Palette, color: 'from-purple-500 to-purple-600' },
    { name: t('skills.photography'), icon: Camera, color: 'from-green-500 to-green-600' },
    { name: t('skills.videography'), icon: Video, color: 'from-red-500 to-red-600' },
    { name: t('skills.creativeDirector'), icon: Lightbulb, color: 'from-yellow-500 to-yellow-600' },
    { name: t('skills.aiEngineering'), icon: Cpu, color: 'from-indigo-500 to-indigo-600' },
    { name: t('skills.frontendDev'), icon: Code, color: 'from-pink-500 to-pink-600' },
  ];

  const techStack = {
    'Programming Languages': ['JavaScript', 'NodeJS', 'PHP', 'Python', 'C++', 'C#', 'Lua', 'R', 'Visual Basic'],
    'Frameworks/Libraries': ['React', 'Vue', 'NextJS', 'Ionic', 'Laravel', 'Bootstrap', 'Tailwind'],
    'Databases': ['MySQL', 'PostgreSQL', 'Supabase'],
    'Tools': ['Figma', 'Postman']
  };

  const uniqueThings = [
    t('unique.coding'),
    t('unique.otaku'),
    t('unique.coffee')
  ];

  const experience = {
    title: t('exp.webDeveloper'),
    company: t('exp.education'),
    period: t('exp.period'),
    description: t('exp.description')
  };

  const education = {
    school: t('edu.school'),
    program: t('edu.program'),
    period: t('edu.period'),
    status: t('edu.status')
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
            {t('nav.about')}
          </h2>
        </div>

        <div className="space-y-16">
          {/* What I Can Do */}
          <div className={`
            transition-all duration-1000 delay-200
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h3 className={`
              text-2xl font-bold mb-8 text-center
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              {t('section.whatCanIDo')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <GlassCard
                    key={skill.name}
                    className={`
                      p-4 text-center transition-all duration-300 delay-${index * 50}
                      ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                  >
                    <div className="space-y-3">
                      <div className={`
                        w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} 
                        flex items-center justify-center mx-auto
                      `}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className={`
                        text-sm font-medium
                        ${isDark ? 'text-gray-300' : 'text-gray-700'}
                      `}>
                        {skill.name}
                      </p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div className={`
            transition-all duration-1000 delay-300
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h3 className={`
              text-2xl font-bold mb-8 text-center
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              {t('section.techStack')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(techStack).map(([category, items], index) => (
                <GlassCard
                  key={category}
                  className={`
                    p-6 transition-all duration-500 delay-${index * 100}
                    ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                >
                  <h4 className={`
                    text-lg font-semibold mb-4
                    ${isDark ? 'text-white' : 'text-gray-900'}
                  `}>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${isDark 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                          }
                        `}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div className={`
            grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 delay-400
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {/* Experience */}
            <GlassCard className="p-6">
              <h3 className={`
                text-xl font-bold mb-4
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                {t('section.experience')}
              </h3>
              <div className="space-y-3">
                <h4 className={`
                  text-lg font-semibold
                  ${isDark ? 'text-blue-300' : 'text-blue-600'}
                `}>
                  {experience.title}
                </h4>
                <p className={`
                  font-medium
                  ${isDark ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {experience.company}
                </p>
                <p className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {experience.period}
                </p>
                <p className={`
                  text-sm leading-relaxed
                  ${isDark ? 'text-gray-300' : 'text-gray-600'}
                `}>
                  {experience.description}
                </p>
              </div>
            </GlassCard>

            {/* Education */}
            <GlassCard className="p-6">
              <h3 className={`
                text-xl font-bold mb-4
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                {t('section.education')}
              </h3>
              <div className="space-y-3">
                <h4 className={`
                  text-lg font-semibold
                  ${isDark ? 'text-purple-300' : 'text-purple-600'}
                `}>
                  {education.school}
                </h4>
                <p className={`
                  font-medium
                  ${isDark ? 'text-gray-300' : 'text-gray-700'}
                `}>
                  {education.program}
                </p>
                <p className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {education.period}
                </p>
                <p className={`
                  text-sm
                  ${isDark ? 'text-green-300' : 'text-green-600'}
                `}>
                  {education.status}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Unique Things */}
          <div className={`
            transition-all duration-1000 delay-500
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h3 className={`
              text-2xl font-bold mb-8 text-center
              ${isDark ? 'text-white' : 'text-gray-900'}
            `}>
              {t('section.uniqueThings')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {uniqueThings.map((thing, index) => (
                <GlassCard
                  key={index}
                  className={`
                    p-6 text-center transition-all duration-500 delay-${index * 100}
                    ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                >
                  <p className={`
                    text-lg
                    ${isDark ? 'text-gray-300' : 'text-gray-700'}
                  `}>
                    {thing}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;