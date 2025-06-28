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
  
  // Enhanced Colors
  const primaryColor = [37, 99, 235]; // Blue-600
  const secondaryColor = [75, 85, 99]; // Gray-600
  const accentColor = [147, 51, 234]; // Purple-600
  const successColor = [34, 197, 94]; // Green-500
  const warningColor = [245, 158, 11]; // Amber-500
  const lightGray = [248, 250, 252]; // Gray-50
  const darkGray = [31, 41, 55]; // Gray-800
  
  // Helper functions
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const { fontSize = 10, color = [0, 0, 0], fontStyle = 'normal', align = 'left', maxWidth } = options;
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont('helvetica', fontStyle);
    
    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string, index: number) => {
        const lineY = y + (index * fontSize * 0.4);
        if (align === 'center') {
          doc.text(line, x, lineY, { align: 'center' });
        } else if (align === 'right') {
          doc.text(line, x, lineY, { align: 'right' });
        } else {
          doc.text(line, x, lineY);
        }
      });
      return y + (lines.length * fontSize * 0.4);
    } else {
      if (align === 'center') {
        doc.text(text, x, y, { align: 'center' });
      } else if (align === 'right') {
        doc.text(text, x, y, { align: 'right' });
      } else {
        doc.text(text, x, y);
      }
      return y + (fontSize * 0.4);
    }
  };
  
  const addSection = (title: string, y: number, icon?: string) => {
    // Section background
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.rect(15, y - 5, pageWidth - 30, 12, 'F');
    
    // Section border
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(15, y - 5, pageWidth - 15, y - 5);
    doc.line(15, y + 7, pageWidth - 15, y + 7);
    
    // Icon (if provided)
    if (icon) {
      addText(icon, 20, y + 3, {
        fontSize: 12,
        color: primaryColor
      });
    }
    
    // Section title
    return addText(title, icon ? 30 : 20, y + 3, {
      fontSize: 13,
      color: primaryColor,
      fontStyle: 'bold'
    });
  };
  
  const addBulletPoint = (text: string, x: number, y: number, options: any = {}) => {
    // Bullet
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(x, y - 1, 1, 'F');
    
    // Text
    return addText(text, x + 5, y, { ...options, maxWidth: pageWidth - x - 25 });
  };
  
  const addSkillBadge = (skill: string, x: number, y: number, color = primaryColor) => {
    const textWidth = doc.getTextWidth(skill) + 6;
    
    // Badge background
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(x, y - 4, textWidth, 8, 2, 2, 'F');
    
    // Badge text
    addText(skill, x + 3, y + 1, {
      fontSize: 8,
      color: [255, 255, 255],
      fontStyle: 'bold'
    });
    
    return x + textWidth + 5;
  };
  
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 25) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };
  
  // Enhanced Header Section with Gradient Effect
  const headerHeight = 70;
  
  // Gradient background simulation
  for (let i = 0; i < headerHeight; i++) {
    const ratio = i / headerHeight;
    const r = Math.round(primaryColor[0] + (accentColor[0] - primaryColor[0]) * ratio);
    const g = Math.round(primaryColor[1] + (accentColor[1] - primaryColor[1]) * ratio);
    const b = Math.round(primaryColor[2] + (accentColor[2] - primaryColor[2]) * ratio);
    
    doc.setFillColor(r, g, b);
    doc.rect(0, i, pageWidth, 1, 'F');
  }
  
  // Decorative elements
  doc.setFillColor(255, 255, 255, 0.1);
  doc.circle(pageWidth - 30, 20, 15, 'F');
  doc.circle(30, headerHeight - 20, 10, 'F');
  
  // Name with shadow effect
  addText(data.personalInfo.name, pageWidth / 2 + 1, 26, {
    fontSize: 26,
    color: [0, 0, 0, 0.3],
    fontStyle: 'bold',
    align: 'center'
  });
  
  addText(data.personalInfo.name, pageWidth / 2, 25, {
    fontSize: 26,
    color: [255, 255, 255],
    fontStyle: 'bold',
    align: 'center'
  });
  
  // Title with accent
  addText(data.personalInfo.title, pageWidth / 2, 35, {
    fontSize: 14,
    color: [255, 255, 255],
    align: 'center'
  });
  
  // Contact Info in styled boxes
  const contactY = 50;
  const contactInfo = [
    { icon: '📧', text: data.personalInfo.email },
    { icon: '📱', text: data.personalInfo.phone },
    { icon: '📍', text: data.personalInfo.location },
    { icon: '🌐', text: data.personalInfo.website }
  ];
  
  const contactWidth = (pageWidth - 40) / contactInfo.length;
  contactInfo.forEach((info, index) => {
    const x = 20 + (index * contactWidth);
    
    // Contact box
    doc.setFillColor(255, 255, 255, 0.2);
    doc.roundedRect(x, contactY - 5, contactWidth - 5, 12, 2, 2, 'F');
    
    addText(info.icon, x + 3, contactY + 2, {
      fontSize: 8,
      color: [255, 255, 255]
    });
    
    addText(info.text, x + 12, contactY + 2, {
      fontSize: 7,
      color: [255, 255, 255],
      maxWidth: contactWidth - 15
    });
  });
  
  yPosition = headerHeight + 15;
  
  // Professional Summary with enhanced styling
  yPosition = addSection(language === 'id' ? 'RINGKASAN PROFESIONAL' : 'PROFESSIONAL SUMMARY', yPosition, '👨‍💻');
  yPosition += 8;
  
  // Summary box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.roundedRect(20, yPosition - 3, pageWidth - 40, 25, 3, 3, 'F');
  
  yPosition = addText(data.summary, 25, yPosition + 3, { 
    fontSize: 10, 
    maxWidth: pageWidth - 50,
    color: darkGray
  });
  
  yPosition += 15;
  
  // GitHub Stats Section
  checkPageBreak(35);
  yPosition = addSection(language === 'id' ? 'STATISTIK GITHUB' : 'GITHUB STATISTICS', yPosition, '📊');
  yPosition += 8;
  
  const statsBoxWidth = (pageWidth - 50) / 4;
  const statsData = [
    { label: language === 'id' ? 'Repositori' : 'Repositories', value: data.githubStats.totalRepos, color: primaryColor },
    { label: language === 'id' ? 'Bintang' : 'Stars', value: data.githubStats.totalStars, color: warningColor },
    { label: 'Forks', value: data.githubStats.totalForks, color: successColor },
    { label: language === 'id' ? 'Bahasa' : 'Languages', value: data.githubStats.languagesCount, color: accentColor }
  ];
  
  statsData.forEach((stat, index) => {
    const x = 20 + (index * statsBoxWidth);
    
    // Stat box
    doc.setFillColor(stat.color[0], stat.color[1], stat.color[2]);
    doc.roundedRect(x, yPosition, statsBoxWidth - 5, 20, 3, 3, 'F');
    
    // Value
    addText(stat.value.toString(), x + (statsBoxWidth / 2) - 2.5, yPosition + 8, {
      fontSize: 16,
      color: [255, 255, 255],
      fontStyle: 'bold',
      align: 'center'
    });
    
    // Label
    addText(stat.label, x + (statsBoxWidth / 2) - 2.5, yPosition + 16, {
      fontSize: 8,
      color: [255, 255, 255],
      align: 'center'
    });
  });
  
  yPosition += 30;
  
  // Experience with timeline
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE', yPosition, '💼');
  yPosition += 8;
  
  data.experience.forEach((exp, index) => {
    checkPageBreak(35);
    
    // Timeline dot
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(25, yPosition + 5, 3, 'F');
    
    if (index < data.experience.length - 1) {
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(2);
      doc.line(25, yPosition + 8, 25, yPosition + 35);
    }
    
    // Experience box
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(35, yPosition, pageWidth - 55, 30, 3, 3, 'F');
    
    // Job title
    yPosition = addText(exp.title, 40, yPosition + 8, {
      fontSize: 12,
      fontStyle: 'bold',
      color: primaryColor
    });
    
    // Company and period
    yPosition = addText(`${exp.company} | ${exp.period}`, 40, yPosition + 2, {
      fontSize: 10,
      color: secondaryColor,
      fontStyle: 'italic'
    });
    
    // Description
    exp.description.forEach((desc) => {
      yPosition = addBulletPoint(desc, 45, yPosition + 4, { fontSize: 9, color: darkGray });
    });
    
    yPosition += 10;
  });
  
  // Education
  checkPageBreak(30);
  yPosition = addSection(language === 'id' ? 'PENDIDIKAN' : 'EDUCATION', yPosition, '🎓');
  yPosition += 8;
  
  data.education.forEach((edu) => {
    checkPageBreak(20);
    
    // Education box
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 18, 3, 3, 'F');
    
    yPosition = addText(edu.degree, 25, yPosition + 6, {
      fontSize: 11,
      fontStyle: 'bold',
      color: primaryColor
    });
    
    yPosition = addText(`${edu.school} | ${edu.period}`, 25, yPosition + 2, {
      fontSize: 10,
      color: secondaryColor
    });
    
    if (edu.status) {
      yPosition = addText(edu.status, 25, yPosition + 2, {
        fontSize: 9,
        color: successColor,
        fontStyle: 'italic'
      });
    }
    
    yPosition += 8;
  });
  
  // Skills with enhanced badges
  checkPageBreak(50);
  yPosition = addSection(language === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS', yPosition, '⚡');
  yPosition += 8;
  
  // Programming Languages
  yPosition = addText(language === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: primaryColor
  });
  yPosition += 5;
  
  let currentX = 25;
  data.skills.languages.forEach((lang) => {
    if (currentX + doc.getTextWidth(lang) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(lang, currentX, yPosition, primaryColor);
  });
  
  yPosition += 15;
  
  // Frameworks
  yPosition = addText(language === 'id' ? 'Framework & Library:' : 'Frameworks & Libraries:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: accentColor
  });
  yPosition += 5;
  
  currentX = 25;
  data.skills.frameworks.forEach((framework) => {
    if (currentX + doc.getTextWidth(framework) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(framework, currentX, yPosition, accentColor);
  });
  
  yPosition += 15;
  
  // Tools
  yPosition = addText('Tools & Technologies:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: successColor
  });
  yPosition += 5;
  
  currentX = 25;
  data.skills.tools.forEach((tool) => {
    if (currentX + doc.getTextWidth(tool) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 12;
    }
    currentX = addSkillBadge(tool, currentX, yPosition, successColor);
  });
  
  yPosition += 20;
  
  // Featured Projects
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PROYEK UNGGULAN' : 'FEATURED PROJECTS', yPosition, '🚀');
  yPosition += 8;
  
  data.projects.slice(0, 4).forEach((project, index) => {
    checkPageBreak(30);
    
    // Project box with gradient
    const projectColors = [primaryColor, accentColor, successColor, warningColor];
    const projectColor = projectColors[index % projectColors.length];
    
    doc.setFillColor(projectColor[0], projectColor[1], projectColor[2]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 5, 2, 2, 'F');
    
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(20, yPosition + 5, pageWidth - 40, 25, 0, 0, 'F');
    
    yPosition = addText(project.name, 25, yPosition + 12, {
      fontSize: 12,
      fontStyle: 'bold',
      color: projectColor
    });
    
    if (project.url) {
      yPosition = addText(`🔗 ${project.url}`, 25, yPosition + 2, {
        fontSize: 8,
        color: secondaryColor
      });
    }
    
    yPosition = addText(project.description, 25, yPosition + 3, {
      fontSize: 9,
      maxWidth: pageWidth - 50,
      color: darkGray
    });
    
    // Technologies as badges
    yPosition += 3;
    currentX = 25;
    project.technologies.forEach((tech) => {
      if (currentX + doc.getTextWidth(tech) + 10 > pageWidth - 25) {
        currentX = 25;
        yPosition += 10;
      }
      currentX = addSkillBadge(tech, currentX, yPosition, [156, 163, 175]);
    });
    
    yPosition += 15;
  });
  
  // Achievements with medals
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'PENCAPAIAN & PENGHARGAAN' : 'ACHIEVEMENTS & AWARDS', yPosition, '🏆');
  yPosition += 8;
  
  data.achievements.slice(0, 5).forEach((achievement) => {
    checkPageBreak(20);
    
    // Medal icon based on position
    let medal = '🥉';
    if (achievement.position.includes('1st') || achievement.position.includes('Juara 1')) medal = '🥇';
    else if (achievement.position.includes('2nd') || achievement.position.includes('Juara 2')) medal = '🥈';
    
    // Achievement box
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 18, 3, 3, 'F');
    
    addText(medal, 25, yPosition + 8, { fontSize: 12 });
    
    yPosition = addText(achievement.title, 35, yPosition + 6, {
      fontSize: 10,
      fontStyle: 'bold',
      color: primaryColor,
      maxWidth: pageWidth - 70
    });
    
    yPosition = addText(`${achievement.organization} | ${achievement.date}`, 35, yPosition + 2, {
      fontSize: 9,
      color: secondaryColor
    });
    
    yPosition = addText(achievement.position, 35, yPosition + 2, {
      fontSize: 9,
      color: warningColor,
      fontStyle: 'bold'
    });
    
    yPosition += 8;
  });
  
  // Unique Things About Me
  checkPageBreak(30);
  yPosition = addSection(language === 'id' ? 'HAL UNIK TENTANG SAYA' : 'UNIQUE THINGS ABOUT ME', yPosition, '✨');
  yPosition += 8;
  
  data.uniqueThings.forEach((thing) => {
    checkPageBreak(10);
    yPosition = addBulletPoint(thing, 25, yPosition + 5, { 
      fontSize: 10, 
      color: darkGray 
    });
  });
  
  yPosition += 10;
  
  // Certificates
  if (data.certificates.length > 0) {
    checkPageBreak(30);
    yPosition = addSection(language === 'id' ? 'SERTIFIKASI PROFESIONAL' : 'PROFESSIONAL CERTIFICATIONS', yPosition, '📜');
    yPosition += 8;
    
    data.certificates.slice(0, 8).forEach((cert, index) => {
      checkPageBreak(12);
      
      if (index % 2 === 0) {
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.rect(20, yPosition - 2, pageWidth - 40, 10, 'F');
      }
      
      yPosition = addText(`📋 ${cert.name}`, 25, yPosition + 3, {
        fontSize: 9,
        fontStyle: 'bold',
        color: primaryColor
      });
      
      yPosition = addText(`   ${cert.issuer} • ${cert.date}`, 25, yPosition + 2, {
        fontSize: 8,
        color: secondaryColor
      });
      
      yPosition += 3;
    });
  }
  
  // Enhanced Footer with QR code placeholder
  const footerY = pageHeight - 20;
  
  // Footer background
  doc.setFillColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.rect(0, footerY - 5, pageWidth, 25, 'F');
  
  // Footer content
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    language === 'id' 
      ? `CV dibuat otomatis dari Portfolio Website KOU • ${new Date().toLocaleDateString('id-ID')} • https://kou.my.id`
      : `CV generated automatically from KOU Portfolio Website • ${new Date().toLocaleDateString('en-US')} • https://kou.my.id`,
    pageWidth / 2,
    footerY + 5,
    { align: 'center' }
  );
  
  // Page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(`${i} / ${pageCount}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
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
            : 'Collaborated with team to optimize application performance',
          language === 'id'
            ? 'Mengintegrasikan database dan API untuk fungsionalitas penuh'
            : 'Integrated database and APIs for full functionality'
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
      },
      {
        name: 'Certificate Management System',
        description: language === 'id'
          ? 'Sistem manajemen sertifikat dengan fitur auto-detection PDF, preview modal, dan OCR untuk ekstraksi metadata sertifikat.'
          : 'Certificate management system with PDF auto-detection, preview modal, and OCR for certificate metadata extraction.',
        technologies: ['PDF.js', 'OCR', 'React', 'File Management'],
        stars: 6,
        forks: 1
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
      },
      {
        title: language === 'id' ? 'CBP SummerFest 2025 Bank Indonesia Prov. Kalimantan Timur' : 'CBP SummerFest 2025 Bank Indonesia East Kalimantan',
        organization: language === 'id' ? 'Bank Indonesia Prov. Kalimantan Timur' : 'Bank Indonesia East Kalimantan',
        date: 'August 2024',
        level: language === 'id' ? 'Konten Kreatif - Tingkat Provinsi' : 'Creative Content - Provincial Level',
        position: 'Honorable Mention 1'
      },
      {
        title: language === 'id' ? 'CBP SummerFest 2025 Bank Indonesia Prov. Kalimantan Timur' : 'CBP SummerFest 2025 Bank Indonesia East Kalimantan',
        organization: language === 'id' ? 'Bank Indonesia Prov. Kalimantan Timur' : 'Bank Indonesia East Kalimantan',
        date: 'August 2024',
        level: language === 'id' ? 'Konten Kreatif - Tingkat Kota' : 'Creative Content - City Level',
        position: language === 'id' ? 'Juara 3' : '3rd Place'
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
      },
      {
        name: language === 'id' ? 'Dasar-dasar Fotografi Digital' : 'Digital Photography Basics',
        issuer: 'Adobe',
        date: 'November 2023'
      },
      {
        name: language === 'id' ? 'Penguasaan Editing Video' : 'Video Editing Mastery',
        issuer: 'Udemy',
        date: 'October 2023'
      },
      {
        name: language === 'id' ? 'Pemrograman Python' : 'Python Programming',
        issuer: 'Python Institute',
        date: 'September 2023'
      },
      {
        name: language === 'id' ? 'Manajemen Database' : 'Database Management',
        issuer: 'Oracle',
        date: 'August 2023'
      }
    ],
    uniqueThings: [
      language === 'id' ? 'Belajar coding sejak kelas 1 SMP' : 'Learned coding since 1st Grade Junior High School',
      language === 'id' ? 'Seorang Otaku & Kpopers' : 'An Otaku & Kpopers',
      language === 'id' ? 'Suka minum Kopi' : 'Loves to drink Coffee',
      language === 'id' ? 'Passionate dalam fotografi dan videografi' : 'Passionate about photography and videography',
      language === 'id' ? 'Selalu eager untuk belajar teknologi baru' : 'Always eager to learn new technologies'
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