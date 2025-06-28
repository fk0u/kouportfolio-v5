import jsPDF from 'jspdf';

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    period: string;
    status?: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    tools: string[];
    frameworks: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    stars?: number;
    forks?: number;
  }>;
  achievements: Array<{
    title: string;
    organization: string;
    date: string;
    level: string;
    position: string;
  }>;
  certificates: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  uniqueThings: string[];
  githubStats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    languagesCount: number;
  };
}

export const generateCV = (data: CVData, language: 'en' | 'id' = 'en'): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;
  
  // Simple Color Palette
  const colors = {
    primary: [37, 99, 235],      // Blue-600
    secondary: [75, 85, 99],     // Gray-600
    accent: [147, 51, 234],      // Purple-600
    success: [34, 197, 94],      // Green-500
    warning: [245, 158, 11],     // Amber-500
    light: [248, 250, 252],      // Gray-50
    dark: [31, 41, 55],          // Gray-800
    text: [17, 24, 39],          // Gray-900
    textLight: [107, 114, 128]   // Gray-500
  };
  
  // Helper functions
  const setColor = (color: number[]) => {
    doc.setTextColor(color[0], color[1], color[2]);
  };
  
  const setFillColor = (color: number[]) => {
    doc.setFillColor(color[0], color[1], color[2]);
  };
  
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const { 
      fontSize = 10, 
      color = colors.text, 
      fontStyle = 'normal', 
      align = 'left', 
      maxWidth,
      lineHeight = 1.2
    } = options;
    
    doc.setFontSize(fontSize);
    setColor(color);
    doc.setFont('helvetica', fontStyle);
    
    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string, index: number) => {
        const lineY = y + (index * fontSize * lineHeight * 0.35);
        if (align === 'center') {
          doc.text(line, x, lineY, { align: 'center' });
        } else if (align === 'right') {
          doc.text(line, x, lineY, { align: 'right' });
        } else {
          doc.text(line, x, lineY);
        }
      });
      return y + (lines.length * fontSize * lineHeight * 0.35);
    } else {
      if (align === 'center') {
        doc.text(text, x, y, { align: 'center' });
      } else if (align === 'right') {
        doc.text(text, x, y, { align: 'right' });
      } else {
        doc.text(text, x, y);
      }
      return y + (fontSize * lineHeight * 0.35);
    }
  };
  
  const addSection = (title: string, y: number) => {
    // Section line
    setFillColor(colors.primary);
    doc.rect(15, y - 2, pageWidth - 30, 1, 'F');
    
    // Section title
    return addText(title, 15, y + 5, {
      fontSize: 14,
      color: colors.primary,
      fontStyle: 'bold'
    });
  };
  
  const addBulletPoint = (text: string, x: number, y: number, options: any = {}) => {
    // Simple bullet
    addText('•', x, y, {
      fontSize: 12,
      color: colors.primary,
      fontStyle: 'bold'
    });
    
    // Text
    return addText(text, x + 8, y, { 
      ...options, 
      maxWidth: pageWidth - x - 25,
      lineHeight: 1.3
    });
  };
  
  const addSkillBadge = (skill: string, x: number, y: number, color = colors.primary) => {
    const textWidth = doc.getTextWidth(skill) + 6;
    
    // Badge background
    setFillColor(color);
    doc.rect(x, y - 4, textWidth, 8, 'F');
    
    // Badge text
    addText(skill, x + 3, y + 1, {
      fontSize: 8,
      color: [255, 255, 255],
      fontStyle: 'bold'
    });
    
    return x + textWidth + 5;
  };
  
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPosition = 25;
      return true;
    }
    return false;
  };
  
  // HEADER SECTION - Clean Design
  const headerHeight = 60;
  
  // Header background
  setFillColor(colors.primary);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  
  // Name
  addText(data.personalInfo.name, 20, 25, {
    fontSize: 24,
    color: [255, 255, 255],
    fontStyle: 'bold'
  });
  
  // Title
  addText(data.personalInfo.title, 20, 35, {
    fontSize: 12,
    color: [255, 255, 255]
  });
  
  // Contact info
  const contactY = 45;
  const contactItems = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.website
  ];
  
  let contactX = 20;
  contactItems.forEach((item, index) => {
    addText(item, contactX, contactY, {
      fontSize: 8,
      color: [255, 255, 255]
    });
    contactX += doc.getTextWidth(item) + 15;
  });
  
  yPosition = headerHeight + 15;
  
  // PROFESSIONAL SUMMARY
  yPosition = addSection(language === 'id' ? 'RINGKASAN PROFESIONAL' : 'PROFESSIONAL SUMMARY', yPosition);
  yPosition += 5;
  
  yPosition = addText(data.summary, 20, yPosition, { 
    fontSize: 10, 
    maxWidth: pageWidth - 40,
    color: colors.text,
    lineHeight: 1.4
  });
  
  yPosition += 15;
  
  // GITHUB STATISTICS
  checkPageBreak(30);
  yPosition = addSection(language === 'id' ? 'STATISTIK GITHUB' : 'GITHUB STATISTICS', yPosition);
  yPosition += 8;
  
  const statsData = [
    { label: language === 'id' ? 'Repositori' : 'Repositories', value: data.githubStats.totalRepos },
    { label: language === 'id' ? 'Bintang' : 'Stars', value: data.githubStats.totalStars },
    { label: 'Forks', value: data.githubStats.totalForks },
    { label: language === 'id' ? 'Bahasa' : 'Languages', value: data.githubStats.languagesCount }
  ];
  
  const statsWidth = (pageWidth - 60) / 4;
  statsData.forEach((stat, index) => {
    const x = 20 + (index * statsWidth);
    
    // Stat box
    setFillColor(colors.light);
    doc.rect(x, yPosition, statsWidth - 5, 20, 'F');
    
    // Value
    addText(stat.value.toString(), x + 5, yPosition + 8, {
      fontSize: 14,
      color: colors.primary,
      fontStyle: 'bold'
    });
    
    // Label
    addText(stat.label, x + 5, yPosition + 16, {
      fontSize: 8,
      color: colors.textLight
    });
  });
  
  yPosition += 30;
  
  // EXPERIENCE
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE', yPosition);
  yPosition += 8;
  
  data.experience.forEach((exp) => {
    checkPageBreak(35);
    
    // Job title
    yPosition = addText(exp.title, 20, yPosition, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.primary
    });
    
    // Company and period
    yPosition = addText(`${exp.company} | ${exp.period}`, 20, yPosition + 2, {
      fontSize: 10,
      color: colors.textLight,
      fontStyle: 'italic'
    });
    
    // Description
    exp.description.forEach((desc) => {
      yPosition = addBulletPoint(desc, 25, yPosition + 4, { 
        fontSize: 9, 
        color: colors.text 
      });
    });
    
    yPosition += 10;
  });
  
  // EDUCATION
  checkPageBreak(25);
  yPosition = addSection(language === 'id' ? 'PENDIDIKAN' : 'EDUCATION', yPosition);
  yPosition += 8;
  
  data.education.forEach((edu) => {
    checkPageBreak(20);
    
    yPosition = addText(edu.degree, 20, yPosition, {
      fontSize: 11,
      fontStyle: 'bold',
      color: colors.primary
    });
    
    yPosition = addText(`${edu.school} | ${edu.period}`, 20, yPosition + 2, {
      fontSize: 10,
      color: colors.textLight
    });
    
    if (edu.status) {
      yPosition = addText(edu.status, 20, yPosition + 2, {
        fontSize: 9,
        color: colors.success,
        fontStyle: 'italic'
      });
    }
    
    yPosition += 8;
  });
  
  // TECHNICAL SKILLS
  checkPageBreak(50);
  yPosition = addSection(language === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS', yPosition);
  yPosition += 8;
  
  // Programming Languages
  yPosition = addText(language === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.primary
  });
  yPosition += 5;
  
  let currentX = 25;
  data.skills.languages.forEach((lang) => {
    if (currentX + doc.getTextWidth(lang) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(lang, currentX, yPosition, colors.primary);
  });
  
  yPosition += 15;
  
  // Frameworks
  yPosition = addText(language === 'id' ? 'Framework & Library:' : 'Frameworks & Libraries:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.accent
  });
  yPosition += 5;
  
  currentX = 25;
  data.skills.frameworks.forEach((framework) => {
    if (currentX + doc.getTextWidth(framework) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(framework, currentX, yPosition, colors.accent);
  });
  
  yPosition += 15;
  
  // Tools
  yPosition = addText('Tools & Technologies:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.success
  });
  yPosition += 5;
  
  currentX = 25;
  data.skills.tools.forEach((tool) => {
    if (currentX + doc.getTextWidth(tool) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(tool, currentX, yPosition, colors.success);
  });
  
  yPosition += 20;
  
  // FEATURED PROJECTS
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PROYEK UNGGULAN' : 'FEATURED PROJECTS', yPosition);
  yPosition += 8;
  
  data.projects.slice(0, 4).forEach((project) => {
    checkPageBreak(30);
    
    // Project box
    setFillColor(colors.light);
    doc.rect(20, yPosition, pageWidth - 40, 25, 'F');
    
    yPosition = addText(project.name, 25, yPosition + 8, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.primary
    });
    
    if (project.url) {
      yPosition = addText(project.url, 25, yPosition + 2, {
        fontSize: 8,
        color: colors.textLight
      });
    }
    
    yPosition = addText(project.description, 25, yPosition + 3, {
      fontSize: 9,
      maxWidth: pageWidth - 50,
      color: colors.text
    });
    
    // Technologies
    yPosition += 3;
    currentX = 25;
    project.technologies.forEach((tech) => {
      if (currentX + doc.getTextWidth(tech) + 10 > pageWidth - 25) {
        currentX = 25;
        yPosition += 10;
      }
      currentX = addSkillBadge(tech, currentX, yPosition, colors.textLight);
    });
    
    yPosition += 15;
  });
  
  // ACHIEVEMENTS
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PENCAPAIAN & PENGHARGAAN' : 'ACHIEVEMENTS & AWARDS', yPosition);
  yPosition += 8;
  
  data.achievements.slice(0, 5).forEach((achievement) => {
    checkPageBreak(20);
    
    // Achievement box
    setFillColor(colors.light);
    doc.rect(20, yPosition, pageWidth - 40, 18, 'F');
    
    yPosition = addText(achievement.title, 25, yPosition + 6, {
      fontSize: 10,
      fontStyle: 'bold',
      color: colors.primary,
      maxWidth: pageWidth - 50
    });
    
    yPosition = addText(`${achievement.organization} | ${achievement.date}`, 25, yPosition + 2, {
      fontSize: 9,
      color: colors.textLight
    });
    
    yPosition = addText(achievement.position, 25, yPosition + 2, {
      fontSize: 9,
      color: colors.warning,
      fontStyle: 'bold'
    });
    
    yPosition += 8;
  });
  
  // CERTIFICATES
  if (data.certificates.length > 0) {
    checkPageBreak(30);
    yPosition = addSection(language === 'id' ? 'SERTIFIKASI PROFESIONAL' : 'PROFESSIONAL CERTIFICATIONS', yPosition);
    yPosition += 8;
    
    data.certificates.slice(0, 8).forEach((cert, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        setFillColor(colors.light);
        doc.rect(20, yPosition - 2, pageWidth - 40, 10, 'F');
      }
      
      yPosition = addText(cert.name, 25, yPosition + 3, {
        fontSize: 9,
        fontStyle: 'bold',
        color: colors.primary
      });
      
      yPosition = addText(`${cert.issuer} • ${cert.date}`, 25, yPosition + 2, {
        fontSize: 8,
        color: colors.textLight
      });
      
      yPosition += 3;
    });
  }
  
  // UNIQUE THINGS
  checkPageBreak(25);
  yPosition = addSection(language === 'id' ? 'HAL UNIK TENTANG SAYA' : 'UNIQUE THINGS ABOUT ME', yPosition);
  yPosition += 8;
  
  data.uniqueThings.forEach((thing) => {
    checkPageBreak(10);
    yPosition = addBulletPoint(thing, 25, yPosition + 5, { 
      fontSize: 10, 
      color: colors.text 
    });
  });
  
  yPosition += 15;
  
  // FOOTER
  const footerY = pageHeight - 20;
  
  // Footer background
  setFillColor(colors.dark);
  doc.rect(0, footerY - 5, pageWidth, 25, 'F');
  
  // Footer content
  const footerText = language === 'id' 
    ? `CV dibuat otomatis dari Portfolio Website KOU • ${new Date().toLocaleDateString('id-ID')} • https://kou.my.id`
    : `CV generated automatically from KOU Portfolio Website • ${new Date().toLocaleDateString('en-US')} • https://kou.my.id`;
  
  addText(footerText, pageWidth / 2, footerY + 5, {
    fontSize: 8,
    color: [255, 255, 255],
    align: 'center'
  });
  
  // Page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addText(`${i} / ${pageCount}`, pageWidth - 20, pageHeight - 10, {
      fontSize: 8,
      color: colors.textLight,
      align: 'right'
    });
  }
  
  return doc;
};

export const downloadCV = (language: 'en' | 'id' = 'en') => {
  const cvData: CVData = {
    personalInfo: {
      name: 'Al-Ghani Desta Setyawan',
      title: language === 'id' ? 'Front-End Developer & UI Designer' : 'Front-End Developer & UI Designer',
      email: 'official@kou.my.id',
      phone: '+62-811-1035-42',
      location: 'East Kalimantan, Indonesia',
      website: 'https://kou.my.id',
      github: 'github.com/fk0u',
      linkedin: 'linkedin.com/in/alghani',
      instagram: '@kou.sozo'
    },
    summary: language === 'id' 
      ? 'Seorang Front-End Developer berusia 17 tahun yang bersemangat dengan pengalaman 2+ tahun dalam pengembangan web modern. Ahli dalam React, TypeScript, dan UI/UX Design. Memiliki passion dalam menciptakan pengalaman pengguna yang luar biasa, fotografi, videografi, dan selalu eager untuk mempelajari teknologi terbaru. Seorang Otaku & Kpopers yang suka minum kopi dan belajar coding sejak kelas 1 SMP.'
      : 'Passionate 17-year-old Front-End Developer with 2+ years of experience in modern web development. Skilled in React, TypeScript, and UI/UX Design. Passionate about creating exceptional user experiences, photography, videography, and always eager to learn cutting-edge technologies. An Otaku & Kpopers who loves coffee and has been learning coding since 1st grade of junior high school.',
    experience: [
      {
        title: language === 'id' ? 'Magang Web Developer' : 'Web Developer Intern',
        company: language === 'id' ? 'Dinas Pendidikan dan Kebudayaan Prov. Kalimantan Timur' : 'East Kalimantan Education and Culture Department',
        period: language === 'id' ? 'Juni 2025' : 'June 2025',
        description: [
          language === 'id' 
            ? 'Bertugas membuat aplikasi website menggunakan Next.JS dan Prisma'
            : 'Tasked with creating website applications using Next.JS and Prisma',
          language === 'id'
            ? 'Mengimplementasikan fitur-fitur modern dan responsive design'
            : 'Implemented modern features and responsive design',
          language === 'id'
            ? 'Berkolaborasi dengan tim untuk mengoptimalkan performa aplikasi'
            : 'Collaborated with team to optimize application performance'
        ]
      }
    ],
    education: [
      {
        degree: language === 'id' ? 'Pengembangan Perangkat Lunak dan Gim' : 'Software and Game Development',
        school: 'SMK Negeri 7 Samarinda',
        period: language === 'id' ? 'Juni 2023 - Juni 2026' : 'June 2023 - June 2026',
        status: language === 'id' ? 'Sedang Bersekolah' : 'Currently Enrolled'
      }
    ],
    skills: {
      technical: ['Web Design', 'UI Design', 'Photography', 'Videography', 'Creative Direction', 'AI Engineering', 'Frontend Development'],
      languages: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'C++', 'C#', 'Lua', 'R', 'Visual Basic', 'NodeJS'],
      frameworks: ['React', 'Vue', 'NextJS', 'Ionic', 'Laravel', 'Bootstrap', 'Tailwind CSS'],
      tools: ['Figma', 'Postman', 'VS Code', 'Adobe Creative Suite', 'Vite', 'Webpack', 'Git', 'MySQL', 'PostgreSQL', 'Supabase']
    },
    projects: [
      {
        name: 'iOS-Style Portfolio Website',
        description: language === 'id' 
          ? 'Portfolio website modern dengan desain iOS-style, dilengkapi dengan animasi yang smooth, dark/light mode, multi-language support, dan integrasi GitHub API real-time.'
          : 'Modern portfolio website with iOS-style design, featuring smooth animations, dark/light mode, multi-language support, and real-time GitHub API integration.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub API'],
        url: 'https://kou.my.id',
        stars: 15,
        forks: 3
      },
      {
        name: 'Professional CV Generator',
        description: language === 'id'
          ? 'Sistem generator CV otomatis yang mengambil data dari portfolio dan menghasilkan PDF profesional dengan desain yang elegan dan modern.'
          : 'Automatic CV generator system that pulls data from portfolio and generates professional PDF with elegant and modern design.',
        technologies: ['jsPDF', 'TypeScript', 'React', 'PDF Generation'],
        stars: 8,
        forks: 2
      },
      {
        name: 'GitHub Portfolio Integration',
        description: language === 'id'
          ? 'Integrasi otomatis dengan GitHub API untuk menampilkan repositori, statistik, dan aktivitas terbaru secara real-time dengan fitur search dan filter.'
          : 'Automatic integration with GitHub API to display repositories, statistics, and latest activities in real-time with search and filter features.',
        technologies: ['GitHub API', 'React', 'TypeScript', 'REST API'],
        stars: 12,
        forks: 4
      }
    ],
    achievements: [
      {
        title: language === 'id' ? 'Lomba Kompetensi Siswa (LKS) 2025' : 'Student Competency Competition (LKS) 2025',
        organization: language === 'id' ? 'Pemerintah Kota Samarinda' : 'Samarinda City Government',
        date: 'May 2025',
        level: language === 'id' ? 'Teknologi Web - Tingkat Kota' : 'Web Technology - City Level',
        position: language === 'id' ? 'Juara 3' : '3rd Place'
      },
      {
        title: 'Sentech in Borneo SMKN 7 Samarinda Classmeet',
        organization: 'SMKN 7 Samarinda',
        date: 'December 2025',
        level: language === 'id' ? 'Desain Web' : 'Web Design',
        position: language === 'id' ? 'Juara 1' : '1st Place'
      },
      {
        title: language === 'id' ? 'Kompetisi Sains Ruangguru (KSR) 2025' : 'Ruangguru Science Competition (KSR) 2025',
        organization: 'Ruangguru',
        date: 'September 2024',
        level: language === 'id' ? 'Biologi SMA' : 'Biology SMA',
        position: 'Top 200'
      }
    ],
    certificates: [
      {
        name: language === 'id' ? 'Dasar-dasar Pengembangan Web' : 'Web Development Fundamentals',
        issuer: 'Coursera',
        date: 'March 2024'
      },
      {
        name: language === 'id' ? 'Sertifikasi JavaScript ES6+' : 'JavaScript ES6+ Certification',
        issuer: 'freeCodeCamp',
        date: 'February 2024'
      },
      {
        name: language === 'id' ? 'Sertifikat React Developer' : 'React Developer Certificate',
        issuer: 'Meta',
        date: 'January 2024'
      },
      {
        name: language === 'id' ? 'Prinsip Desain UI/UX' : 'UI/UX Design Principles',
        issuer: 'Google',
        date: 'December 2023'
      }
    ],
    uniqueThings: [
      language === 'id' ? 'Belajar coding sejak kelas 1 SMP' : 'Learned coding since 1st Grade Junior High School',
      language === 'id' ? 'Seorang Otaku & Kpopers' : 'An Otaku & Kpopers',
      language === 'id' ? 'Suka minum Kopi' : 'Loves to drink Coffee',
      language === 'id' ? 'Passionate dalam fotografi dan videografi' : 'Passionate about photography and videography'
    ],
    githubStats: {
      totalRepos: 25,
      totalStars: 45,
      totalForks: 12,
      languagesCount: 10
    }
  };
  
  const doc = generateCV(cvData, language);
  const fileName = language === 'id' 
    ? 'CV_Al-Ghani_Desta_Setyawan_ID.pdf'
    : 'CV_Al-Ghani_Desta_Setyawan_EN.pdf';
  
  doc.save(fileName);
};