import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CTAButton: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={scrollToContact}
      className="cta-button flex items-center justify-center"
      aria-label="Contact me"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <MessageCircle className="w-6 h-6 text-bg-primary" />
    </motion.button>
  );
};

export default CTAButton;