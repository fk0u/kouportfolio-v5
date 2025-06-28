import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';

const BlogSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);

  // Mock blog posts - replace with actual blog data
  const blogPosts = [
    {
      id: '1',
      title: { 
        en: 'Building Modern Web Applications with React and TypeScript',
        id: 'Membangun Aplikasi Web Modern dengan React dan TypeScript'
      },
      excerpt: { 
        en: 'Learn how to create scalable and maintainable web applications using the power of React and TypeScript...',
        id: 'Pelajari cara membuat aplikasi web yang scalable dan maintainable menggunakan kekuatan React dan TypeScript...'
      },
      date: '2024-03-15',
      readTime: '5 min read',
      category: { en: 'Development', id: 'Pengembangan' },
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '2',
      title: { 
        en: 'The Art of UI/UX Design: Creating Beautiful User Experiences',
        id: 'Seni Desain UI/UX: Menciptakan Pengalaman Pengguna yang Indah'
      },
      excerpt: { 
        en: 'Explore the principles of good design and learn how to create interfaces that users love...',
        id: 'Jelajahi prinsip-prinsip desain yang baik dan pelajari cara membuat interface yang disukai pengguna...'
      },
      date: '2024-03-10',
      readTime: '7 min read',
      category: { en: 'Design', id: 'Desain' },
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '3',
      title: { 
        en: 'Photography Tips: Capturing Perfect Moments',
        id: 'Tips Fotografi: Menangkap Momen Sempurna'
      },
      excerpt: { 
        en: 'Discover professional photography techniques and tips to improve your photo composition...',
        id: 'Temukan teknik fotografi profesional dan tips untuk meningkatkan komposisi foto Anda...'
      },
      date: '2024-03-05',
      readTime: '4 min read',
      category: { en: 'Photography', id: 'Fotografi' },
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Development: 'from-blue-500 to-blue-600',
      Pengembangan: 'from-blue-500 to-blue-600',
      Design: 'from-purple-500 to-purple-600',
      Desain: 'from-purple-500 to-purple-600',
      Photography: 'from-green-500 to-green-600',
      Fotografi: 'from-green-500 to-green-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="min-h-screen py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16 transition-all duration-1000
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('nav.blog')}
          </h2>
          <p className={`
            text-xl
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {currentLanguage.code === 'id' 
              ? 'Berbagi pemikiran dan pengalaman'
              : 'Sharing thoughts and experiences'
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <GlassCard
              key={post.id}
              className={`
                group cursor-pointer transition-all duration-500 delay-${index * 100}
                ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <div className="overflow-hidden rounded-2xl">
                {/* Post Image */}
                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={post.image}
                    alt={post.title[currentLanguage.code]}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium text-white
                      bg-gradient-to-r ${getCategoryColor(post.category[currentLanguage.code])}
                    `}>
                      {post.category[currentLanguage.code]}
                    </span>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={`
                        w-4 h-4
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `} />
                      <span className={`
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        {new Date(post.date).toLocaleDateString(
                          currentLanguage.code === 'id' ? 'id-ID' : 'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl font-bold line-clamp-2 group-hover:text-blue-500 transition-colors duration-200
                    ${isDark ? 'text-white' : 'text-gray-900'}
                  `}>
                    {post.title[currentLanguage.code]}
                  </h3>

                  {/* Excerpt */}
                  <p className={`
                    text-sm line-clamp-3 leading-relaxed
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {post.excerpt[currentLanguage.code]}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <Clock className={`
                        w-4 h-4
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `} />
                      <span className={`
                        text-sm
                        ${isDark ? 'text-gray-400' : 'text-gray-500'}
                      `}>
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-blue-500 group-hover:gap-2 transition-all duration-200">
                      <span className="text-sm font-medium">
                        {currentLanguage.code === 'id' ? 'Baca' : 'Read'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className={`
          text-center transition-all duration-1000 delay-500
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <GlassCard className="p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={`
                text-2xl font-bold
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
                {currentLanguage.code === 'id' ? 'Blog Segera Hadir!' : 'Blog Coming Soon!'}
              </h3>
              
              <p className={`
                text-lg
                ${isDark ? 'text-gray-300' : 'text-gray-600'}
              `}>
                {currentLanguage.code === 'id' 
                  ? 'Saya sedang mempersiapkan konten menarik untuk dibagikan dengan Anda. Stay tuned!'
                  : 'I\'m preparing exciting content to share with you. Stay tuned!'
                }
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;