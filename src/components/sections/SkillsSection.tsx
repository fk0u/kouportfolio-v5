import React from 'react';

const SkillsSection: React.FC = () => {
  const techStack = {
    'Languages': [
      'JavaScript', 'TypeScript', 'PHP', 'Python', 'C++', 'C#', 'Lua', 'R'
    ],
    'Frontend': [
      'React', 'Vue', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Ionic'
    ],
    'Backend': [
      'Node.js', 'Laravel', 'Express', 'Prisma'
    ],
    'Database': [
      'MySQL', 'PostgreSQL', 'Supabase'
    ],
    'Tools': [
      'Figma', 'Postman', 'Git', 'Vite', 'Webpack'
    ],
    'Creative': [
      'Adobe Creative Suite', 'Photography', 'Videography', 'UI/UX Design'
    ]
  };

  const getRandomDelay = () => Math.random() * 0.5;

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-satoshi text-4xl md:text-5xl font-bold mb-6">
            <span className="text-text-primary">Tech </span>
            <span className="anima-gradient">Arsenal</span>
          </h2>
          <p className="font-inter text-xl text-text-secondary max-w-3xl mx-auto">
            A curated collection of technologies and tools that power my digital creations.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
            <div
              key={category}
              className="glass-surface p-6 rounded-xl hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="font-satoshi text-xl font-bold mb-6 text-center">
                <span className="anima-gradient">{category}</span>
              </h3>
              
              <div className="space-y-3">
                {technologies.map((tech, index) => (
                  <div
                    key={tech}
                    className="flex items-center justify-between p-3 bg-bg-primary rounded-lg hover:bg-opacity-80 transition-all duration-300"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
                  >
                    <span className="font-inter text-text-primary">{tech}</span>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 2 ? 'bg-anima-cyan' : 'bg-text-secondary/30'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Snippet */}
        <div className="mt-16 glass-surface p-8 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 font-mono text-sm text-text-secondary">
              digitalArchitect.ts
            </span>
          </div>
          
          <div className="font-mono text-sm space-y-2">
            <div>
              <span className="text-anima-cyan">class</span>
              <span className="text-text-primary"> DigitalArchitect </span>
              <span className="text-text-secondary">{'{'}</span>
            </div>
            <div className="ml-4">
              <span className="text-anima-cyan">private</span>
              <span className="text-text-primary"> passion</span>
              <span className="text-text-secondary">: </span>
              <span className="text-anima-magenta">'creating digital experiences'</span>
              <span className="text-text-secondary">;</span>
            </div>
            <div className="ml-4">
              <span className="text-anima-cyan">private</span>
              <span className="text-text-primary"> philosophy</span>
              <span className="text-text-secondary">: </span>
              <span className="text-anima-magenta">'logic + creativity = magic'</span>
              <span className="text-text-secondary">;</span>
            </div>
            <div className="ml-4 mt-4">
              <span className="text-anima-cyan">public</span>
              <span className="text-text-primary"> createMasterpiece</span>
              <span className="text-text-secondary">() {'{'}</span>
            </div>
            <div className="ml-8">
              <span className="text-anima-cyan">return</span>
              <span className="text-text-primary"> this.codex.merge(this.anima);</span>
            </div>
            <div className="ml-4">
              <span className="text-text-secondary">{'}'}</span>
            </div>
            <div>
              <span className="text-text-secondary">{'}'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;