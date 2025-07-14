import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? 'glass-surface' : 'bg-transparent'}
    `}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-satoshi text-2xl font-bold hover-anima">
            <span className="anima-gradient">Codex</span>
            <span className="text-text-primary">Anima</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-inter text-text-secondary hover-anima transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-text-secondary hover-anima">
                <Globe className="w-4 h-4" />
                <span className="font-mono text-sm">{currentLanguage.flag}</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 py-2 glass-surface rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang)}
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover-anima w-full text-left"
                  >
                    <span>{lang.flag}</span>
                    <span className="font-inter text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-primary hover-anima"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 glass-surface rounded-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 font-inter text-text-secondary hover-anima"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="px-4 py-2 border-t border-text-secondary/20 mt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-1 text-text-secondary hover-anima"
                >
                  <span>{lang.flag}</span>
                  <span className="font-inter text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;