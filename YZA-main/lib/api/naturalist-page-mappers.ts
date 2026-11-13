import type { NaturalistGuidelinesData, NaturalistPageData } from "./types";
import type { NaturalistPageAcf, WpNaturalistPageResponse } from "./wordpress-types";
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

function mapGuidelines(value: unknown, pageTitle: string): NaturalistGuidelinesData | null {
  const pdf = mapAcfFile(value);
  if (!pdf.url.trim()) return null;

  return {
    title: pdf.filename.replace(/\.pdf$/i, "") || `${pageTitle} — Guidelines`,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
  };
}

export function mapNaturalistPage(page: WpNaturalistPageResponse): NaturalistPageData {
  const acf = asRecord(page.acf) as NaturalistPageAcf & AcfRecord;
  const pageTitle = asString(acf.naturalist_page_title, "Naturalist").trim();

  return {
    id: page.id,
    slug: page.slug,
    pageTitle,
    subtitle: asString(acf.naturalist_page_sub_title).trim(),
    guidelines: mapGuidelines(acf.naturalist_page_guidelines, pageTitle),
  };
}
