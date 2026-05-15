import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractPDFMetadata(file: File) {
  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: buffer
  }).promise;

  const metadata = await pdf.getMetadata();

  return {
    filename: file.name,
    title: metadata.info?.Title || "Unknown",
    author: metadata.info?.Author || "Unknown",
    subject: metadata.info?.Subject || "Unknown",
    keywords: metadata.info?.Keywords || "Unknown",
    pages: pdf.numPages
  };
}

export function parseCitation(text: string) {
  const regex =
    /(.*)\((\d{4})\)\.\s(.*)\.\s(.*)/;

  const match = text.match(regex);

  if (!match) {
    return {
      error: "Could not parse citation"
    };
  }

  return {
    author: match[1].trim(),
    year: match[2],
    title: match[3].trim(),
    source: match[4].trim()
  };
}
