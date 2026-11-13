import type { LeafletsPageData, PdfResourceItemData } from "./types";
import type {
  LeafletItemAcf,
  LeafletsPageAcf,
  WpLeafletsPageResponse,
} from "./wordpress-types";
import { mapAcfFile, mapAcfImage } from "./mappers";

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

function mapLeaflet(item: LeafletItemAcf, index: number): PdfResourceItemData | null {
  const title = asString(item.leaflet_title).trim();
  const pdf = mapAcfFile(item.leaflet_pdf);
  if (!title || !pdf.url.trim()) return null;

  return {
    id: slugify(title) || `leaflet-${index + 1}`,
    title,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
    date: asString(item.leaflet_posted_date).trim(),
  };
}

export function mapLeafletsPage(page: WpLeafletsPageResponse): LeafletsPageData {
  const acf = asRecord(page.acf) as LeafletsPageAcf & AcfRecord;

  const leaflets = asArray<LeafletItemAcf>(acf.leaflets)
    .map(mapLeaflet)
    .filter((leaflet): leaflet is PdfResourceItemData => leaflet !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.leaflets_page_title, "Leaflets").trim(),
    subtitle: asString(acf.leaflets_page_subtitle).trim(),
    heroImage: mapAcfImage(acf.leaflets_page_hero_background_image, "Leaflets"),
    leaflets,
  };
}
