import React from 'react';

const About: React.FC = () => {
  const toolkit = {
    'Languages': [
      'TypeScript', 'JavaScript', 'Python', 'PHP', 'C++', 'C#', 'Lua', 'R'
    ],
    'Frameworks & Libraries': [
      'React', 'Vue.js', 'Next.js', 'Laravel', 'Ionic', 'Tailwind CSS', 'Bootstrap'
    ],
    'Design & Prototyping': [
      'Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Responsive Design', 'Design Systems'
    ],
    'Core Principles': [
      'Clean Architecture', 'Performance Optimization', 'Accessibility', 'User-Centered Design', 'Agile Development'
    ]
  };

  return (
    <div>
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
        The Architect's <span className="anima-gradient-text">Blueprint</span>
      </h2>
      <p className="text-center text-codex-text-secondary mb-16 max-w-2xl mx-auto">
        Understanding the mind behind the code, the vision behind the design.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Bio */}
        <div className="space-y-8">
          {/* Photo placeholder */}
          <div className="w-64 h-64 mx-auto lg:mx-0 rounded-lg bg-codex-surface border-2 anima-border flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-anima-gradient opacity-20" />
              <div className="font-mono text-sm text-anima-cyan">
                Professional Photo
              </div>
            </div>
          </div>
          
          {/* Biography */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              I am a <span className="anima-gradient-text font-bold">Digital Architect</span> who 
              bridges the gap between logical systems and creative expression. With over 2+ years 
              of experience in front-end development and UI/UX design, I specialize in crafting 
              digital experiences that are both functionally robust and aesthetically compelling.
            </p>
            
            <p className="text-lg leading-relaxed text-codex-text-secondary">
              My approach combines the precision of <span className="text-anima-cyan font-mono">code</span> with 
              the intuition of <span className="text-anima-magenta font-mono">design</span>, creating 
              digital realities that resonate with users on both rational and emotional levels. 
              Every project is an opportunity to push the boundaries of what's possible in the digital realm.
            </p>
            
            <p className="text-lg leading-relaxed text-codex-text-secondary">
              Based in East Kalimantan, Indonesia, I work with clients globally to transform 
              complex ideas into elegant, user-centered solutions. My philosophy: 
              <span className="anima-gradient-text font-bold"> technology should amplify human potential, not complicate it</span>.
            </p>
          </div>
        </div>
        
        {/* Right Column - Toolkit */}
        <div className="bg-codex-surface rounded-lg p-8 border border-gray-700">
          <h3 className="font-heading text-2xl font-bold mb-8 anima-gradient-text">
            Toolkit
          </h3>
          
          <div className="space-y-8">
            {Object.entries(toolkit).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-heading text-lg font-bold mb-4 text-anima-cyan">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span 
                      key={item}
                      className="px-3 py-1 bg-codex-primary rounded-full text-sm font-mono text-codex-text border border-gray-600 hover:border-anima-cyan hover:text-anima-cyan transition-all cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact info */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h4 className="font-heading text-lg font-bold mb-4 text-anima-cyan">
              Connect
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:official@kou.my.id" 
                className="block hover-anima font-mono text-sm"
              >
                official@kou.my.id
              </a>
              <a 
                href="https://github.com/fk0u" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover-anima font-mono text-sm"
              >
                github.com/fk0u
              </a>
              <a 
                href="https://linkedin.com/in/alghani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover-anima font-mono text-sm"
              >
                linkedin.com/in/alghani
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;