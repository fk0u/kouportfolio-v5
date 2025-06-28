import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useLanguage } from '../contexts/LanguageContext';

const TypewriterText: React.FC = () => {
  const { t } = useLanguage();
  
  const roles = [
    t('roles.frontend'),
    t('roles.ui'),
    t('roles.photographer'),
    t('roles.videographer'),
    t('roles.creative'),
    t('roles.prompt'),
    t('roles.ai'),
    t('roles.freelancer'),
  ];

  const currentText = useTypewriter(roles, 100, 50, 2000);

  return (
    <span className="inline-block min-w-0">
      <span className="text-blue-500 font-semibold">
        {currentText}
      </span>
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
};

export default TypewriterText;