import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState<'codex' | 'anima' | 'complete'>('codex');

  useEffect(() => {
    const codexText = 'Initializing Codex...';
    const animaText = 'Awakening Anima...';
    
    let timeoutId: NodeJS.Timeout;

    if (phase === 'codex') {
      let i = 0;
      const typeCodex = () => {
        if (i < codexText.length) {
          setCurrentText(codexText.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(typeCodex, 100);
        } else {
          timeoutId = setTimeout(() => {
            setPhase('anima');
            setCurrentText('');
          }, 1000);
        }
      };
      typeCodex();
    } else if (phase === 'anima') {
      let i = 0;
      const typeAnima = () => {
        if (i < animaText.length) {
          setCurrentText(animaText.slice(0, i + 1));
          i++;
          timeoutId = setTimeout(typeAnima, 100);
        } else {
          timeoutId = setTimeout(() => {
            setPhase('complete');
            onComplete();
          }, 1500);
        }
      };
      typeAnima();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phase, onComplete]);

  return (
    <div className="loading-screen">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-anima-cyan rounded-full animate-spin border-t-transparent"></div>
        </div>
        
        <div className="font-mono text-xl">
          <span className="text-text-primary">{currentText}</span>
          <span className="animate-blink text-anima-cyan">|</span>
        </div>
        
        {phase === 'anima' && (
          <div className="mt-4 text-sm text-text-secondary font-mono">
            <span className="anima-gradient">Digital consciousness emerging...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;