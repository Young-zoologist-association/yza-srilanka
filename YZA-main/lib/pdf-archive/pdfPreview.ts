/** Builds a PDF viewer URL focused on the first page. */
export function getPdfPreviewUrl(pdfUrl: string, page = 1): string {
  const base = pdfUrl.split("#")[0];
  return `${base}#page=${page}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
}

/** Thumbnail embed — fits the page and hides viewer chrome where supported. */
export function getPdfThumbnailUrl(pdfUrl: string, page = 1): string {
  const base = pdfUrl.split("#")[0];
  return `${base}#page=${page}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;
}

/** Same-origin proxy URL so PDFs can be embedded in iframes reliably. */
export function getPdfProxyUrl(pdfUrl: string): string {
  return `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`;
}

export function formatFileSize(bytes?: number): string | null {
  if (!bytes || bytes <= 0) return null;

  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size >= 10 || unitIndex === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[unitIndex]}`;
}
