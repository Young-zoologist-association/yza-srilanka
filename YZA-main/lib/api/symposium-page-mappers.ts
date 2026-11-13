import type { SymposiumGuidelinesData, SymposiumPageData } from "./types";
import type { SymposiumPageAcf, WpSymposiumPageResponse } from "./wordpress-types";
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

function mapSubmissionGuidelines(
  value: unknown,
  pageTitle: string,
): SymposiumGuidelinesData | null {
  const pdf = mapAcfFile(value);
  if (!pdf.url.trim()) return null;

  return {
    title: pdf.filename.replace(/\.pdf$/i, "") || `${pageTitle} — Submission Guidelines`,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
  };
}

export function mapSymposiumPage(page: WpSymposiumPageResponse): SymposiumPageData {
  const acf = asRecord(page.acf) as SymposiumPageAcf & AcfRecord;
  const pageTitle = asString(acf.symposium_page_title, "Symposium on Wildlife & Biodiversity").trim();

  return {
    id: page.id,
    slug: page.slug,
    pageTitle,
    subtitle: asString(acf.symposium_page_subtitle).trim(),
    description: asString(acf.symposium_description).trim(),
    submissionGuidelines: mapSubmissionGuidelines(
      acf.symposium_page_submission_guidelines,
      pageTitle,
    ),
  };
}
