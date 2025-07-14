import React from 'react';
import { Mail } from 'lucide-react';

const CTAButton: React.FC = () => {
  const scrollToContact = () => {
    // For now, just scroll to bottom since we don't have a contact section yet
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToContact}
      className="cta-button group"
      title="Get in touch"
    >
      <Mail className="w-6 h-6 text-anima-cyan group-hover:text-anima-magenta transition-colors" />
    </button>
  );
};

export default CTAButton;