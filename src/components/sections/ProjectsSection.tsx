import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Loader, Calendar, Globe, User, Code, TrendingUp, ChevronLeft, ChevronRight, Filter, Search, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';
import { getGitHubStats } from '../../lib/github';

const ProjectsSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const projectsPerPage = 9;

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getGitHubStats('fk0u');
        if (data) {
          setGithubData(data);
        } else {
          throw new Error('No data received');
        }
      } catch (err) {
        setError(currentLanguage.code === 'id' 
          ? 'Gagal memuat data dari GitHub' 
          : 'Failed to load data from GitHub'
        );
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [currentLanguage.code]);

  const getLanguageColor = (language: string | null) => {
    if (!language) return '#6b7280';
    
    const colors: { [key: string]: string } = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Vue: '#4fc08d',
      React: '#61dafb',
      Python: '#3572a5',
      PHP: '#4f5d95',
      Java: '#b07219',
      'C++': '#f34b7d',
      'C#': '#239120',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Lua: '#000080',
      R: '#198ce7',
      Go: '#00add8',
      Rust: '#dea584',
      Swift: '#fa7343',
    };
    return colors[language] || '#6b7280';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      currentLanguage.code === 'id' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  // Filter and search logic
  const filteredRepos = githubData?.allRepos?.filter((repo: any) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredRepos.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredRepos.slice(startIndex, endIndex);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLanguage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('');
    setCurrentPage(1);
  };

  const getRepoTypeIcon = (repo: any) => {
    if (repo.fork) return '🍴';
    if (repo.archived) return '📦';
    if (repo.private) return '🔒';
    return '📁';
  };

  return (
    <section className="min-h-screen py-20">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16 transition-all duration-1000
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('nav.projects')}
          </h2>
          <p className={`
            text-xl
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {currentLanguage.code === 'id' 
              ? 'Semua repositori dari GitHub'
              : 'All repositories from GitHub'
            }
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3">
              <Loader className={`w-6 h-6 animate-spin ${isDark ? 'text-white' : 'text-gray-900'}`} />
              <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentLanguage.code === 'id' ? 'Memuat data GitHub...' : 'Loading GitHub data...'}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <GlassCard className="p-8 max-w-md mx-auto">
              <p className={`text-lg ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                {error}
              </p>
            </GlassCard>
          </div>
        )}

        {/* GitHub Profile Summary */}
        {!loading && !error && githubData && (
          <div className={`
            mb-12 transition-all duration-1000 delay-200
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <GlassCard className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={githubData.user.avatar_url}
                    alt="GitHub Avatar"
                    className="w-20 h-20 rounded-2xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className={`
                    text-2xl font-bold mb-2
                    ${isDark ? 'text-white' : 'text-gray-900'}
                  `}>
                    {githubData.user.name || githubData.user.login}
                  </h3>
                  <p className={`
                    mb-3
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {githubData.user.bio}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {githubData.user.followers} followers
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-4 h-4 text-green-500" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {githubData.totalRepos} repositories
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-yellow-500" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {githubData.totalStars} stars
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Search and Filter Controls */}
        {!loading && !error && githubData && (
          <div className={`
            mb-8 transition-all duration-1000 delay-300
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className={`
                    absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                  `} />
                  <input
                    type="text"
                    placeholder={currentLanguage.code === 'id' ? 'Cari repositori...' : 'Search repositories...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`
                      w-full pl-10 pr-4 py-3 rounded-xl border
                      ${isDark 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' 
                        : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-500'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200
                    `}
                  />
                </div>

                {/* Language Filter */}
                <div className="flex gap-2">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className={`
                      px-4 py-3 rounded-xl border
                      ${isDark 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'bg-black/5 border-black/10 text-gray-900'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200
                    `}
                  >
                    <option value="">
                      {currentLanguage.code === 'id' ? 'Semua Bahasa' : 'All Languages'}
                    </option>
                    {githubData.topLanguages.map((lang: string) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>

                  {/* Clear Filters */}
                  {(searchTerm || selectedLanguage) && (
                    <button
                      onClick={clearFilters}
                      className={`
                        px-4 py-3 rounded-xl border transition-all duration-200
                        ${isDark 
                          ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30' 
                          : 'bg-red-100 border-red-200 text-red-600 hover:bg-red-200'
                        }
                      `}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Results Info */}
              <div className="mt-4 flex items-center justify-between">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentLanguage.code === 'id' 
                    ? `Menampilkan ${filteredRepos.length} dari ${githubData.allRepos.length} repositori`
                    : `Showing ${filteredRepos.length} of ${githubData.allRepos.length} repositories`
                  }
                </p>
                
                {filteredRepos.length > projectsPerPage && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentLanguage.code === 'id' 
                      ? `Halaman ${currentPage} dari ${totalPages}`
                      : `Page ${currentPage} of ${totalPages}`
                    }
                  </p>
                )}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && currentProjects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProjects.map((repo: any, index: number) => (
                <GlassCard
                  key={repo.id}
                  className={`
                    group transition-all duration-500 delay-${index * 50}
                    ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                >
                  <div className="p-6 space-y-4">
                    {/* Project Header */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-lg">{getRepoTypeIcon(repo)}</span>
                          <h3 className={`
                            text-lg font-bold line-clamp-1 group-hover:text-blue-500 transition-colors duration-200
                            ${isDark ? 'text-white' : 'text-gray-900'}
                          `}>
                            {repo.name}
                          </h3>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                              p-2 rounded-lg transition-colors duration-200
                              ${isDark 
                                ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                                : 'hover:bg-black/5 text-gray-600 hover:text-gray-900'
                              }
                            `}
                            title="View on GitHub"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                                p-2 rounded-lg transition-colors duration-200
                                ${isDark 
                                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                                  : 'hover:bg-black/5 text-gray-600 hover:text-gray-900'
                                }
                              `}
                              title="Live Demo"
                            >
                              <Globe className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className={`
                        text-sm leading-relaxed line-clamp-3
                        ${isDark ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {repo.description || (currentLanguage.code === 'id' ? 'Tidak ada deskripsi tersedia' : 'No description available')}
                      </p>
                    </div>

                    {/* Project Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></div>
                          <span className={`
                            ${isDark ? 'text-gray-300' : 'text-gray-600'}
                          `}>
                            {repo.language}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className={`
                          ${isDark ? 'text-gray-300' : 'text-gray-600'}
                        `}>
                          {repo.stargazers_count}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4 text-blue-500" />
                        <span className={`
                          ${isDark ? 'text-gray-300' : 'text-gray-600'}
                        `}>
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currentLanguage.code === 'id' ? 'Diperbarui' : 'Updated'} {formatDate(repo.updated_at)}
                      </span>
                    </div>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic: string) => (
                          <span
                            key={topic}
                            className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${isDark 
                                ? 'bg-blue-500/20 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                              }
                            `}
                          >
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${isDark ? 'text-gray-400' : 'text-gray-500'}
                          `}>
                            +{repo.topics.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Repository Status Badges */}
                    <div className="flex gap-2">
                      {repo.fork && (
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'}
                        `}>
                          Fork
                        </span>
                      )}
                      {repo.archived && (
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700'}
                        `}>
                          Archived
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`
                flex justify-center items-center gap-4 mb-8 transition-all duration-1000 delay-500
                ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`
                    p-2 rounded-lg transition-all duration-200
                    ${currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : isDark
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-black/5 text-gray-900'
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let page;
                    if (totalPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      page = totalPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`
                          w-10 h-10 rounded-lg font-medium transition-all duration-200
                          ${page === currentPage
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : isDark
                              ? 'hover:bg-white/10 text-gray-300'
                              : 'hover:bg-black/5 text-gray-600'
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`
                    p-2 rounded-lg transition-all duration-200
                    ${currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : isDark
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-black/5 text-gray-900'
                    }
                  `}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && filteredRepos.length === 0 && githubData && (
          <div className="text-center py-20">
            <GlassCard className="p-8 max-w-md mx-auto">
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentLanguage.code === 'id' 
                  ? 'Tidak ada repositori yang ditemukan'
                  : 'No repositories found'
                }
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-200"
              >
                {currentLanguage.code === 'id' ? 'Hapus Filter' : 'Clear Filters'}
              </button>
            </GlassCard>
          </div>
        )}

        {/* View More Button */}
        {!loading && !error && githubData && (
          <div className={`
            text-center mb-12 transition-all duration-1000 delay-600
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <a
              href="https://github.com/fk0u"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                bg-gradient-to-r from-blue-500 to-purple-600 text-white
                hover:scale-105 transition-all duration-300 shadow-lg
              `}
            >
              <Github className="w-5 h-5" />
              {currentLanguage.code === 'id' ? 'Lihat Semua di GitHub' : 'View All on GitHub'}
            </a>
          </div>
        )}

        {/* GitHub Stats */}
        {!loading && !error && githubData && (
          <div className={`
            mb-8 transition-all duration-1000 delay-700
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}>
                  {githubData.totalRepos}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Total Repositori' : 'Total Repositories'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-yellow-500
                `}>
                  {githubData.totalStars}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Total Bintang' : 'Total Stars'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-blue-500
                `}>
                  {githubData.totalForks}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Total Fork' : 'Total Forks'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-green-500
                `}>
                  {githubData.languagesCount}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Bahasa Pemrograman' : 'Languages Used'}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Top Languages */}
        {!loading && !error && githubData?.topLanguages && (
          <div className={`
            transition-all duration-1000 delay-800
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <GlassCard className="p-6">
              <h3 className={`
                text-xl font-bold mb-4 text-center
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                {currentLanguage.code === 'id' ? 'Bahasa Pemrograman Utama' : 'Top Programming Languages'}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {githubData.topLanguages.slice(0, 10).map((language: string) => (
                  <button
                    key={language}
                    onClick={() => setSelectedLanguage(language === selectedLanguage ? '' : language)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200
                      ${selectedLanguage === language
                        ? 'bg-blue-500/30 ring-2 ring-blue-500/50'
                        : 'bg-white/10 hover:bg-white/20'
                      }
                      backdrop-blur-sm cursor-pointer
                    `}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(language) }}
                    ></div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language}
                    </span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;