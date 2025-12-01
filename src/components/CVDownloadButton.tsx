import React, { useState } from 'react';
import { Download, FileText, Loader, Star, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { downloadCV } from '../lib/cvGenerator';
import GlassCard from './GlassCard';

const CVDownloadButton: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleDownload = async (language: 'en' | 'id') => {
    setIsGenerating(true);
    setShowOptions(false);

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      downloadCV(language);
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Main Download Button */}
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          disabled={isGenerating}
          className={`
            group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg
            bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white
            hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 
            transition-all duration-300 transform-gpu
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${isGenerating ? 'animate-pulse' : ''}
            overflow-hidden
          `}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

          <div className="relative z-10 flex items-center gap-3">
            {isGenerating ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                <span className="font-bold">
                  {currentLanguage.code === 'id' ? 'Membuat CV...' : 'Generating CV...'}
                </span>
              </>
            ) : (
              <>
                <div className="relative">
                  <FileText className="w-6 h-6 group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                </div>
                <span className="font-bold">
                  {currentLanguage.code === 'id' ? 'Download CV' : 'Download CV'}
                </span>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Language Options Modal - Fixed positioning with highest z-index */}
      {showOptions && !isGenerating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with highest z-index */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowOptions(false)}
          />

          {/* Modal Content with highest z-index */}
          <div className="relative z-[10000] max-w-md w-full animate-fade-in">
            <GlassCard className="p-6 shadow-2xl border-2 border-white/20">
              <div className="space-y-4">
                {/* Header */}
                <div className="text-center border-b border-gray-200/20 pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FileText className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {currentLanguage.code === 'id' ? 'Pilih Format CV' : 'Choose CV Format'}
                    </h3>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentLanguage.code === 'id'
                      ? 'CV profesional dengan desain modern dan elegan'
                      : 'Professional CV with modern and elegant design'
                    }
                  </p>
                </div>

                {/* Language Options */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleDownload('en')}
                    className={`
                      w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                      ${isDark
                        ? 'hover:bg-white/10 bg-white/5 border border-white/10'
                        : 'hover:bg-blue-50 bg-gray-50 border border-gray-200'
                      }
                      hover:scale-105 hover:shadow-lg
                    `}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-2xl">🇺🇸</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        English Version
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Professional CV in English
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          International Standard
                        </span>
                      </div>
                    </div>
                    <Download className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-500 transition-colors duration-200`} />
                  </button>

                  <button
                    onClick={() => handleDownload('id')}
                    className={`
                      w-full group flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                      ${isDark
                        ? 'hover:bg-white/10 bg-white/5 border border-white/10'
                        : 'hover:bg-red-50 bg-gray-50 border border-gray-200'
                      }
                      hover:scale-105 hover:shadow-lg
                    `}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <span className="text-2xl">🇮🇩</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Indonesian Version
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        CV Profesional dalam Bahasa Indonesia
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Award className="w-3 h-3 text-green-500" />
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          Standar Lokal Indonesia
                        </span>
                      </div>
                    </div>
                    <Download className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-red-500 transition-colors duration-200`} />
                  </button>
                </div>

                {/* Features */}
                <div className={`pt-4 border-t border-gray-200/20`}>
                  <p className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentLanguage.code === 'id' ? 'Fitur CV:' : 'CV Features:'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {currentLanguage.code === 'id' ? 'Desain Modern' : 'Modern Design'}
                    </div>

                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {currentLanguage.code === 'id' ? 'Data Lengkap' : 'Complete Data'}
                    </div>

                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {currentLanguage.code === 'id' ? 'GitHub Stats' : 'GitHub Stats'}
                    </div>

                    <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      {currentLanguage.code === 'id' ? 'Format PDF' : 'PDF Format'}
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setShowOptions(false)}
                  className={`
                    w-full mt-4 py-3 text-sm rounded-lg transition-colors duration-200 font-medium
                    ${isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  {currentLanguage.code === 'id' ? 'Tutup' : 'Close'}
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </>
  );
};

export default CVDownloadButton;