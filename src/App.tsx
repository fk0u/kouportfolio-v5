import { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import CTAButton from './components/CTAButton';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';

// Lazy load heavy sections below the fold
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Reduced from 4000ms for better UX

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-anima-cyan selection:text-bg-primary">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-2 border-anima-cyan border-t-transparent rounded-full animate-spin"></div></div>}>
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </Suspense>
          </main>
          <CTAButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;