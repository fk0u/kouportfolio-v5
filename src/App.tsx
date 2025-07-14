import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import CTAButton from './components/CTAButton';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { ref: projectsRef, isIntersecting: projectsVisible } = useIntersectionObserver(0.1);
  const { ref: aboutRef, isIntersecting: aboutVisible } = useIntersectionObserver(0.1);

  useEffect(() => {
    // Simulate loading time for the typewriter effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-codex-primary text-codex-text">
      {isLoading && <LoadingScreen />}
      
      <main className="relative">
        {/* Hero Section */}
        <Hero />
        
        {/* Projects Section */}
        <section ref={projectsRef} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`transition-all duration-1000 ${projectsVisible ? 'fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <Projects />
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section ref={aboutRef} className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`transition-all duration-1000 ${aboutVisible ? 'fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <About />
            </div>
          </div>
        </section>
        
        {/* CTA Button */}
        <CTAButton />
      </main>
    </div>
  );
}

export default App;