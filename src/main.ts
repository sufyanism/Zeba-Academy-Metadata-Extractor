import "./styles.css";
import { extractPDFMetadata, parseCitation } from "./parser";

const upload = document.getElementById("pdf-upload") as HTMLInputElement;
const citation = document.getElementById("citation") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLDivElement;
const logs = document.getElementById("logs") as HTMLDivElement;
const exportBtn = document.getElementById("export-btn") as HTMLButtonElement;

let metadata: any = null;

function log(text: string) {
  const p = document.createElement("p");
  p.textContent = "> " + text;
  logs.appendChild(p);
}

function render(data: any) {
  output.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  Object.entries(data).forEach(([key, value]) => {
    const item = document.createElement("p");
    item.innerHTML = `<strong>${key}</strong>: ${value}`;
    card.appendChild(item);
  });

  output.appendChild(card);
}

upload.addEventListener("change", async () => {
  const file = upload.files?.[0];

  if (!file) return;

  log("Scanning PDF...");

  try {
    metadata = await extractPDFMetadata(file);

    log("Metadata extracted.");

    render(metadata);

  } catch (error) {
    console.error(error);

    log("Failed to extract metadata.");
  }
});

citation.addEventListener("input", () => {
  if (!citation.value.trim()) return;

  metadata = parseCitation(citation.value);

  log("Citation parsed.");

  render(metadata);
});

exportBtn.addEventListener("click", () => {
  if (!metadata) {
    alert("No metadata available.");
    return;
  }

  const json = JSON.stringify(metadata, null, 2);

  const blob = new Blob([json], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "metadata.json";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  log("JSON exported successfully.");
});
