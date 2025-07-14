import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fk0u', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/alghani', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:official@kou.my.id', label: 'Email' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative grid-pattern">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className={`space-y-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-satoshi text-6xl md:text-8xl font-bold">
              <span className="text-text-primary">Digital</span>
              <br />
              <span className="anima-gradient">Architect</span>
            </h1>
            
            <div className="font-mono text-lg md:text-xl text-text-secondary">
              <span className="text-anima-cyan">const</span>
              <span className="text-text-primary"> identity = </span>
              <span className="text-anima-magenta">"</span>
              <span className="text-text-primary">Al-Ghani Desta Setyawan</span>
              <span className="text-anima-magenta">"</span>
            </div>
          </div>

          {/* Subtitle */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="font-inter text-xl md:text-2xl text-text-secondary leading-relaxed">
              Bridging the gap between <span className="anima-gradient font-semibold">logic</span> and 
              <span className="anima-gradient font-semibold"> creativity</span>, I craft digital experiences 
              that merge technical precision with artistic vision.
            </p>
            
            <div className="font-mono text-sm text-text-secondary">
              <span className="text-anima-cyan">// </span>
              17 years old • 2+ years experience • East Kalimantan, Indonesia
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-surface rounded-lg hover-anima transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="pt-8">
            <a
              href="#about"
              className="inline-flex items-center space-x-2 px-8 py-4 glass-surface rounded-lg hover-anima transition-all duration-300 hover:scale-105"
            >
              <span className="font-inter font-medium">Explore My Universe</span>
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-anima-cyan rounded-full float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-anima-magenta rounded-full float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-anima-cyan rounded-full float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-anima-magenta rounded-full float opacity-30" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-anima-gradient rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;