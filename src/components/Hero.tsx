import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(125, 249, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125, 249, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Al-Ghani Desta Setyawan
        </h1>
        
        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 anima-gradient-text">
          Expert Front-End Developer & UI/UX Architect
        </h2>
        
        {/* Tagline */}
        <h3 className="text-xl md:text-2xl font-heading font-bold text-codex-text-secondary mb-12">
          Architecting Digital Realities.
        </h3>
        
        {/* Anima Core - Placeholder for 3D element */}
        <div className="relative mx-auto mb-12">
          <div className="w-80 h-80 md:w-96 md:h-96 mx-auto relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-anima-cyan opacity-30 animate-spin" style={{ animationDuration: '20s' }} />
            
            {/* Middle ring */}
            <div className="absolute inset-8 rounded-full border border-anima-magenta opacity-50 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            
            {/* Inner core */}
            <div className="absolute inset-16 rounded-full bg-anima-gradient opacity-20 pulse-glow" />
            
            {/* Center element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-codex-surface border-2 anima-border flex items-center justify-center">
                <div className="font-mono text-sm anima-gradient-text font-bold">
                  ANIMA
                </div>
              </div>
            </div>
            
            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-anima-cyan rounded-full opacity-60"
                style={{
                  top: `${20 + Math.sin(i * Math.PI / 4) * 30}%`,
                  left: `${50 + Math.cos(i * Math.PI / 4) * 30}%`,
                  animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Philosophy text */}
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-codex-text-secondary leading-relaxed">
            Where <span className="anima-gradient-text font-bold">logic meets creativity</span>, 
            I craft digital experiences that bridge the gap between 
            <span className="text-anima-cyan font-mono"> code </span> 
            and 
            <span className="text-anima-magenta font-mono"> soul</span>.
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-anima-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-anima-cyan rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;