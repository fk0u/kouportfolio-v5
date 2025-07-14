import React from 'react';
import { MessageCircle } from 'lucide-react';

const CTAButton: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className="cta-button flex items-center justify-center"
      aria-label="Contact me"
    >
      <MessageCircle className="w-6 h-6 text-bg-primary" />
    </button>
  );
};

export default CTAButton;