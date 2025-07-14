import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import MobileDock from './components/MobileDock';
import Dock from './components/Dock';
import BackgroundAnimations from './components/BackgroundAnimations';
import HomeSection from './components/sections/HomeSection';
import ProjectsSection from './components/sections/ProjectsSection';
import BlogSection from './components/sections/BlogSection';
import AboutSection from './components/sections/AboutSection';
import AchievementsSection from './components/sections/AchievementsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import SupportSection from './components/sections/SupportSection';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('hasSeenSplash', 'true');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'blog':
        return <BlogSection />;
      case 'about':
        return <AboutSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'certificates':
        return <CertificatesSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-colors duration-500 relative">
          {/* Background Animations */}
          {!showSplash && <BackgroundAnimations />}
          
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          
          {!showSplash && (
            <>
              <Header />
              <main className="transition-all duration-500 relative z-10">
                {renderSection()}
              </main>
              
              {/* Mobile or Desktop Dock */}
              {isMobile ? (
                <MobileDock activeSection={activeSection} onSectionChange={setActiveSection} />
              ) : (
                <Dock activeSection={activeSection} onSectionChange={setActiveSection} />
              )}
            </>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;