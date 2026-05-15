import './styles.css';
import { extractPDFMetadata, parseCitation } from './parser';

const upload = document.getElementById('pdf-upload') as HTMLInputElement;
const citation = document.getElementById('citation') as HTMLTextAreaElement;
const tableBody = document.querySelector('#metadata-table tbody') as HTMLTableSectionElement;
const logs = document.getElementById('logs') as HTMLDivElement;
const exportBtn = document.getElementById('export-btn') as HTMLButtonElement;

let metadata:any = null;

function log(text:string){
  const p = document.createElement('p');
  p.textContent = '> ' + text;
  logs.appendChild(p);
}

function renderTable(data:any){

  tableBody.innerHTML = '';

  Object.entries(data).forEach(([key, value]) => {

    const row = document.createElement('tr');

    const field = document.createElement('td');
    field.textContent = String(key);

    const val = document.createElement('td');
    val.textContent = String(value);

    row.appendChild(field);
    row.appendChild(val);

    tableBody.appendChild(row);
  });
}

upload.addEventListener('change', async () => {

  const file = upload.files?.[0];

  if(!file) return;

  try{

    log('Scanning PDF...');

    metadata = await extractPDFMetadata(file);

    renderTable(metadata);

    log('PDF metadata extracted.');

  }catch(error){

    console.error(error);

    log('Failed to parse PDF.');
  }
});

citation.addEventListener('input', () => {

  const text = citation.value.trim();

  if(!text) return;

  metadata = parseCitation(text);

  renderTable(metadata);

  log('Citation parsed successfully.');
});

exportBtn.addEventListener('click', () => {

  if(!metadata){
    alert('No metadata found');
    return;
  }

  const blob = new Blob(
    [JSON.stringify(metadata, null, 2)],
    {
      type: 'application/json'
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = 'metadata.json';

  a.click();

  URL.revokeObjectURL(url);

  log('JSON exported.');
});
