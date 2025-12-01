export interface CertificateFile {
  id: string;
  name: string;
  fileName: string;
  pdfUrl: string;
  thumbnailUrl?: string;
  extractedText?: string;
  metadata?: {
    issuer?: string;
    date?: string;
    title?: string;
    recipient?: string;
  };
}

// List of certificate files that should exist in the public/certificates folder
const CERTIFICATE_FILES = [
  'web-development-fundamentals.pdf',
  'javascript-es6-certification.pdf',
  'react-developer-certificate.pdf',
  'ui-ux-design-principles.pdf',
  'digital-photography-basics.pdf',
  'video-editing-mastery.pdf',
  'python-programming.pdf',
  'database-management.pdf',
  'nodejs-backend-development.pdf',
  'responsive-web-design.pdf',
  'git-version-control.pdf',
  'agile-project-management.pdf'
];

export async function getCertificateFiles(): Promise<CertificateFile[]> {
  const certificates: CertificateFile[] = [];

  for (const fileName of CERTIFICATE_FILES) {
    try {
      // Check if file exists by trying to fetch it
      const response = await fetch(`/certificates/${fileName}`, { method: 'HEAD' });

      if (response.ok) {
        const id = fileName.replace('.pdf', '');
        const name = fileName
          .replace('.pdf', '')
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        certificates.push({
          id,
          name,
          fileName,
          pdfUrl: `/certificates/${fileName}`,
          thumbnailUrl: `/certificates/thumbnails/${id}.jpg`, // Optional thumbnail
        });
      }
    } catch (error) {
      console.warn(`Certificate file ${fileName} not found:`, error);
    }
  }

  return certificates;
}

export async function extractTextFromPDF(pdfUrl: string): Promise<string> {
  try {
    // This is a simplified version - in a real implementation,
    // you might want to use a more robust PDF text extraction library
    const response = await fetch(pdfUrl);
    await response.arrayBuffer();

    // For now, return a placeholder - you can integrate with PDF.js or similar
    return 'Text extraction from PDF would be implemented here using PDF.js or similar library';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return '';
  }
}

export function parseCertificateMetadata(text: string): CertificateFile['metadata'] {
  const metadata: CertificateFile['metadata'] = {};

  // Simple regex patterns to extract common certificate information
  const patterns = {
    issuer: /(?:issued by|from|by)\s+([A-Za-z\s]+)(?:\n|$)/i,
    date: /(?:date|issued|completed).*?(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}|[A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
    title: /(?:certificate of|certification in|course:)\s+([A-Za-z\s]+)/i,
    recipient: /(?:awarded to|presented to|this certifies that)\s+([A-Za-z\s]+)/i
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match && match[1]) {
      metadata[key as keyof CertificateFile['metadata']] = match[1].trim();
    }
  }

  return metadata;
}

// Generate thumbnail from PDF first page
export async function generatePDFThumbnail(_pdfUrl: string): Promise<string> {
  try {
    // This would use PDF.js to render the first page as an image
    // For now, return a placeholder
    return '/api/placeholder/400/300';
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return '/api/placeholder/400/300';
  }
}