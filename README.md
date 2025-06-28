# 🌟 KOU Portfolio Website

<div align="center">

![KOU Portfolio](https://img.shields.io/badge/Portfolio-KOU-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Modern iOS-Style Portfolio Website with Apple Glass UI**

[🌐 Live Demo](https://kou.my.id) • [📧 Contact](mailto:official@kou.my.id) • [🐙 GitHub](https://github.com/fk0u)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 Design Philosophy](#-design-philosophy)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🌍 Internationalization](#-internationalization)
- [📱 Responsive Design](#-responsive-design)
- [🎯 Performance](#-performance)
- [🔒 Security](#-security)
- [📊 Analytics](#-analytics)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 About Developer](#-about-developer)

---

## ✨ Features

### 🎪 **Core Features**
- **🍎 iOS-Style Design**: Apple-inspired glassmorphism UI with smooth animations
- **🌓 Dark/Light Mode**: Seamless theme switching with system preference detection
- **🌍 Multi-Language**: English and Indonesian language support
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop
- **⚡ Lightning Fast**: Built with Vite for optimal performance
- **🎨 Modern Animations**: Smooth transitions and micro-interactions

### 🔗 **GitHub Integration**
- **📊 Real-time Stats**: Live GitHub statistics and repository data
- **🔍 Smart Filtering**: Search and filter repositories by language
- **📈 Activity Tracking**: Latest commits and repository updates
- **🏆 Top Projects**: Automatically showcases starred repositories
- **📋 Language Analytics**: Programming language usage statistics

### 📜 **Certificate Management**
- **📁 Auto-Detection**: Automatically scans `/public/certificates` folder
- **👁️ PDF Preview**: In-browser PDF viewing with modal interface
- **📥 Download Support**: Direct PDF download functionality
- **🔍 Search & Filter**: Find certificates by name, issuer, or date
- **📊 Statistics**: Certificate count and issuer analytics

### 📄 **Professional CV Generator**
- **🤖 Auto-Generation**: Creates professional CV from portfolio data
- **🌍 Multi-Language**: English and Indonesian CV versions
- **🎨 Modern Design**: Beautiful, ATS-friendly PDF layout
- **📊 GitHub Integration**: Includes live GitHub statistics
- **📱 Mobile Optimized**: Responsive CV generation interface

### 🏆 **Achievement Showcase**
- **🥇 Competition Results**: Display of awards and competitions
- **📅 Timeline View**: Chronological achievement listing
- **🏅 Medal System**: Visual representation of achievement levels
- **📊 Statistics**: Achievement count and category breakdown

### 📝 **Blog System**
- **📚 Content Management**: Ready-to-use blog structure
- **🏷️ Category System**: Organized content categorization
- **🔍 Search Functionality**: Find articles by title or content
- **📱 Mobile Reading**: Optimized reading experience

---

## 🎨 Design Philosophy

### **Apple-Inspired Aesthetics**
- **Glassmorphism**: Translucent elements with backdrop blur effects
- **Smooth Animations**: 60fps animations with hardware acceleration
- **Consistent Spacing**: 8px grid system for perfect alignment
- **Typography**: San Francisco-inspired font stack
- **Color Harmony**: Carefully crafted color palettes for both themes

### **User Experience First**
- **Intuitive Navigation**: iOS-style dock navigation
- **Progressive Disclosure**: Information revealed contextually
- **Accessibility**: WCAG 2.1 AA compliant design
- **Performance**: Optimized for Core Web Vitals
- **Mobile-First**: Designed primarily for mobile experience

---

## 🛠️ Tech Stack

### **Frontend Framework**
```json
{
  "framework": "React 18.3.1",
  "language": "TypeScript 5.5.3",
  "bundler": "Vite 5.4.2",
  "styling": "Tailwind CSS 3.4.1"
}
```

### **Core Dependencies**
- **⚛️ React**: Modern React with hooks and context
- **🔷 TypeScript**: Full type safety and IntelliSense
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🎯 Lucide React**: Beautiful, customizable icons
- **📄 jsPDF**: Professional PDF generation
- **🖼️ html2canvas**: HTML to canvas conversion

### **Development Tools**
- **⚡ Vite**: Next-generation frontend tooling
- **🔍 ESLint**: Code quality and consistency
- **🎯 PostCSS**: CSS processing and optimization
- **🔧 Autoprefixer**: Automatic vendor prefixing

---

## 🚀 Quick Start

### **Prerequisites**
```bash
node >= 18.0.0
npm >= 8.0.0
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/fk0u/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Build for Production**
```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### **Environment Setup**
Create a `.env` file in the root directory:
```env
# GitHub API Token (optional, for higher rate limits)
VITE_GITHUB_TOKEN=your_github_token_here
```

---

## 📁 Project Structure

```
portfolio-website/
├── 📁 public/
│   ├── 📁 certificates/          # PDF certificates storage
│   │   ├── 📄 sample-certificate.pdf
│   │   └── 📄 README.md
│   ├── 🖼️ vite.svg
│   └── 📄 index.html
├── 📁 src/
│   ├── 📁 components/            # React components
│   │   ├── 📁 sections/          # Page sections
│   │   │   ├── 🏠 HomeSection.tsx
│   │   │   ├── 💼 ProjectsSection.tsx
│   │   │   ├── 📝 BlogSection.tsx
│   │   │   ├── 👤 AboutSection.tsx
│   │   │   ├── 🏆 AchievementsSection.tsx
│   │   │   ├── 📜 CertificatesSection.tsx
│   │   │   └── ❤️ SupportSection.tsx
│   │   ├── 🎨 BackgroundAnimations.tsx
│   │   ├── 🧭 Dock.tsx
│   │   ├── 📱 MobileDock.tsx
│   │   ├── 🪟 GlassCard.tsx
│   │   ├── 📄 CVDownloadButton.tsx
│   │   ├── ⌨️ TypewriterText.tsx
│   │   └── 🎬 SplashScreen.tsx
│   ├── 📁 contexts/              # React contexts
│   │   ├── 🌍 LanguageContext.tsx
│   │   └── 🌓 ThemeContext.tsx
│   ├── 📁 hooks/                 # Custom hooks
│   │   ├── 👁️ useIntersectionObserver.ts
│   │   └── ⌨️ useTypewriter.ts
│   ├── 📁 lib/                   # Utility libraries
│   │   ├── 🐙 github.ts
│   │   ├── 📜 certificates.ts
│   │   └── 📄 cvGenerator.ts
│   ├── 📁 types/                 # TypeScript definitions
│   │   └── 📋 index.ts
│   ├── 🎨 index.css              # Global styles
│   ├── ⚛️ App.tsx                # Main app component
│   ├── 🚀 main.tsx               # App entry point
│   └── 🔧 vite-env.d.ts          # Vite type definitions
├── 📄 package.json               # Dependencies and scripts
├── 🎨 tailwind.config.js         # Tailwind configuration
├── ⚙️ vite.config.ts             # Vite configuration
├── 📋 tsconfig.json              # TypeScript configuration
└── 📖 README.md                  # Project documentation
```

---

## 🔧 Configuration

### **Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto']
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite'
      }
    }
  }
}
```

### **Vite Configuration**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  }
})
```

---

## 🌍 Internationalization

### **Supported Languages**
- 🇺🇸 **English**: Default language
- 🇮🇩 **Indonesian**: Complete translation

### **Adding New Languages**
1. Update `src/contexts/LanguageContext.tsx`:
```typescript
const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' } // New language
];
```

2. Add translations to the `translations` object
3. Update type definitions in `src/types/index.ts`

### **Translation Usage**
```typescript
const { t, currentLanguage } = useLanguage();

// Use translations
const title = t('nav.home');
const description = t('profile.bio');
```

---

## 📱 Responsive Design

### **Breakpoint System**
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### **Mobile Optimizations**
- **Touch-friendly**: 44px minimum touch targets
- **Gesture Support**: Swipe navigation and interactions
- **Performance**: Optimized animations for mobile devices
- **Viewport**: Proper viewport meta tag configuration

---

## 🎯 Performance

### **Core Web Vitals**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Optimization Techniques**
- **Code Splitting**: Dynamic imports for route-based splitting
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack Bundle Analyzer integration
- **Caching**: Service worker for offline functionality
- **Compression**: Gzip and Brotli compression

### **Performance Monitoring**
```bash
# Analyze bundle size
npm run build
npm run preview

# Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

---

## 🔒 Security

### **Security Measures**
- **CSP**: Content Security Policy headers
- **HTTPS**: SSL/TLS encryption
- **XSS Protection**: Input sanitization
- **CSRF**: Cross-Site Request Forgery protection
- **Dependencies**: Regular security audits

### **Environment Variables**
```env
# GitHub API (optional)
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 📊 Analytics

### **Tracking Implementation**
- **Google Analytics 4**: User behavior tracking
- **Performance Metrics**: Core Web Vitals monitoring
- **Error Tracking**: JavaScript error reporting
- **User Journey**: Navigation flow analysis

### **Privacy Compliance**
- **GDPR**: European privacy regulation compliance
- **CCPA**: California privacy law compliance
- **Cookie Consent**: User consent management
- **Data Minimization**: Collect only necessary data

---

## 🤝 Contributing

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured rules
- **Prettier**: Code formatting consistency
- **Conventional Commits**: Semantic commit messages

### **Testing Guidelines**
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Al-Ghani Desta Setyawan (KOU)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 About Developer

<div align="center">

### **Al-Ghani Desta Setyawan (KOU)**

*17-year-old Passionate Front-End Developer*

[![GitHub](https://img.shields.io/badge/GitHub-fk0u-black?style=for-the-badge&logo=github)](https://github.com/fk0u)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-alghani-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/alghani)
[![Instagram](https://img.shields.io/badge/Instagram-kou.sozo-purple?style=for-the-badge&logo=instagram)](https://instagram.com/kou.sozo)
[![Email](https://img.shields.io/badge/Email-official@kou.my.id-red?style=for-the-badge&logo=gmail)](mailto:official@kou.my.id)

</div>

### **🎯 Expertise**
- **💻 Front-End Development**: React, TypeScript, Next.js
- **🎨 UI/UX Design**: Figma, Adobe Creative Suite
- **📸 Photography**: Digital photography and editing
- **🎬 Videography**: Video production and post-processing
- **🤖 AI Engineering**: Prompt engineering and AI integration

### **🏆 Achievements**
- 🥇 **1st Place** - Sentech in Borneo SMKN 7 Samarinda (Web Design)
- 🥉 **3rd Place** - Student Competency Competition (LKS) 2025 (Web Technology)
- 🏅 **Top 200** - Ruangguru Science Competition (KSR) 2025
- 🎖️ **Honorable Mention** - CBP SummerFest 2025 Bank Indonesia

### **🎓 Education**
**SMK Negeri 7 Samarinda** - Software and Game Development  
*June 2023 - June 2026 (Currently Enrolled)*

### **💼 Experience**
**Web Developer Intern** - East Kalimantan Education Department  
*June 2025 - Creating web applications using Next.JS and Prisma*

### **✨ Unique Facts**
- 📚 Started coding in 1st grade of junior high school
- 🎌 Otaku & K-pop enthusiast
- ☕ Coffee lover and coding enthusiast
- 🌟 Always eager to learn new technologies

---

<div align="center">

### **🌟 Support This Project**

If you find this portfolio website helpful, please consider:

[![Star on GitHub](https://img.shields.io/badge/⭐_Star_on_GitHub-yellow?style=for-the-badge)](https://github.com/fk0u/portfolio-website)
[![Buy Me a Coffee](https://img.shields.io/badge/☕_Buy_Me_a_Coffee-orange?style=for-the-badge)](https://trakteer.id/kousozo)
[![Follow on GitHub](https://img.shields.io/badge/👤_Follow_on_GitHub-black?style=for-the-badge)](https://github.com/fk0u)

**Made with ❤️ by KOU in East Kalimantan, Indonesia**

</div>

---

<div align="center">

*"Code is poetry written in logic, design is art painted with purpose."* - KOU

**© 2024 Al-Ghani Desta Setyawan. All rights reserved.**

</div>