import type { PdfResourceItemData, PublicationArchivePageData } from "./types";
import { mapAcfFile } from "./mappers";

type AcfRecord = Record<string, unknown>;

export interface PublicationPageAcfKeys {
  pageTitle: string;
  pageSubtitle: string;
  items: string;
  itemTitle: string;
  itemPdf: string;
  itemDate: string;
}

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asArray(value: unknown): AcfRecord[] {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") as AcfRecord[] : [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0D80-\u0DFF]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapPublicationItem(
  item: AcfRecord,
  keys: PublicationPageAcfKeys,
  index: number,
): PdfResourceItemData | null {
  const title = asString(item[keys.itemTitle]).trim();
  const pdf = mapAcfFile(item[keys.itemPdf]);
  if (!title || !pdf.url.trim()) return null;

  return {
    id: slugify(title) || `publication-${index + 1}`,
    title,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
    date: asString(item[keys.itemDate]).trim(),
  };
}

export function mapPublicationArchivePage(
  page: { id: number; slug: string; acf?: unknown },
  keys: PublicationPageAcfKeys,
  defaultTitle: string,
): PublicationArchivePageData {
  const acf = asRecord(page.acf);

  const items = asArray(acf[keys.items])
    .map((item, index) => mapPublicationItem(item, keys, index))
    .filter((item): item is PdfResourceItemData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf[keys.pageTitle], defaultTitle).trim(),
    subtitle: asString(acf[keys.pageSubtitle]).trim(),
    items,
  };
}

export const THITHMUWA_ACF_KEYS: PublicationPageAcfKeys = {
  pageTitle: "තිත්මුවා_page_title",
  pageSubtitle: "තිත්මුවා_page_subtitle",
  items: "තිත්මුවා_books",
  itemTitle: "තිත්මුවා_title",
  itemPdf: "තිත්මුවා_pdf",
  itemDate: "තිත්මුවා_posted_date",
};

export const PANIVUDAYA_ACF_KEYS: PublicationPageAcfKeys = {
  pageTitle: "පණිවුඩය_page_title",
  pageSubtitle: "පණිවුඩය_page_subtitle",
  items: "පණිවුඩය",
  itemTitle: "පණිවුඩය_title",
  itemPdf: "පණිවුඩය_pdf",
  itemDate: "පණිවුඩය_posted_date",
};

export const SANRAKSHANA_ACF_KEYS: PublicationPageAcfKeys = {
  pageTitle: "සංරක්ෂණ_page_title",
  pageSubtitle: "සංරක්ෂණ_page_subtitle",
  items: "සංරක්ෂණ",
  itemTitle: "සංරක්ෂණ_title",
  itemPdf: "සංරක්ෂණ_pdf",
  itemDate: "සංරක්ෂණ_posted_date",
};
