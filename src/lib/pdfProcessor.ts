import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source to the public directory
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export interface CertificatePreview {
  filename: string;
  previewUrl: string;
  title: string;
}

export async function processPDFPreview(pdfUrl: string, filename: string): Promise<CertificatePreview> {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    // Get the first page
    const page = await pdf.getPage(1);
    
    // Set up canvas for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    
    // Get viewport for the page
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render the page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to data URL
    const previewUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    return {
      filename,
      previewUrl,
      title: filename.replace('.pdf', '').replace(/[-_]/g, ' ')
    };
  } catch (error) {
    console.error(`Error processing PDF ${filename}:`, error);
    throw error;
  }
}