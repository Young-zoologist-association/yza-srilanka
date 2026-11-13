import type { BookletsPageData, PdfResourceItemData } from "./types";
import type { BookletItemAcf, BookletsPageAcf, WpBookletsPageResponse } from "./wordpress-types";
import { mapAcfFile } from "./mappers";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapBooklet(item: BookletItemAcf, index: number): PdfResourceItemData | null {
  const title = asString(item.booklet_title).trim();
  const pdf = mapAcfFile(item.booklet_pdf);
  if (!title || !pdf.url.trim()) return null;

  return {
    id: slugify(title) || `booklet-${index + 1}`,
    title,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
    date: asString(item.booklet_posted_date).trim(),
  };
}

export function mapBookletsPage(page: WpBookletsPageResponse): BookletsPageData {
  const acf = asRecord(page.acf) as BookletsPageAcf & AcfRecord;

  const booklets = asArray<BookletItemAcf>(acf.booklets)
    .map(mapBooklet)
    .filter((booklet): booklet is PdfResourceItemData => booklet !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.booklets_page_title, "Booklets").trim(),
    subtitle: asString(acf.booklets_page_subtitle).trim(),
    booklets,
  };
}
