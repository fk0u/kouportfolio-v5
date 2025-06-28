import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, Terminal, Code, Sparkles, Zap, Star, Heart } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'language' | 'loading' | 'cli'>('intro');
  const [cliText, setCliText] = useState('');
  const [introProgress, setIntroProgress] = useState(0);
  const { setLanguage, t } = useLanguage();
  const { isDark } = useTheme();

  const cliCommands = [
    '$ npm run dev',
    '',
    '> portfolio@1.0.0 dev',
    '> vite',
    '',
    '  VITE v5.4.2  ready in 234 ms',
    '',
    '  ➜  Local:   http://localhost:5173/',
    '  ➜  Network: use --host to expose',
    '',
    '✨ Compiling components...',
    '🎨 Loading beautiful UI...',
    '🚀 Initializing portfolio...',
    '💫 Adding some magic...',
    '',
    '🎉 Portfolio ready! Welcome to KOU\'s world!',
    ''
  ];

  // Intro animation
  useEffect(() => {
    if (step === 'intro') {
      const timer = setInterval(() => {
        setIntroProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStep('language'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [step]);

  const handleLanguageSelect = (lang: typeof languages[0]) => {
    setLanguage(lang);
    setStep('loading');
    
    // Start CLI animation
    setTimeout(() => {
      setStep('cli');
      animateCLI();
    }, 1000);
  };

  const animateCLI = () => {
    let commandIndex = 0;
    let charIndex = 0;
    
    const typeCommand = () => {
      if (commandIndex < cliCommands.length) {
        const currentCommand = cliCommands[commandIndex];
        
        if (charIndex <= currentCommand.length) {
          setCliText(prev => prev + (currentCommand[charIndex] || '\n'));
          charIndex++;
          setTimeout(typeCommand, currentCommand === '' ? 100 : 30);
        } else {
          commandIndex++;
          charIndex = 0;
          setTimeout(typeCommand, 200);
        }
      } else {
        // CLI animation complete
        setTimeout(onComplete, 1500);
      }
    };
    
    typeCommand();
  };

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-float
            ${isDark ? 'bg-white/20' : 'bg-purple-500/30'}
          `}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // Interactive background elements
  const InteractiveBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-bounce" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-green-500/25 to-blue-500/25 rounded-full blur-2xl animate-spin" 
           style={{ animationDuration: '8s' }} />
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 ${bgGradient} flex items-center justify-center transition-all duration-1000 overflow-hidden`}>
      <InteractiveBackground />
      <FloatingParticles />
      
      {/* Intro Step */}
      {step === 'intro' && (
        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            {/* Animated Logo */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse">
                <div className={`
                  w-full h-full rounded-3xl flex items-center justify-center text-4xl font-bold text-white
                  ${isDark ? 'bg-gray-900' : 'bg-white'}
                `}>
                  <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                    KOU
                  </span>
                </div>
              </div>
              
              {/* Floating icons around logo */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <Code className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-blue-400 animate-bounce" />
                <Sparkles className="absolute top-1/2 -right-4 w-5 h-5 text-purple-400 animate-pulse" />
                <Zap className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Star className="absolute top-1/2 -left-4 w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white animate-bounce">
                Welcome
              </h1>
              <p className="text-xl text-white/80 animate-pulse">
                to KOU's Digital Universe
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className={`
                w-full h-2 rounded-full overflow-hidden
                ${isDark ? 'bg-white/20' : 'bg-black/20'}
              `}>
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out"
                  style={{ width: `${introProgress}%` }}
                />
              </div>
              <p className="text-white/60 text-sm mt-2">
                Loading amazing experience... {introProgress}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Step */}
      {step === 'language' && (
        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            {/* Interactive Globe */}
            <div className="relative">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 animate-float">
                <Globe className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              {/* Orbiting hearts */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
                <Heart className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-red-400 animate-pulse" />
                <Heart className="absolute top-1/2 -right-2 w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
                <Heart className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-purple-400 animate-pulse" style={{ animationDelay: '2s' }} />
                <Heart className="absolute top-1/2 -left-2 w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '3s' }} />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white animate-bounce">
                Choose Your Language
              </h1>
              <p className="text-xl text-white/80 animate-pulse">
                Select your preferred language to continue
              </p>
            </div>
          </div>
          
          <div className="flex gap-6 justify-center">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className={`
                  group flex items-center gap-4 px-8 py-4 rounded-2xl 
                  bg-white/20 backdrop-blur-md border border-white/30 
                  hover:bg-white/30 hover:scale-110 transition-all duration-300 
                  animate-fade-in hover:shadow-2xl
                `}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <span className="text-3xl group-hover:animate-bounce">{lang.flag}</span>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">{lang.name}</div>
                  <div className="text-white/70 text-sm">Click to continue</div>
                </div>
                <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading Step */}
      {step === 'loading' && (
        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="space-y-6">
            {/* Animated loading spinner */}
            <div className="relative">
              <div className="w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
              </div>
              
              {/* Pulsing dots */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white animate-pulse">
                Preparing Your Experience
              </h2>
              <p className="text-lg text-white/80">
                Setting up the magic...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CLI Step */}
      {step === 'cli' && (
        <div className="relative z-10 w-full max-w-4xl mx-4">
          <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden animate-fade-in shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-white/10 border-b border-white/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal className="w-5 h-5 text-white/70" />
                <span className="text-white/70 font-medium">KOU Portfolio Terminal</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-white/50 text-sm">Building magic...</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 h-80 overflow-hidden">
              <div className="text-green-400 font-mono text-sm whitespace-pre-line leading-relaxed">
                {cliText}
                <span className="animate-pulse bg-green-400 text-black px-1">_</span>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-white/80 text-sm">Almost ready...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;