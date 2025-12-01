import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/fk0u', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/alghani', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:official@kou.my.id', label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative grid-pattern overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center z-10">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1 className="font-satoshi text-6xl md:text-8xl font-bold" variants={itemVariants}>
              <span className="text-text-primary">Digital</span>
              <br />
              <span className="anima-gradient">Architect</span>
            </motion.h1>

            <motion.div className="font-mono text-lg md:text-xl text-text-secondary" variants={itemVariants}>
              <span className="text-anima-cyan">const</span>
              <span className="text-text-primary"> identity = </span>
              <span className="text-anima-magenta">"</span>
              <span className="text-text-primary">Al-Ghani Desta Setyawan</span>
              <span className="text-anima-magenta">"</span>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div className="max-w-3xl mx-auto space-y-6" variants={itemVariants}>
            <p className="font-inter text-xl md:text-2xl text-text-secondary leading-relaxed">
              Bridging the gap between <span className="anima-gradient font-semibold">logic</span> and
              <span className="anima-gradient font-semibold"> creativity</span>, I craft digital experiences
              that merge technical precision with artistic vision.
            </p>

            <div className="font-mono text-sm text-text-secondary">
              <span className="text-anima-cyan">// </span>
              17 years old • 2+ years experience • East Kalimantan, Indonesia
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div className="flex justify-center space-x-6" variants={itemVariants}>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-surface rounded-lg hover-anima"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div className="pt-8" variants={itemVariants}>
            <motion.a
              href="#about"
              className="inline-flex items-center space-x-2 px-8 py-4 glass-surface rounded-lg hover-anima"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-inter font-medium">Explore My Universe</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements with Parallax-like feel */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-anima-cyan rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-anima-magenta rounded-full"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-anima-cyan rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-anima-magenta rounded-full"
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-anima-gradient rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;