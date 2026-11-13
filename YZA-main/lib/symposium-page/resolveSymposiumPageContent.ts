import type { SymposiumGuidelinesData, SymposiumPageData } from "@/lib/api/types";

export interface SymposiumPageContent {
  pageTitle: string;
  subtitle: string;
  descriptionParagraphs: string[];
  submissionGuidelines: SymposiumGuidelinesData | null;
}

const FALLBACK_DESCRIPTION =
  "Citizen Scientists' Symposium is one of the most distinctive events organized by the Young Zoologists' Association (YZA), providing a formal academic platform for members, young researchers, and affiliated scientists to present the findings of their studies and field-based research. The symposium encourages knowledge sharing, scientific discussions, and collaboration while highlighting the valuable contributions of citizen science towards biodiversity conservation and environmental research in Sri Lanka.\r\nThe Citizen Scientists' Symposium is conducted with the support of numerous private sector sponsors and partners who contribute towards the success of this initiative. Through these collaborations, YZA continues to create opportunities for young researchers and conservation enthusiasts to engage in scientific communication and contribute to the future of biodiversity conservation.";

export const SYMPOSIUM_PAGE_FALLBACK: SymposiumPageContent = {
  pageTitle: "Citizen Scientists' Symposium",
  subtitle:
    "An annual gathering that brings together students, researchers, and conservation enthusiasts to share scientific knowledge, showcase research, and promote the conservation of Sri Lanka's unique biodiversity.",
  descriptionParagraphs: splitDescriptionParagraphs(FALLBACK_DESCRIPTION),
  submissionGuidelines: null,
};

function splitDescriptionParagraphs(description: string): string[] {
  const normalized = description.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const blocks = normalized
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (blocks.length > 1) return blocks;

  return normalized
    .split(/\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeGuidelines(
  guidelines: SymposiumGuidelinesData | null,
): SymposiumGuidelinesData | null {
  if (!guidelines?.pdfUrl?.trim()) return null;

  return {
    title: pickText(guidelines.title, "Submission Guidelines"),
    pdfUrl: guidelines.pdfUrl.trim(),
    filename: pickText(guidelines.filename, "submission-guidelines.pdf"),
    filesize: guidelines.filesize,
  };
}

export function resolveSymposiumPageContent(
  data: SymposiumPageData | null,
): SymposiumPageContent {
  if (!data) return SYMPOSIUM_PAGE_FALLBACK;

  const descriptionParagraphs = splitDescriptionParagraphs(
    pickText(data.description, FALLBACK_DESCRIPTION),
  );

  return {
    pageTitle: pickText(data.pageTitle, SYMPOSIUM_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, SYMPOSIUM_PAGE_FALLBACK.subtitle),
    descriptionParagraphs:
      descriptionParagraphs.length > 0
        ? descriptionParagraphs
        : SYMPOSIUM_PAGE_FALLBACK.descriptionParagraphs,
    submissionGuidelines: normalizeGuidelines(data.submissionGuidelines),
  };
}
