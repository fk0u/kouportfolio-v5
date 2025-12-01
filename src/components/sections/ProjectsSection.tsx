import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { getGitHubStats } from '../../lib/github';

interface GitHubStats {
  user: {
    avatar_url: string;
    login: string;
  };
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languagesCount: number;
  topRepos: Array<{
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
  }>;
}

const ProjectsSection: React.FC = () => {
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const data = await getGitHubStats('fk0u');
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const featuredProjects = [
    {
      title: 'KOU Portfolio',
      description: 'A sophisticated Tech-Noir themed portfolio showcasing the harmony between logic and creativity.',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/fk0u/portfolio',
      live: 'https://kou.my.id',
      featured: true
    },
    {
      title: 'Neural Canvas',
      description: 'AI-powered digital art generation platform that bridges human creativity with machine learning.',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      github: '#',
      live: '#',
      featured: true
    },
    {
      title: 'Quantum Dashboard',
      description: 'Real-time data visualization dashboard with quantum-inspired design principles.',
      tech: ['Vue.js', 'D3.js', 'Node.js'],
      github: '#',
      live: '#',
      featured: true
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Vue: '#4fc08d',
      React: '#61dafb',
      Python: '#3572a5',
      PHP: '#4f5d95',
    };
    return colors[language] || '#6b7280';
  };

  return (
    <section id="projects" className="py-20 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-satoshi text-4xl md:text-5xl font-bold mb-6">
            <span className="text-text-primary">Digital </span>
            <span className="anima-gradient">Creations</span>
          </h2>
          <p className="font-inter text-xl text-text-secondary max-w-3xl mx-auto">
            A showcase of projects where technical precision meets creative vision.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-surface p-8 rounded-xl hover:scale-105 transition-all duration-300 ${index === 0 ? 'lg:col-span-2' : ''
                }`}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-satoshi text-2xl font-bold text-text-primary">
                  {project.title}
                </h3>
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    className="p-2 bg-bg-primary rounded-lg hover-anima transition-all duration-300"
                    aria-label="View source code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.live}
                    className="p-2 bg-bg-primary rounded-lg hover-anima transition-all duration-300"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="font-inter text-text-secondary mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-bg-primary rounded-full font-mono text-sm text-anima-cyan"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Stats */}
        {!loading && githubData && (
          <div className="glass-surface p-8 rounded-xl">
            <h3 className="font-satoshi text-2xl font-bold text-center mb-8">
              <span className="anima-gradient">GitHub Analytics</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold anima-gradient mb-2">
                  {githubData.totalRepos}
                </div>
                <div className="font-mono text-sm text-text-secondary">
                  Repositories
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold anima-gradient mb-2">
                  {githubData.totalStars}
                </div>
                <div className="font-mono text-sm text-text-secondary">
                  Stars Earned
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold anima-gradient mb-2">
                  {githubData.totalForks}
                </div>
                <div className="font-mono text-sm text-text-secondary">
                  Forks
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold anima-gradient mb-2">
                  {githubData.languagesCount}
                </div>
                <div className="font-mono text-sm text-text-secondary">
                  Languages
                </div>
              </div>
            </div>

            {/* Recent Repositories */}
            {githubData.topRepos && (
              <div>
                <h4 className="font-satoshi text-xl font-bold mb-6 text-center">
                  <span className="text-text-primary">Recent </span>
                  <span className="anima-gradient">Repositories</span>
                </h4>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {githubData.topRepos.slice(0, 6).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover-anima"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-inter font-semibold text-text-primary text-sm">
                          {repo.name}
                        </h5>
                        <div className="flex items-center space-x-2 text-xs text-text-secondary">
                          <Star className="w-3 h-3" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                      </div>

                      <p className="font-inter text-xs text-text-secondary mb-3 line-clamp-2">
                        {repo.description || 'No description available'}
                      </p>

                      {repo.language && (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></div>
                          <span className="font-mono text-xs text-text-secondary">
                            {repo.language}
                          </span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-anima-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-mono text-text-secondary">Loading digital creations...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;