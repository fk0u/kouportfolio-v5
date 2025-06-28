import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' }
];

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.achievements': 'Achievements',
    'nav.certificates': 'Certificates',
    'nav.support': 'Support',
    
    // Splash Screen
    'splash.welcome': 'Welcome',
    'splash.selectLanguage': 'Select your preferred language',
    'splash.continue': 'Continue',
    'splash.loading': 'Loading...',
    
    // Profile
    'profile.bio': 'Just 17 years a Passionate',
    'profile.experience': 'having 2+ years of Experiences',
    'profile.basedIn': 'Based in East Kalimantan, Indonesia',
    
    // Roles (for animation)
    'roles.frontend': 'Front-End Developer',
    'roles.ui': 'UI Designer',
    'roles.photographer': 'Photographer',
    'roles.videographer': 'Videographer',
    'roles.creative': 'Creative Director',
    'roles.prompt': 'Prompt Engineer',
    'roles.ai': 'AI Engineer',
    'roles.freelancer': 'Freelancer',
    
    // Sections
    'section.whatCanIDo': 'What I Can Do?',
    'section.techStack': 'Tech Stack',
    'section.experience': 'Experience',
    'section.education': 'Education',
    'section.uniqueThings': 'Unique Things About Me',
    'section.recentProjects': 'Recent Projects',
    
    // Experience
    'exp.webDeveloper': 'Web Developer Intern',
    'exp.education': 'Dinas Pendidikan dan Kebudayaan Prov. Kalimantan Timur',
    'exp.period': 'June 2025',
    'exp.description': 'Tasked with creating a website application using Next.JS and Prisma.',
    
    // Education
    'edu.school': 'SMK Negeri 7 Samarinda',
    'edu.program': 'Software and Game Development',
    'edu.period': 'June 2023 - June 2026',
    'edu.status': 'Currently Enrolled',
    
    // Skills
    'skills.webDesign': 'Web Design',
    'skills.uiDesign': 'UI Design',
    'skills.photography': 'Photography',
    'skills.videography': 'Videography',
    'skills.creativeDirector': 'Creative Director',
    'skills.aiEngineering': 'AI Engineering',
    'skills.frontendDev': 'FrontEnd Development',
    
    // Unique Things
    'unique.coding': 'Learned coding since 1st Grade Junior High School.',
    'unique.otaku': 'An Otaku & Kpopers.',
    'unique.coffee': 'Loves to drink Coffee.',
    
    // Common
    'common.viewMore': 'View More',
    'common.close': 'Close',
    'common.loading': 'Loading...',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.projects': 'Proyek',
    'nav.blog': 'Blog',
    'nav.about': 'Tentang',
    'nav.achievements': 'Pencapaian',
    'nav.certificates': 'Sertifikat',
    'nav.support': 'Dukung',
    
    // Splash Screen
    'splash.welcome': 'Selamat Datang',
    'splash.selectLanguage': 'Pilih bahasa yang Anda inginkan',
    'splash.continue': 'Lanjutkan',
    'splash.loading': 'Memuat...',
    
    // Profile
    'profile.bio': 'Hanya 17 tahun seorang yang Bersemangat',
    'profile.experience': 'memiliki 2+ tahun Pengalaman',
    'profile.basedIn': 'Berlokasi di Kalimantan Timur, Indonesia',
    
    // Roles (for animation)
    'roles.frontend': 'Front-End Developer',
    'roles.ui': 'UI Designer',
    'roles.photographer': 'Fotografer',
    'roles.videographer': 'Videografer',
    'roles.creative': 'Direktur Kreatif',
    'roles.prompt': 'Prompt Engineer',
    'roles.ai': 'AI Engineer',
    'roles.freelancer': 'Freelancer',
    
    // Sections
    'section.whatCanIDo': 'Apa yang Bisa Saya Lakukan?',
    'section.techStack': 'Tech Stack',
    'section.experience': 'Pengalaman',
    'section.education': 'Pendidikan',
    'section.uniqueThings': 'Hal Unik Tentang Saya',
    'section.recentProjects': 'Proyek Terbaru',
    
    // Experience
    'exp.webDeveloper': 'Magang Web Developer',
    'exp.education': 'Dinas Pendidikan dan Kebudayaan Prov. Kalimantan Timur',
    'exp.period': 'Juni 2025',
    'exp.description': 'Bertugas membuat aplikasi website menggunakan Next.JS dan Prisma.',
    
    // Education
    'edu.school': 'SMK Negeri 7 Samarinda',
    'edu.program': 'Pengembangan Perangkat Lunak dan Gim',
    'edu.period': 'Juni 2023 - Juni 2026',
    'edu.status': 'Sedang Bersekolah',
    
    // Skills
    'skills.webDesign': 'Desain Web',
    'skills.uiDesign': 'Desain UI',
    'skills.photography': 'Fotografi',
    'skills.videography': 'Videografi',
    'skills.creativeDirector': 'Direktur Kreatif',
    'skills.aiEngineering': 'AI Engineering',
    'skills.frontendDev': 'Pengembangan FrontEnd',
    
    // Unique Things
    'unique.coding': 'Belajar coding sejak kelas 1 SMP.',
    'unique.otaku': 'Seorang Otaku & Kpopers.',
    'unique.coffee': 'Suka minum Kopi.',
    
    // Common
    'common.viewMore': 'Lihat Lebih',
    'common.close': 'Tutup',
    'common.loading': 'Memuat...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    if (saved) {
      const lang = languages.find(l => l.code === saved);
      if (lang) setCurrentLanguage(lang);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { languages };