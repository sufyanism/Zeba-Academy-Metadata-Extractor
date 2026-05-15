import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractPDFMetadata(file: File){

  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: buffer
  }).promise;

  const meta = await pdf.getMetadata();

  return {
    filename: file.name,
    title: meta.info?.Title || 'Unknown',
    author: meta.info?.Author || 'Unknown',
    subject: meta.info?.Subject || 'Unknown',
    keywords: meta.info?.Keywords || 'Unknown',
    pages: pdf.numPages
  };
}

export function parseCitation(text:string){

  try{

    // Better APA citation parsing
    const regex =
      /^(.+?)\s*\((\d{4})\)\.\s*(.+?)\.\s*(.+)$/;

    const match = text.match(regex);

    if(match){

      return {
        author: match[1].trim(),
        year: match[2].trim(),
        title: match[3].trim(),
        source: match[4].trim()
      };
    }

    // fallback parsing
    return {
      rawCitation: text
    };

  }catch(error){

    return {
      error: 'Citation parsing failed'
    };
  }
}
