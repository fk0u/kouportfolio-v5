import React from 'react';
import { Code, Palette, Camera, Video, Lightbulb, Cpu } from 'lucide-react';

const AboutSection: React.FC = () => {
  const philosophies = [
    {
      title: 'Codex',
      subtitle: 'Logic & Structure',
      description: 'The systematic approach to problem-solving, where clean code meets efficient algorithms.',
      icon: Code,
      color: 'text-anima-cyan'
    },
    {
      title: 'Anima',
      subtitle: 'Creativity & Soul',
      description: 'The artistic vision that breathes life into digital experiences, making technology human.',
      icon: Palette,
      color: 'text-anima-magenta'
    }
  ];

  const skills = [
    { name: 'Frontend Development', icon: Code, level: 90 },
    { name: 'UI/UX Design', icon: Palette, level: 85 },
    { name: 'Photography', icon: Camera, level: 80 },
    { name: 'Videography', icon: Video, level: 75 },
    { name: 'Creative Direction', icon: Lightbulb, level: 85 },
    { name: 'AI Engineering', icon: Cpu, level: 70 },
  ];

  return (
    <section id="about" className="py-20 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-satoshi text-4xl md:text-5xl font-bold mb-6">
            <span className="text-text-primary">The </span>
            <span className="anima-gradient">Philosophy</span>
          </h2>
          <p className="font-inter text-xl text-text-secondary max-w-3xl mx-auto">
            Every great creation emerges from the harmony between logical thinking and creative expression.
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {philosophies.map((philosophy, index) => {
            const Icon = philosophy.icon;
            return (
              <div
                key={philosophy.title}
                className="glass-surface p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-bg-primary ${philosophy.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-satoshi text-2xl font-bold text-text-primary">
                      {philosophy.title}
                    </h3>
                    <p className="font-mono text-sm text-text-secondary">
                      {philosophy.subtitle}
                    </p>
                  </div>
                </div>
                <p className="font-inter text-text-secondary leading-relaxed">
                  {philosophy.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="font-satoshi text-3xl font-bold text-center mb-12">
            <span className="text-text-primary">Core </span>
            <span className="anima-gradient">Competencies</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="glass-surface p-6 rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="w-6 h-6 text-anima-cyan mr-3" />
                    <h4 className="font-inter font-semibold text-text-primary">
                      {skill.name}
                    </h4>
                  </div>
                  
                  <div className="w-full bg-bg-primary rounded-full h-2 mb-2">
                    <div
                      className="anima-gradient-bg h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-mono text-sm text-text-secondary">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Touch */}
        <div className="text-center glass-surface p-8 rounded-2xl">
          <h3 className="font-satoshi text-2xl font-bold mb-4">
            <span className="anima-gradient">Beyond the Code</span>
          </h3>
          <p className="font-inter text-text-secondary leading-relaxed max-w-3xl mx-auto">
            When I'm not architecting digital experiences, you'll find me exploring the intersection 
            of technology and art. I'm an otaku who finds inspiration in anime storytelling, 
            a K-pop enthusiast who appreciates creative production, and a coffee lover who 
            believes the best ideas brew over a perfect cup.
          </p>
          
          <div className="mt-6 font-mono text-sm text-text-secondary">
            <span className="text-anima-cyan">// </span>
            Started coding at age 13 • Self-taught • Always learning
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;