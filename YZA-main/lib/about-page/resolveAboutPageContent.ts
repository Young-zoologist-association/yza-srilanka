import type {
  AboutEducationData,
  AboutFounderData,
  AboutOverviewData,
  AboutPageData,
  AboutVisionData,
} from "@/lib/api/types";

export interface AboutPageContent {
  overview: AboutOverviewData;
  founder: AboutFounderData;
  education: AboutEducationData;
  vision: AboutVisionData;
}

export const ABOUT_PAGE_FALLBACK: AboutPageContent = {
  overview: {
    image: {
      url: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=1920&h=1080&fit=crop&auto=format",
      alt: "YZA Sri Lanka overview",
    },
    eyebrow: "OVERVIEW",
    title: "YZA SRI LANKA",
    content:
      "The Young Zoologists' Association of Sri Lanka (YZA) is a non-governmental, non-profit, voluntary youth organization based at the National Zoological Gardens at Dehiwala, Sri Lanka. The core value of the organization is to protect and conserve the environment by making a conscious effort in educating the community in Sri Lanka.",
  },
  founder: {
    image: {
      url: "https://images.unsplash.com/photo-1679348181038-e68f4ca9f3f4?w=200&h=260&fit=crop&auto=format",
      alt: "Mr. Lyn De Alwis",
    },
    title: "Founder of YZA Sri Lanka",
    name: "Mr. Lyn De Alwis",
    paragraphs: [
      "The world renowned academic and nature lover, founded the Young Zoologists Association of Sri Lanka in 1972. He was the Director of National Zoological Gardens at that time.",
      "In order to fulfill a large void of enthusiastic youth, armed with extensive knowledge on principles and applications of environment sciences to act as conservationists, the organization was formed.",
      "Since the establishment of YZA, the organization has become the first institution for many leading Environmentalists and Naturalists of the country.",
    ],
  },
  education: {
    image: {
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=800&fit=crop&auto=format",
      alt: "YZA educational programs",
    },
    title: "EDUCATIONAL FORETASTE",
    content:
      "YZA conducts educational programs every Sunday. Every member participates one of the main groups of study; Aquatic Life, Birds, Butterfly, Flora, Mammals, and Reptiles. Structured courses are conducted for the membership and examinations held annually to ascertain effectiveness.",
  },
  vision: {
    title: "Our Vision",
    statement: "Conservation Through Education.",
  },
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function pickImage(
  image: { url: string; alt: string } | undefined,
  fallback: { url: string; alt: string },
): { url: string; alt: string } {
  if (!image?.url?.trim()) return fallback;
  return {
    url: image.url,
    alt: pickText(image.alt, fallback.alt),
  };
}

function pickParagraphs(
  paragraphs: string[] | undefined,
  fallback: string[],
): string[] {
  const filtered = (paragraphs ?? []).filter((p) => p.trim());
  return filtered.length > 0 ? filtered : fallback;
}

/** Ensures each block starts with a capital letter (fixes CMS copy like "the world…"). */
function capitalizeParagraphStart(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const firstLetterIndex = trimmed.search(/\p{L}/u);
  if (firstLetterIndex === -1) return trimmed;

  return (
    trimmed.slice(0, firstLetterIndex) +
    trimmed.charAt(firstLetterIndex).toUpperCase() +
    trimmed.slice(firstLetterIndex + 1)
  );
}

function pickOverview(
  data: AboutOverviewData | undefined,
): AboutOverviewData {
  const fb = ABOUT_PAGE_FALLBACK.overview;
  if (!data) return fb;
  return {
    image: pickImage(data.image, fb.image),
    eyebrow: pickText(data.eyebrow, fb.eyebrow),
    title: pickText(data.title, fb.title),
    content: pickText(data.content, fb.content),
  };
}

function pickFounder(data: AboutFounderData | undefined): AboutFounderData {
  const fb = ABOUT_PAGE_FALLBACK.founder;
  if (!data) return fb;
  return {
    image: pickImage(data.image, fb.image),
    title: pickText(data.title, fb.title),
    name: pickText(data.name, fb.name),
    paragraphs: pickParagraphs(data.paragraphs, fb.paragraphs).map(capitalizeParagraphStart),
  };
}

function pickEducation(
  data: AboutEducationData | undefined,
): AboutEducationData {
  const fb = ABOUT_PAGE_FALLBACK.education;
  if (!data) return fb;
  return {
    image: pickImage(data.image, fb.image),
    title: pickText(data.title, fb.title),
    content: pickText(data.content, fb.content),
  };
}

function pickVision(data: AboutVisionData | undefined): AboutVisionData {
  const fb = ABOUT_PAGE_FALLBACK.vision;
  if (!data) return fb;
  return {
    title: pickText(data.title, fb.title),
    statement: pickText(data.statement, fb.statement),
  };
}

export function resolveAboutPageContent(
  cms?: AboutPageData | null,
): AboutPageContent {
  if (!cms) return ABOUT_PAGE_FALLBACK;

  return {
    overview: pickOverview(cms.overview),
    founder: pickFounder(cms.founder),
    education: pickEducation(cms.education),
    vision: pickVision(cms.vision),
  };
}
