import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState(0);
  
  const texts = [
    'Initializing Codex...',
    'Awakening Anima...'
  ];

  useEffect(() => {
    if (phase < texts.length) {
      const text = texts[phase];
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setCurrentText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setPhase(phase + 1);
            setCurrentText('');
          }, 500);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [phase]);

  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="font-mono text-xl text-anima-cyan">
          {currentText}
          <span className="animate-blink">|</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;