import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { getGitHubStats } from '../lib/github';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getGitHubStats('fk0u');
        if (data?.allRepos) {
          // Filter and sort projects
          const filteredProjects = data.allRepos
            .filter((repo: any) => !repo.fork && !repo.archived && repo.description)
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 12);
          setProjects(filteredProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Vue: '#4fc08d',
      React: '#61dafb',
      Python: '#3572a5',
      PHP: '#4f5d95',
      HTML: '#e34c26',
      CSS: '#1572b6',
    };
    return colors[language] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="font-mono text-anima-cyan">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
        Digital <span className="anima-gradient-text">Constructs</span>
      </h2>
      <p className="text-center text-codex-text-secondary mb-12 max-w-2xl mx-auto">
        A collection of digital architectures, each crafted with precision and purpose.
      </p>
      
      <div className="masonry-grid">
        {projects.map((project, index) => (
          <div key={project.id} className="masonry-item">
            <div 
              className="project-card rounded-lg overflow-hidden shadow-lg relative group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project image placeholder */}
              <div className="project-image h-48 bg-gradient-to-br from-codex-surface to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-anima-gradient opacity-10" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                    {project.language && (
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        />
                        <span className="text-xs font-mono text-codex-text-secondary">
                          {project.language}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Project overlay */}
              <div className="project-overlay absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="font-heading text-xl font-bold mb-3 anima-gradient-text">
                  {project.name}
                </h3>
                <p className="text-sm text-codex-text-secondary mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span 
                      key={topic}
                      className="px-2 py-1 bg-codex-surface rounded text-xs font-mono text-anima-cyan border border-anima-cyan border-opacity-30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-codex-surface rounded-lg hover-anima border border-anima-cyan border-opacity-30 hover:border-opacity-100 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-mono">Code</span>
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-anima-gradient rounded-lg text-codex-primary font-mono text-sm hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold mb-2 hover-anima">
                  {project.name}
                </h3>
                <p className="text-sm text-codex-text-secondary line-clamp-2 mb-3">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-codex-text-secondary">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      ⭐ {project.stargazers_count}
                    </span>
                    {project.language && (
                      <span className="flex items-center gap-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        />
                        {project.language}
                      </span>
                    )}
                  </div>
                  <span className="font-mono">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;