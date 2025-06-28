import React, { useState, useEffect } from 'react';
import { Award, Download, Eye, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { GlassCard } from '../GlassCard';
import { processPDFPreview, type CertificatePreview } from '../../lib/pdfProcessor';

const CertificatesSection: React.FC = () => {
  const { language } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [certificates, setCertificates] = useState<CertificatePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const content = {
    en: {
      title: 'Certificates & Achievements',
      subtitle: 'Professional certifications and learning milestones',
      loading: 'Loading certificates...',
      view: 'View',
      download: 'Download',
      close: 'Close'
    },
    id: {
      title: 'Sertifikat & Pencapaian',
      subtitle: 'Sertifikasi profesional dan pencapaian pembelajaran',
      loading: 'Memuat sertifikat...',
      view: 'Lihat',
      download: 'Unduh',
      close: 'Tutup'
    }
  };

  const t = content[language];

  // Get list of certificate files
  const getCertificateFiles = async (): Promise<string[]> => {
    try {
      const response = await fetch('/certificates/');
      const text = await response.text();
      
      // Parse the directory listing to extract PDF filenames
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const links = doc.querySelectorAll('a[href$=".pdf"]');
      
      return Array.from(links).map(link => {
        const href = link.getAttribute('href');
        return href ? decodeURIComponent(href) : '';
      }).filter(Boolean);
    } catch (error) {
      console.error('Error fetching certificate list:', error);
      // Fallback to known certificate files
      return [
        'certificate-alghani-(1).pdf',
        'certificate-alghani-(2).pdf',
        'certificate-alghani-(3).pdf',
        'certificate-alghani-(4).pdf',
        'certificate-alghani-(5).pdf',
        'certificate-alghani-(6).pdf',
        'certificate-alghani-(7).pdf',
        'certificate-alghani-(8).pdf',
        'certificate-alghani-(9).pdf',
        'certificate-alghani-(10).pdf',
        'certificate-alghani-(11).pdf',
        'certificate-alghani-(12).pdf',
        'certificate-alghani-(13).pdf',
        'certificate-alghani-(14).pdf',
        'certificate-alghani-(15).pdf',
        'certificate-alghani-(16).pdf',
        'certificate-alghani-(17).pdf',
        'certificate-alghani-(18).pdf',
        'certificate-alghani-(19).pdf',
        'certificate-alghani-(20).pdf',
        'certificate-alghani-(21).pdf',
        'certificate-alghani-(22).pdf',
        'Mindluster_Certificate.pdf',
        'UC-0ead0dd9-638c-4b5b-8728-56efe361bba1.pdf',
        'certificate-DQLABAI002STTWVR.pdf',
        'certificate-DQLABBGINRDPSOHU.pdf',
        'certificate-DQLABFREECLASS01KRTHTG.pdf',
        'certificate-DQLABINTP1CUEMWI.pdf',
        'certificate-DQLABINTR1AQTENQ.pdf',
        'certificate-DQLABSQLT1VERSMH.pdf'
      ];
    }
  };

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const certificateFiles = await getCertificateFiles();
      const previews: CertificatePreview[] = [];

      for (const filename of certificateFiles) {
        try {
          const pdfUrl = `/certificates/${filename}`;
          const preview = await processPDFPreview(pdfUrl, filename);
          previews.push(preview);
        } catch (error) {
          console.error(`Error processing certificate ${filename}:`, error);
          // Continue with other certificates even if one fails
        }
      }

      setCertificates(previews);
    } catch (error) {
      console.error('Error loading certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      loadCertificates();
    }
  }, [isVisible]);

  const openCertificate = (filename: string) => {
    setSelectedCertificate(filename);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
  };

  const downloadCertificate = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/certificates/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-blue-400 mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.title}
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="mt-4 text-gray-300">{t.loading}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <GlassCard
                key={cert.filename}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={cert.previewUrl}
                    alt={cert.filename}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openCertificate(cert.filename)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                        title={t.view}
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => downloadCertificate(cert.filename)}
                        className="p-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
                        title={t.download}
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={closeCertificate}
                className="absolute -top-12 right-0 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors z-10"
                title={t.close}
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="bg-white rounded-lg overflow-hidden">
                <iframe
                  src={`/certificates/${selectedCertificate}`}
                  className="w-full h-[80vh]"
                  title="Certificate Viewer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;