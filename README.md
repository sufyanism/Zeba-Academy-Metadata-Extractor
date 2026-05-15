# Zeba Academy Metadata Extractor
A fully frontend-based scholarly metadata extraction tool that runs entirely in the browser using TypeScript + Vite. Users can upload research paper PDFs or paste academic citations, and the application extracts metadata locally without using any backend, database, API, authentication system, or server-side processing.

## Features
- Upload PDF files directly in browser
- Extract PDF metadata locally using PDF.js
- Parse academic citations using regex
- Display metadata in responsive frontend tables
- Export extracted metadata as JSON
- Responsive academic UI
- Dark mode interface
- Fake terminal-style extraction logs
- No backend architecture
- No database required
- Works entirely in browser

## Tech Stack
- TypeScript
- Vite
- PDF.js
- HTML5
- CSS3

## Project Structure

```plaintext
project/
│
├── src/
│   ├── main.ts
│   ├── parser.ts
│   ├── styles.css
│   └── regex.ts
│
├── public/
│
├── dist/
│
├── package.json
└── vite.config.ts
```

# Installation

## Clone repository:
`git clone https://github.com/sufyanism/Zeba-Academy-Metadata-Extractor.git`

## Move into project folder:
`cd Zeba-Academy-Metadata-Extractor`

## Install dependencies:
`npm install`
