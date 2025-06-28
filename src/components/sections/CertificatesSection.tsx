import React, { useState, useEffect } from 'react';
import { Award, Eye, X, ChevronLeft, ChevronRight, Download, FileText, Search, Loader, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GlassCard from '../GlassCard';

interface CertificateFile {
  id: string;
  name: string;
  fileName: string;
  pdfUrl: string;
  thumbnailUrl?: string;
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
  const [showDetails, setShowDetails] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const certificatesPerPage = 6;

  // Generate certificate data for certificate-alghani-(1) through (22)
  const generateCertificateData = (): CertificateFile[] => {
    const certificates: CertificateFile[] = [];
    
    // Certificate titles and issuers (you can customize these)
    const certificateInfo = [
      { title: 'Web Development Fundamentals', issuer: 'Coursera', date: 'March 2024' },
      { title: 'JavaScript ES6+ Certification', issuer: 'freeCodeCamp', date: 'February 2024' },
      { title: 'React Developer Certificate', issuer: 'Meta', date: 'January 2024' },
      { title: 'UI/UX Design Principles', issuer: 'Google', date: 'December 2023' },
      { title: 'Digital Photography Basics', issuer: 'Adobe', date: 'November 2023' },
      { title: 'Video Editing Mastery', issuer: 'Udemy', date: 'October 2023' },
      { title: 'Python Programming', issuer: 'Python Institute', date: 'September 2023' },
      { title: 'Database Management', issuer: 'Oracle', date: 'August 2023' },
      { title: 'Node.js Backend Development', issuer: 'MongoDB University', date: 'July 2023' },
      { title: 'Responsive Web Design', issuer: 'freeCodeCamp', date: 'June 2023' },
      { title: 'Git Version Control', issuer: 'GitHub', date: 'May 2023' },
      { title: 'Agile Project Management', issuer: 'Scrum Alliance', date: 'April 2023' },
      { title: 'TypeScript Advanced Concepts', issuer: 'Microsoft', date: 'March 2023' },
      { title: 'CSS Grid and Flexbox', issuer: 'CSS-Tricks', date: 'February 2023' },
      { title: 'API Development with REST', issuer: 'Postman', date: 'January 2023' },
      { title: 'Mobile App Development', issuer: 'React Native', date: 'December 2022' },
      { title: 'Cloud Computing Basics', issuer: 'AWS', date: 'November 2022' },
      { title: 'Cybersecurity Fundamentals', issuer: 'CompTIA', date: 'October 2022' },
      { title: 'Machine Learning Introduction', issuer: 'Stanford Online', date: 'September 2022' },
      { title: 'Data Visualization', issuer: 'Tableau', date: 'August 2022' },
      { title: 'DevOps Essentials', issuer: 'Docker', date: 'July 2022' },
      { title: 'Software Testing Automation', issuer: 'Selenium', date: 'June 2022' }
    ];

    for (let i = 1; i <= 22; i++) {
      const info = certificateInfo[i - 1] || {
        title: `Professional Certificate ${i}`,
        issuer: 'Professional Institute',
        date: '2023'
      };

      certificates.push({
        id: `certificate-alghani-${i}`,
        name: info.title,
        fileName: `certificate-alghani-(${i}).pdf`,
        pdfUrl: `/certificates/certificate-alghani-(${i}).pdf`,
        metadata: {
          issuer: info.issuer,
          date: info.date,
          title: info.title,
          recipient: 'Al-Ghani Desta Setyawan'
        }
      });
    }
    
    return certificates;
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate certificate data
      const certificateData = generateCertificateData();
      
      // Verify which files actually exist
      const existingCertificates: CertificateFile[] = [];
      
      for (const cert of certificateData) {
        try {
          // Check if file exists by trying to fetch it
          const response = await fetch(cert.pdfUrl, { method: 'HEAD' });
          if (response.ok) {
            existingCertificates.push(cert);
          }
        } catch (error) {
          console.warn(`Certificate file ${cert.fileName} not found`);
        }
      }
      
      setCertificates(existingCertificates);
    } catch (error) {
      console.error('Error loading certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter certificates based on search
  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.metadata?.issuer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
  const startIndex = (currentPage - 1) * certificatesPerPage;
  const endIndex = startIndex + certificatesPerPage;
  const currentCertificates = filteredCertificates.slice(startIndex, endIndex);

  const openCertificate = (certificate: CertificateFile) => {
    setSelectedCertificate(certificate);
    setShowDetails(false);
    setPdfError(false);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setShowDetails(false);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCertificates.map((certificate, index) => (
              <GlassCard
                key={certificate.id}
                className={`
                  group cursor-pointer transition-all duration-500 delay-${index * 100}
                  ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                hover={false}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Certificate Preview */}
                  <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <FileText className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {certificate.name}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openCertificate(certificate)}
                          className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          {currentLanguage.code === 'id' ? 'Preview' : 'Preview'}
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCertificate(certificate);
                            setTimeout(() => setShowDetails(true), 500);
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 backdrop-blur-md rounded-lg text-white font-medium hover:bg-purple-500/30 transition-colors duration-200"
                        >
                          <Info className="w-4 h-4" />
                          {currentLanguage.code === 'id' ? 'Detail' : 'Details'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          text-lg font-bold mb-2 line-clamp-2
                          ${isDark ? 'text-white' : 'text-gray-900'}
                        `}>
                          {certificate.name}
                        </h3>
                        
                        {certificate.metadata?.issuer && (
                          <p className={`
                            text-sm font-medium mb-1
                            ${isDark ? 'text-blue-300' : 'text-blue-600'}
                          `}>
                            {certificate.metadata.issuer}
                          </p>
                        )}
                        
                        {certificate.metadata?.date && (
                          <p className={`
                            text-sm
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
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentLanguage.code === 'id' 
                  ? 'Tambahkan file PDF ke folder /public/certificates'
                  : 'Add PDF files to /public/certificates folder'
                }
              </p>
            </GlassCard>
          </div>
        )}

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
                  {/* Toggle Details */}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
                      ${showDetails
                        ? 'bg-purple-500 text-white'
                        : isDark
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-black/10 hover:bg-black/20 text-gray-900'
                      }
                    `}
                  >
                    <Info className="w-4 h-4" />
                    {currentLanguage.code === 'id' ? 'Detail' : 'Details'}
                  </button>

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

              <div className="flex h-[calc(90vh-120px)]">
                {/* PDF Preview */}
                <div className={`${showDetails ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
                  <div className="w-full h-full">
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

                {/* Details Panel */}
                {showDetails && (
                  <div className="w-1/3 border-l border-gray-200/20 p-6 overflow-y-auto">
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {currentLanguage.code === 'id' ? 'Detail Sertifikat' : 'Certificate Details'}
                    </h3>

                    {/* Metadata */}
                    {selectedCertificate.metadata && (
                      <div className="space-y-4">
                        {selectedCertificate.metadata.title && (
                          <div>
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentLanguage.code === 'id' ? 'Judul' : 'Title'}
                            </label>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {selectedCertificate.metadata.title}
                            </p>
                          </div>
                        )}

                        {selectedCertificate.metadata.issuer && (
                          <div>
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentLanguage.code === 'id' ? 'Penerbit' : 'Issuer'}
                            </label>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {selectedCertificate.metadata.issuer}
                            </p>
                          </div>
                        )}

                        {selectedCertificate.metadata.date && (
                          <div>
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentLanguage.code === 'id' ? 'Tanggal' : 'Date'}
                            </label>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {selectedCertificate.metadata.date}
                            </p>
                          </div>
                        )}

                        {selectedCertificate.metadata.recipient && (
                          <div>
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {currentLanguage.code === 'id' ? 'Penerima' : 'Recipient'}
                            </label>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {selectedCertificate.metadata.recipient}
                            </p>
                          </div>
                        )}

                        <div>
                          <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {currentLanguage.code === 'id' ? 'Nama File' : 'File Name'}
                          </label>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {selectedCertificate.fileName}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
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