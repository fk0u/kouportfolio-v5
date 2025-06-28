import React, { useState, useEffect } from 'react';
import { Award, Eye, X, ChevronLeft, ChevronRight, Download, FileText, Search, Loader, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';

interface CertificateFile {
  id: string;
  name: string;
  fileName: string;
  pdfUrl: string;
  metadata?: {
    issuer?: string;
    date?: string;
    title?: string;
    recipient?: string;
  };
}

const CertificatesSection: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const { isDark } = useTheme();
  const { ref, isIntersecting } = useIntersectionObserver(0.2);
  const [certificates, setCertificates] = useState<CertificateFile[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateFile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfError, setPdfError] = useState(false);
  const certificatesPerPage = 12;

  // List of actual certificate files
  const certificateFiles = [
    'Mindluster_Certificate.pdf',
    'UC-0ead0dd9-638c-4b5b-8728-56efe361bba1.pdf',
    'certificate-DQLABAI002STTWVR.pdf',
    'certificate-DQLABBGINRDPSOHU.pdf',
    'certificate-DQLABFREECLASS01KRTHTG.pdf',
    'certificate-DQLABINTP1CUEMWI.pdf',
    'certificate-DQLABINTR1AQTENQ.pdf',
    'certificate-DQLABSQLT1VERSMH.pdf',
    'coursecertificate64c06565adec30b35d1fbd05-1705488528391.pdf',
    'coursecertificate65a85a54a2c8f6104ef6e0da-1716160463908.pdf',
    'sertifikat_course_177_3327568_061123180115.pdf',
    'sertifikat_course_292_3327568_061123191033.pdf',
    'sertifikat_course_302_3327568_061123183630.pdf',
    'sertifikat_course_315_3327568_181023172256.pdf',
    'sertifikat_course_337_3327568_111123090027.pdf',
    'sertifikat_course_382_3327568_081123181307.pdf',
    'sertifikat_course_605_3327568_061123195231.pdf',
    'sertifikat_course_60_3327568_081123185054.pdf',
    'sertifikat_course_615_3327568_070324201714.pdf',
    'sertifikat_course_653_3327568_200125113841.pdf',
    'sertifikat_course_86_3327568_031223174611.pdf',
    'Skilvul-SkilBadge-HTML Dasar (1).pdf'
  ];

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const certificateData: CertificateFile[] = certificateFiles.map((fileName, index) => {
        const id = fileName.replace('.pdf', '');
        const name = formatCertificateName(fileName);
        const metadata = extractMetadataFromFilename(fileName);
        
        return {
          id,
          name,
          fileName,
          pdfUrl: `/certificates/${fileName}`,
          metadata
        };
      });
      
      setCertificates(certificateData);
    } catch (error) {
      console.error('Error loading certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCertificateName = (fileName: string): string => {
    // Remove file extension
    let name = fileName.replace('.pdf', '');
    
    // Handle different naming patterns
    if (name.includes('certificate-DQLAB')) {
      const code = name.split('DQLAB')[1];
      return `DQLab Certificate - ${code}`;
    } else if (name.includes('sertifikat_course_')) {
      const courseId = name.match(/course_(\d+)/)?.[1];
      return `Course Certificate ${courseId}`;
    } else if (name.includes('coursecertificate')) {
      return 'Course Completion Certificate';
    } else if (name.includes('UC-')) {
      return 'Udemy Course Certificate';
    } else if (name.includes('Mindluster')) {
      return 'Mindluster Certificate';
    } else if (name.includes('Skilvul')) {
      return 'Skilvul HTML Basics Certificate';
    } else {
      // Generic formatting
      return name
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  };

  const extractMetadataFromFilename = (fileName: string) => {
    const metadata: any = {};
    
    if (fileName.includes('DQLAB')) {
      metadata.issuer = 'DQLab';
      metadata.date = '2024';
    } else if (fileName.includes('UC-')) {
      metadata.issuer = 'Udemy';
      metadata.date = '2024';
    } else if (fileName.includes('Mindluster')) {
      metadata.issuer = 'Mindluster';
      metadata.date = '2024';
    } else if (fileName.includes('Skilvul')) {
      metadata.issuer = 'Skilvul';
      metadata.date = '2024';
    } else if (fileName.includes('sertifikat_course_')) {
      metadata.issuer = 'Online Course Platform';
      
      // Extract date from filename
      const dateMatch = fileName.match(/(\d{6})/);
      if (dateMatch) {
        const dateStr = dateMatch[1];
        const day = dateStr.substring(0, 2);
        const month = dateStr.substring(2, 4);
        const year = '20' + dateStr.substring(4, 6);
        metadata.date = `${day}/${month}/${year}`;
      }
    } else if (fileName.includes('coursecertificate')) {
      metadata.issuer = 'Course Platform';
      metadata.date = '2024';
    }
    
    return metadata;
  };

  // Filter certificates based on search
  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.metadata?.issuer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const endIndex = startIndex + certificatesPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

  const openCertificate = (certificate: CertificateFile) => {
    setSelectedCertificate(certificate);
    setPdfError(false);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setPdfError(false);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadPDF = (pdfUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Create certificate preview placeholder
  const createCertificatePreview = (name: string, issuer?: string) => {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
    const color = colors[name.length % colors.length];
    
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center p-4"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: color }}
        >
          <Award className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
          {issuer && (
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {issuer}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className={`
          text-center mb-16 transition-all duration-1000
          ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className={`
            text-4xl md:text-5xl font-bold mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {t('nav.certificates')}
          </h2>
          <p className={`
            text-xl
            ${isDark ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {currentLanguage.code === 'id' ? 'Lisensi & Sertifikat Profesional' : 'Professional Licenses & Certificates'}
          </p>
        </div>

        {/* Search Bar */}
        {!loading && (
          <div className={`
            mb-8 transition-all duration-1000 delay-200
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <GlassCard className="p-4">
              <div className="relative">
                <Search className={`
                  absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                  ${isDark ? 'text-gray-400' : 'text-gray-500'}
                `} />
                <input
                  type="text"
                  placeholder={currentLanguage.code === 'id' ? 'Cari sertifikat...' : 'Search certificates...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-xl border
                    ${isDark 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' 
                      : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200
                  `}
                />
              </div>
              
              {searchTerm && (
                <div className="mt-2">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {currentLanguage.code === 'id' 
                      ? `Ditemukan ${filteredCertificates.length} sertifikat`
                      : `Found ${filteredCertificates.length} certificates`
                    }
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3">
              <Loader className={`w-6 h-6 animate-spin ${isDark ? 'text-white' : 'text-gray-900'}`} />
              <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentLanguage.code === 'id' ? 'Memuat sertifikat...' : 'Loading certificates...'}
              </span>
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        {!loading && currentCertificates.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentCertificates.map((certificate, index) => (
                <GlassCard
                  key={certificate.id}
                  className={`
                    group cursor-pointer transition-all duration-500 delay-${index * 50}
                    ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  hover={false}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    {/* Certificate Preview */}
                    <div className="aspect-[3/4] overflow-hidden rounded-t-2xl">
                      {createCertificatePreview(certificate.name, certificate.metadata?.issuer)}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openCertificate(certificate)}
                            className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            {currentLanguage.code === 'id' ? 'Lihat' : 'View'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadPDF(certificate.pdfUrl, certificate.name);
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-blue-500/30 transition-colors duration-200"
                          >
                            <Download className="w-4 h-4" />
                            PDF
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Info */}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`
                            text-sm font-bold mb-2 line-clamp-2
                            ${isDark ? 'text-white' : 'text-gray-900'}
                          `}>
                            {certificate.name}
                          </h3>
                          
                          {certificate.metadata?.issuer && (
                            <p className={`
                              text-xs font-medium mb-1
                              ${isDark ? 'text-blue-300' : 'text-blue-600'}
                            `}>
                              {certificate.metadata.issuer}
                            </p>
                          )}
                          
                          {certificate.metadata?.date && (
                            <p className={`
                              text-xs
                              ${isDark ? 'text-gray-400' : 'text-gray-500'}
                            `}>
                              {certificate.metadata.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`
                flex justify-center items-center gap-4 mb-8 transition-all duration-1000 delay-500
                ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`
                    p-2 rounded-lg transition-all duration-200
                    ${currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : isDark
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-black/5 text-gray-900'
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let page;
                    if (totalPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      page = totalPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`
                          w-10 h-10 rounded-lg font-medium transition-all duration-200
                          ${page === currentPage
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : isDark
                              ? 'hover:bg-white/10 text-gray-300'
                              : 'hover:bg-black/5 text-gray-600'
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`
                    p-2 rounded-lg transition-all duration-200
                    ${currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : isDark
                        ? 'hover:bg-white/10 text-white'
                        : 'hover:bg-black/5 text-gray-900'
                    }
                  `}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && filteredCertificates.length === 0 && certificates.length > 0 && (
          <div className="text-center py-20">
            <GlassCard className="p-8 max-w-md mx-auto">
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentLanguage.code === 'id' 
                  ? 'Tidak ada sertifikat yang ditemukan'
                  : 'No certificates found'
                }
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-all duration-200"
              >
                {currentLanguage.code === 'id' ? 'Hapus Pencarian' : 'Clear Search'}
              </button>
            </GlassCard>
          </div>
        )}

        {/* Empty State */}
        {!loading && certificates.length === 0 && (
          <div className="text-center py-20">
            <GlassCard className="p-8 max-w-md mx-auto">
              <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentLanguage.code === 'id' 
                  ? 'Belum ada sertifikat yang tersedia'
                  : 'No certificates available yet'
                }
              </p>
            </GlassCard>
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeCertificate}
            />
            
            {/* Modal Content */}
            <div className={`
              relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl
              ${isDark 
                ? 'bg-gray-900/95 border-white/20' 
                : 'bg-white/95 border-black/10'
              } 
              backdrop-blur-md border animate-fade-in shadow-2xl
            `}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedCertificate.name}
                    </h2>
                    {selectedCertificate.metadata?.issuer && (
                      <p className={`${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                        {selectedCertificate.metadata.issuer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download Button */}
                  <button
                    onClick={() => downloadPDF(selectedCertificate.pdfUrl, selectedCertificate.name)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {currentLanguage.code === 'id' ? 'Unduh' : 'Download'}
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={closeCertificate}
                    className={`
                      w-10 h-10 rounded-lg
                      ${isDark 
                        ? 'bg-white/10 hover:bg-white/20 text-white' 
                        : 'bg-black/10 hover:bg-black/20 text-gray-900'
                      } 
                      flex items-center justify-center transition-colors duration-200
                    `}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="w-full h-[calc(90vh-120px)]">
                {pdfError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <div className="text-center">
                      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                      <p className={`text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {currentLanguage.code === 'id' ? 'Gagal memuat PDF' : 'Failed to load PDF'}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {currentLanguage.code === 'id' 
                          ? 'File PDF mungkin tidak tersedia atau rusak'
                          : 'PDF file might not be available or corrupted'
                        }
                      </p>
                      <button
                        onClick={() => downloadPDF(selectedCertificate.pdfUrl, selectedCertificate.name)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        {currentLanguage.code === 'id' ? 'Coba Unduh' : 'Try Download'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={selectedCertificate.pdfUrl}
                    className="w-full h-full border-0"
                    title={selectedCertificate.name}
                    onError={() => setPdfError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {!loading && certificates.length > 0 && (
          <div className={`
            mt-16 transition-all duration-1000 delay-600
            ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2
                  ${isDark ? 'text-white' : 'text-gray-900'}
                `}>
                  {certificates.length}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Total Sertifikat' : 'Total Certificates'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-blue-500
                `}>
                  {new Set(certificates.map(cert => cert.metadata?.issuer).filter(Boolean)).size}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Penerbit' : 'Issuers'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-green-500
                `}>
                  2024
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'Tahun Terbaru' : 'Latest Year'}
                </div>
              </GlassCard>
              
              <GlassCard className="p-6 text-center">
                <div className={`
                  text-3xl font-bold mb-2 text-purple-500
                `}>
                  {certificates.length}
                </div>
                <div className={`
                  text-sm
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {currentLanguage.code === 'id' ? 'PDF Tersedia' : 'PDFs Available'}
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;