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
  
  // Modern Color Palette
  const colors = {
    primary: [37, 99, 235],      // Blue-600
    secondary: [99, 102, 241],   // Indigo-500
    accent: [147, 51, 234],      // Purple-600
    success: [34, 197, 94],      // Green-500
    warning: [245, 158, 11],     // Amber-500
    error: [239, 68, 68],        // Red-500
    gray: {
      50: [249, 250, 251],
      100: [243, 244, 246],
      200: [229, 231, 235],
      300: [209, 213, 219],
      400: [156, 163, 175],
      500: [107, 114, 128],
      600: [75, 85, 99],
      700: [55, 65, 81],
      800: [31, 41, 55],
      900: [17, 24, 39]
    }
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
      color = colors.gray[900], 
      fontStyle = 'normal', 
      align = 'left', 
      maxWidth,
      lineHeight = 1.4
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
  
  const addSection = (title: string, y: number, icon?: string) => {
    // Section background with gradient effect
    setFillColor(colors.gray[50]);
    doc.roundedRect(15, y - 8, pageWidth - 30, 16, 2, 2, 'F');
    
    // Section accent line
    setFillColor(colors.primary);
    doc.rect(15, y - 8, 4, 16, 'F');
    
    // Icon (if provided)
    if (icon) {
      addText(icon, 25, y, {
        fontSize: 14,
        color: colors.primary,
        fontStyle: 'bold'
      });
    }
    
    // Section title
    return addText(title, icon ? 35 : 25, y, {
      fontSize: 14,
      color: colors.primary,
      fontStyle: 'bold'
    });
  };
  
  const addBulletPoint = (text: string, x: number, y: number, options: any = {}) => {
    // Modern bullet
    setFillColor(colors.primary);
    doc.circle(x + 2, y - 1.5, 1.5, 'F');
    
    // Text
    return addText(text, x + 8, y, { 
      ...options, 
      maxWidth: pageWidth - x - 25,
      lineHeight: 1.3
    });
  };
  
  const addSkillBadge = (skill: string, x: number, y: number, color = colors.primary) => {
    const textWidth = doc.getTextWidth(skill) + 8;
    
    // Badge background with rounded corners
    setFillColor(color);
    doc.roundedRect(x, y - 5, textWidth, 10, 3, 3, 'F');
    
    // Badge text
    addText(skill, x + 4, y + 1, {
      fontSize: 8,
      color: [255, 255, 255],
      fontStyle: 'bold'
    });
    
    return x + textWidth + 6;
  };
  
  const addProgressBar = (label: string, percentage: number, x: number, y: number, width: number = 60) => {
    // Label
    addText(label, x, y, {
      fontSize: 9,
      color: colors.gray[700],
      fontStyle: 'bold'
    });
    
    // Background bar
    setFillColor(colors.gray[200]);
    doc.roundedRect(x, y + 3, width, 4, 2, 2, 'F');
    
    // Progress bar
    setFillColor(colors.primary);
    doc.roundedRect(x, y + 3, (width * percentage / 100), 4, 2, 2, 'F');
    
    // Percentage text
    addText(`${percentage}%`, x + width + 5, y + 5, {
      fontSize: 8,
      color: colors.gray[600]
    });
    
    return y + 12;
  };
  
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPosition = 25;
      return true;
    }
    return false;
  };
  
  // HEADER SECTION - Modern Design
  const headerHeight = 80;
  
  // Header background with gradient simulation
  for (let i = 0; i < headerHeight; i++) {
    const ratio = i / headerHeight;
    const r = Math.round(colors.primary[0] + (colors.secondary[0] - colors.primary[0]) * ratio);
    const g = Math.round(colors.primary[1] + (colors.secondary[1] - colors.primary[1]) * ratio);
    const b = Math.round(colors.primary[2] + (colors.secondary[2] - colors.primary[2]) * ratio);
    
    doc.setFillColor(r, g, b);
    doc.rect(0, i, pageWidth, 1, 'F');
  }
  
  // Decorative geometric elements
  setFillColor([255, 255, 255, 0.1]);
  doc.circle(pageWidth - 25, 15, 12, 'F');
  doc.circle(25, headerHeight - 15, 8, 'F');
  
  // Profile photo placeholder (modern circle)
  setFillColor([255, 255, 255]);
  doc.circle(35, 35, 18, 'F');
  setFillColor(colors.gray[300]);
  doc.circle(35, 35, 16, 'F');
  
  // Add initials in profile circle
  const initials = data.personalInfo.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  addText(initials, 35, 38, {
    fontSize: 16,
    color: colors.primary,
    fontStyle: 'bold',
    align: 'center'
  });
  
  // Name with modern typography
  addText(data.personalInfo.name, 60, 25, {
    fontSize: 24,
    color: [255, 255, 255],
    fontStyle: 'bold'
  });
  
  // Title with accent
  addText(data.personalInfo.title, 60, 35, {
    fontSize: 12,
    color: [255, 255, 255, 0.9]
  });
  
  // Contact info in modern layout
  const contactY = 50;
  const contactItems = [
    { icon: '📧', text: data.personalInfo.email, type: 'email' },
    { icon: '📱', text: data.personalInfo.phone, type: 'phone' },
    { icon: '📍', text: data.personalInfo.location, type: 'location' },
    { icon: '🌐', text: data.personalInfo.website, type: 'website' }
  ];
  
  contactItems.forEach((item, index) => {
    const x = 60 + (index * 35);
    
    // Contact item background
    setFillColor([255, 255, 255, 0.15]);
    doc.roundedRect(x, contactY - 3, 32, 12, 2, 2, 'F');
    
    addText(item.icon, x + 2, contactY + 3, {
      fontSize: 8,
      color: [255, 255, 255]
    });
    
    addText(item.text, x + 8, contactY + 3, {
      fontSize: 6,
      color: [255, 255, 255],
      maxWidth: 22
    });
  });
  
  yPosition = headerHeight + 20;
  
  // PROFESSIONAL SUMMARY
  yPosition = addSection(language === 'id' ? 'RINGKASAN PROFESIONAL' : 'PROFESSIONAL SUMMARY', yPosition, '👨‍💻');
  yPosition += 5;
  
  // Summary in modern card
  setFillColor(colors.gray[50]);
  doc.roundedRect(20, yPosition - 3, pageWidth - 40, 30, 4, 4, 'F');
  
  // Add subtle border
  doc.setDrawColor(colors.gray[200][0], colors.gray[200][1], colors.gray[200][2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, yPosition - 3, pageWidth - 40, 30, 4, 4, 'S');
  
  yPosition = addText(data.summary, 25, yPosition + 5, { 
    fontSize: 10, 
    maxWidth: pageWidth - 50,
    color: colors.gray[700],
    lineHeight: 1.5
  });
  
  yPosition += 20;
  
  // GITHUB STATISTICS - Enhanced Design
  checkPageBreak(40);
  yPosition = addSection(language === 'id' ? 'STATISTIK GITHUB' : 'GITHUB STATISTICS', yPosition, '📊');
  yPosition += 8;
  
  const statsBoxWidth = (pageWidth - 60) / 4;
  const statsData = [
    { 
      label: language === 'id' ? 'Repositori' : 'Repositories', 
      value: data.githubStats.totalRepos, 
      color: colors.primary,
      icon: '📁'
    },
    { 
      label: language === 'id' ? 'Bintang' : 'Stars', 
      value: data.githubStats.totalStars, 
      color: colors.warning,
      icon: '⭐'
    },
    { 
      label: 'Forks', 
      value: data.githubStats.totalForks, 
      color: colors.success,
      icon: '🔀'
    },
    { 
      label: language === 'id' ? 'Bahasa' : 'Languages', 
      value: data.githubStats.languagesCount, 
      color: colors.accent,
      icon: '💻'
    }
  ];
  
  statsData.forEach((stat, index) => {
    const x = 25 + (index * statsBoxWidth);
    
    // Stat card with shadow effect
    setFillColor(colors.gray[50]);
    doc.roundedRect(x, yPosition, statsBoxWidth - 8, 25, 4, 4, 'F');
    
    // Colored top border
    setFillColor(stat.color);
    doc.roundedRect(x, yPosition, statsBoxWidth - 8, 3, 4, 4, 'F');
    
    // Icon
    addText(stat.icon, x + 5, yPosition + 12, {
      fontSize: 12
    });
    
    // Value
    addText(stat.value.toString(), x + 15, yPosition + 12, {
      fontSize: 16,
      color: stat.color,
      fontStyle: 'bold'
    });
    
    // Label
    addText(stat.label, x + 5, yPosition + 20, {
      fontSize: 8,
      color: colors.gray[600]
    });
  });
  
  yPosition += 35;
  
  // EXPERIENCE with Timeline Design
  checkPageBreak(50);
  yPosition = addSection(language === 'id' ? 'PENGALAMAN KERJA' : 'WORK EXPERIENCE', yPosition, '💼');
  yPosition += 10;
  
  data.experience.forEach((exp, index) => {
    checkPageBreak(40);
    
    // Timeline design
    setFillColor(colors.primary);
    doc.circle(30, yPosition + 8, 4, 'F');
    
    // Timeline line
    if (index < data.experience.length - 1) {
      doc.setDrawColor(colors.gray[300][0], colors.gray[300][1], colors.gray[300][2]);
      doc.setLineWidth(2);
      doc.line(30, yPosition + 12, 30, yPosition + 45);
    }
    
    // Experience card
    setFillColor(colors.gray[50]);
    doc.roundedRect(40, yPosition, pageWidth - 60, 35, 4, 4, 'F');
    
    // Job title
    yPosition = addText(exp.title, 45, yPosition + 10, {
      fontSize: 12,
      fontStyle: 'bold',
      color: colors.primary
    });
    
    // Company and period
    yPosition = addText(`${exp.company} | ${exp.period}`, 45, yPosition + 2, {
      fontSize: 10,
      color: colors.gray[600],
      fontStyle: 'italic'
    });
    
    // Description
    exp.description.forEach((desc) => {
      yPosition = addBulletPoint(desc, 50, yPosition + 5, { 
        fontSize: 9, 
        color: colors.gray[700] 
      });
    });
    
    yPosition += 15;
  });
  
  // EDUCATION
  checkPageBreak(35);
  yPosition = addSection(language === 'id' ? 'PENDIDIKAN' : 'EDUCATION', yPosition, '🎓');
  yPosition += 10;
  
  data.education.forEach((edu) => {
    checkPageBreak(25);
    
    // Education card
    setFillColor(colors.gray[50]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 22, 4, 4, 'F');
    
    // Graduation cap icon
    addText('🎓', 25, yPosition + 8, { fontSize: 12 });
    
    yPosition = addText(edu.degree, 35, yPosition + 8, {
      fontSize: 11,
      fontStyle: 'bold',
      color: colors.primary
    });
    
    yPosition = addText(`${edu.school} | ${edu.period}`, 35, yPosition + 2, {
      fontSize: 10,
      color: colors.gray[600]
    });
    
    if (edu.status) {
      yPosition = addText(edu.status, 35, yPosition + 2, {
        fontSize: 9,
        color: colors.success,
        fontStyle: 'italic'
      });
    }
    
    yPosition += 12;
  });
  
  // TECHNICAL SKILLS - Enhanced with Progress Bars
  checkPageBreak(60);
  yPosition = addSection(language === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS', yPosition, '⚡');
  yPosition += 10;
  
  // Programming Languages with skill levels
  yPosition = addText(language === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.primary
  });
  yPosition += 8;
  
  const programmingSkills = [
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 75 },
    { name: 'PHP', level: 70 }
  ];
  
  programmingSkills.forEach((skill, index) => {
    const x = 25 + (index % 2) * 90;
    if (index % 2 === 0 && index > 0) yPosition += 15;
    yPosition = addProgressBar(skill.name, skill.level, x, yPosition);
  });
  
  yPosition += 10;
  
  // Frameworks as badges
  yPosition = addText(language === 'id' ? 'Framework & Library:' : 'Frameworks & Libraries:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.accent
  });
  yPosition += 8;
  
  let currentX = 25;
  data.skills.frameworks.forEach((framework) => {
    if (currentX + doc.getTextWidth(framework) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 15;
    }
    currentX = addSkillBadge(framework, currentX, yPosition, colors.accent);
  });
  
  yPosition += 20;
  
  // Tools
  yPosition = addText('Tools & Technologies:', 20, yPosition, {
    fontSize: 11,
    fontStyle: 'bold',
    color: colors.success
  });
  yPosition += 8;
  
  currentX = 25;
  data.skills.tools.forEach((tool) => {
    if (currentX + doc.getTextWidth(tool) + 15 > pageWidth - 20) {
      currentX = 25;
      yPosition += 15;
    }
    currentX = addSkillBadge(tool, currentX, yPosition, colors.success);
  });
  
  yPosition += 25;
  
  // FEATURED PROJECTS - Enhanced Cards
  checkPageBreak(50);
  yPosition = addSection(language === 'id' ? 'PROYEK UNGGULAN' : 'FEATURED PROJECTS', yPosition, '🚀');
  yPosition += 10;
  
  data.projects.slice(0, 4).forEach((project, index) => {
    checkPageBreak(35);
    
    const projectColors = [colors.primary, colors.accent, colors.success, colors.warning];
    const projectColor = projectColors[index % projectColors.length];
    
    // Project card with modern design
    setFillColor(colors.gray[50]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 32, 4, 4, 'F');
    
    // Colored accent bar
    setFillColor(projectColor);
    doc.roundedRect(20, yPosition, 4, 32, 4, 4, 'F');
    
    // Project icon
    addText('🚀', 30, yPosition + 10, { fontSize: 12 });
    
    yPosition = addText(project.name, 40, yPosition + 10, {
      fontSize: 12,
      fontStyle: 'bold',
      color: projectColor
    });
    
    if (project.url) {
      yPosition = addText(`🔗 ${project.url}`, 40, yPosition + 2, {
        fontSize: 8,
        color: colors.gray[600]
      });
    }
    
    yPosition = addText(project.description, 40, yPosition + 3, {
      fontSize: 9,
      maxWidth: pageWidth - 65,
      color: colors.gray[700]
    });
    
    // Technologies as small badges
    yPosition += 5;
    currentX = 40;
    project.technologies.slice(0, 4).forEach((tech) => {
      if (currentX + doc.getTextWidth(tech) + 10 > pageWidth - 25) {
        currentX = 40;
        yPosition += 12;
      }
      currentX = addSkillBadge(tech, currentX, yPosition, colors.gray[400]);
    });
    
    yPosition += 18;
  });
  
  // ACHIEVEMENTS with Medal Design
  checkPageBreak(50);
  yPosition = addSection(language === 'id' ? 'PENCAPAIAN & PENGHARGAAN' : 'ACHIEVEMENTS & AWARDS', yPosition, '🏆');
  yPosition += 10;
  
  data.achievements.slice(0, 5).forEach((achievement, index) => {
    checkPageBreak(25);
    
    // Medal based on position
    let medal = '🥉';
    let medalColor = colors.warning;
    if (achievement.position.includes('1st') || achievement.position.includes('Juara 1')) {
      medal = '🥇';
      medalColor = colors.warning;
    } else if (achievement.position.includes('2nd') || achievement.position.includes('Juara 2')) {
      medal = '🥈';
      medalColor = colors.gray[400];
    }
    
    // Achievement card
    setFillColor(colors.gray[50]);
    doc.roundedRect(20, yPosition, pageWidth - 40, 22, 4, 4, 'F');
    
    // Medal icon
    addText(medal, 25, yPosition + 10, { fontSize: 14 });
    
    yPosition = addText(achievement.title, 40, yPosition + 8, {
      fontSize: 10,
      fontStyle: 'bold',
      color: colors.primary,
      maxWidth: pageWidth - 70
    });
    
    yPosition = addText(`${achievement.organization} | ${achievement.date}`, 40, yPosition + 2, {
      fontSize: 9,
      color: colors.gray[600]
    });
    
    yPosition = addText(achievement.position, 40, yPosition + 2, {
      fontSize: 9,
      color: medalColor,
      fontStyle: 'bold'
    });
    
    yPosition += 12;
  });
  
  // CERTIFICATES
  if (data.certificates.length > 0) {
    checkPageBreak(40);
    yPosition = addSection(language === 'id' ? 'SERTIFIKASI PROFESIONAL' : 'PROFESSIONAL CERTIFICATIONS', yPosition, '📜');
    yPosition += 10;
    
    // Certificates in grid layout
    const certPerRow = 2;
    const certWidth = (pageWidth - 60) / certPerRow;
    
    data.certificates.slice(0, 8).forEach((cert, index) => {
      const row = Math.floor(index / certPerRow);
      const col = index % certPerRow;
      const x = 25 + (col * certWidth);
      const y = yPosition + (row * 20);
      
      checkPageBreak(25);
      
      // Certificate card
      setFillColor(colors.gray[50]);
      doc.roundedRect(x, y, certWidth - 5, 18, 3, 3, 'F');
      
      // Certificate icon
      addText('📋', x + 3, y + 8, { fontSize: 10 });
      
      addText(cert.name, x + 12, y + 6, {
        fontSize: 8,
        fontStyle: 'bold',
        color: colors.primary,
        maxWidth: certWidth - 20
      });
      
      addText(`${cert.issuer} • ${cert.date}`, x + 12, y + 12, {
        fontSize: 7,
        color: colors.gray[600],
        maxWidth: certWidth - 20
      });
    });
    
    yPosition += Math.ceil(data.certificates.slice(0, 8).length / certPerRow) * 20 + 10;
  }
  
  // UNIQUE THINGS
  checkPageBreak(30);
  yPosition = addSection(language === 'id' ? 'HAL UNIK TENTANG SAYA' : 'UNIQUE THINGS ABOUT ME', yPosition, '✨');
  yPosition += 10;
  
  data.uniqueThings.forEach((thing, index) => {
    checkPageBreak(12);
    
    // Unique thing with icon
    const icons = ['🎯', '🎨', '☕', '📚', '🚀'];
    const icon = icons[index % icons.length];
    
    addText(icon, 25, yPosition + 5, { fontSize: 10 });
    yPosition = addBulletPoint(thing, 35, yPosition + 5, { 
      fontSize: 10, 
      color: colors.gray[700] 
    });
  });
  
  yPosition += 15;
  
  // ENHANCED FOOTER
  const footerY = pageHeight - 25;
  
  // Footer background
  setFillColor(colors.gray[800]);
  doc.rect(0, footerY - 8, pageWidth, 33, 'F');
  
  // Footer content with modern layout
  const footerText = language === 'id' 
    ? `CV dibuat otomatis dari Portfolio Website KOU • ${new Date().toLocaleDateString('id-ID')} • https://kou.my.id`
    : `CV generated automatically from KOU Portfolio Website • ${new Date().toLocaleDateString('en-US')} • https://kou.my.id`;
  
  addText(footerText, pageWidth / 2, footerY, {
    fontSize: 8,
    color: [255, 255, 255],
    align: 'center'
  });
  
  // QR Code placeholder
  setFillColor([255, 255, 255]);
  doc.roundedRect(pageWidth - 25, footerY - 5, 15, 15, 2, 2, 'F');
  addText('QR', pageWidth - 17.5, footerY + 2, {
    fontSize: 8,
    color: colors.gray[800],
    align: 'center'
  });
  
  // Page numbers with modern styling
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Page number background
    setFillColor(colors.primary);
    doc.circle(pageWidth - 15, pageHeight - 15, 8, 'F');
    
    addText(`${i}`, pageWidth - 15, pageHeight - 12, {
      fontSize: 10,
      color: [255, 255, 255],
      fontStyle: 'bold',
      align: 'center'
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