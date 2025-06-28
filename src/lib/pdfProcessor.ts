import * as pdfjsLib from 'pdfjs-dist';

// Set worker source to public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modificationDate?: string;
  keywords?: string;
}

export interface ExtractedCertificateInfo {
  title?: string;
  issuer?: string;
  recipient?: string;
  date?: string;
  courseId?: string;
  completionDate?: string;
}

export class PDFProcessor {
  static async generateThumbnail(pdfUrl: string, scale: number = 1.5): Promise<string> {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      // Get first page
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale });
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render page to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      
      await page.render(renderContext).promise;
      
      // Convert canvas to data URL
      return canvas.toDataURL('image/jpeg', 0.8);
    } catch (error) {
      console.error('Error generating PDF thumbnail:', error);
      throw error;
    }
  }
  
  static async extractMetadata(pdfUrl: string): Promise<PDFMetadata> {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      const metadata = await pdf.getMetadata();
      
      return {
        title: metadata.info?.Title,
        author: metadata.info?.Author,
        subject: metadata.info?.Subject,
        creator: metadata.info?.Creator,
        producer: metadata.info?.Producer,
        creationDate: metadata.info?.CreationDate,
        modificationDate: metadata.info?.ModificationDate,
        keywords: metadata.info?.Keywords,
      };
    } catch (error) {
      console.error('Error extracting PDF metadata:', error);
      return {};
    }
  }
  
  static async extractTextFromFirstPage(pdfUrl: string): Promise<string> {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      // Get first page
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      
      // Extract text items
      const textItems = textContent.items.map((item: any) => item.str);
      return textItems.join(' ');
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      return '';
    }
  }
  
  static parseCertificateInfo(text: string, metadata: PDFMetadata): ExtractedCertificateInfo {
    const info: ExtractedCertificateInfo = {};
    
    // Clean text for better parsing
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    // Extract title from metadata first, then from text
    if (metadata.title && metadata.title.trim()) {
      info.title = metadata.title.trim();
    } else {
      // Try to find certificate title patterns
      const titlePatterns = [
        /(?:certificate of|certification in|course:)\s+([^.!?\n]+)/i,
        /(?:this is to certify|hereby certifies)\s+.*?(?:has completed|successfully completed)\s+([^.!?\n]+)/i,
        /(?:completion of|successful completion of)\s+([^.!?\n]+)/i,
      ];
      
      for (const pattern of titlePatterns) {
        const match = cleanText.match(pattern);
        if (match && match[1]) {
          info.title = match[1].trim();
          break;
        }
      }
    }
    
    // Extract issuer/organization
    const issuerPatterns = [
      /(?:issued by|from|by|presented by)\s+([A-Za-z\s&.,]+?)(?:\s|$|\.)/i,
      /(?:university|institute|academy|school|college|organization|company)\s*:?\s*([A-Za-z\s&.,]+)/i,
      /([A-Za-z\s&.,]+)\s+(?:university|institute|academy|school|college)/i,
    ];
    
    for (const pattern of issuerPatterns) {
      const match = cleanText.match(pattern);
      if (match && match[1] && match[1].length > 2) {
        info.issuer = match[1].trim().replace(/[.,]+$/, '');
        break;
      }
    }
    
    // Extract recipient name
    const recipientPatterns = [
      /(?:awarded to|presented to|this certifies that|hereby certify that)\s+([A-Za-z\s.]+?)(?:\s|$|has|for)/i,
      /(?:name|student|participant)\s*:?\s*([A-Za-z\s.]+)/i,
    ];
    
    for (const pattern of recipientPatterns) {
      const match = cleanText.match(pattern);
      if (match && match[1] && match[1].length > 2) {
        info.recipient = match[1].trim();
        break;
      }
    }
    
    // Extract dates
    const datePatterns = [
      /(?:date|issued|completed|graduation|awarded)\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
      /(?:date|issued|completed|graduation|awarded)\s*:?\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
      /(?:date|issued|completed|graduation|awarded)\s*:?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i,
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/,
      /([A-Za-z]+\s+\d{1,2},?\s+\d{4})/,
      /(\d{1,2}\s+[A-Za-z]+\s+\d{4})/,
    ];
    
    for (const pattern of datePatterns) {
      const match = cleanText.match(pattern);
      if (match && match[1]) {
        info.date = match[1].trim();
        break;
      }
    }
    
    // Extract course ID if available
    const courseIdPatterns = [
      /(?:course id|course code|certificate id|id)\s*:?\s*([A-Za-z0-9\-_]+)/i,
      /([A-Z]{2,}\d{3,})/,
    ];
    
    for (const pattern of courseIdPatterns) {
      const match = cleanText.match(pattern);
      if (match && match[1]) {
        info.courseId = match[1].trim();
        break;
      }
    }
    
    return info;
  }
  
  static async processCertificate(pdfUrl: string): Promise<{
    thumbnail: string;
    metadata: PDFMetadata;
    extractedInfo: ExtractedCertificateInfo;
  }> {
    try {
      const [thumbnail, metadata, text] = await Promise.all([
        this.generateThumbnail(pdfUrl),
        this.extractMetadata(pdfUrl),
        this.extractTextFromFirstPage(pdfUrl),
      ]);
      
      const extractedInfo = this.parseCertificateInfo(text, metadata);
      
      return {
        thumbnail,
        metadata,
        extractedInfo,
      };
    } catch (error) {
      console.error('Error processing certificate:', error);
      throw error;
    }
  }
}