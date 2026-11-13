import type {
  AboutEducationData,
  AboutFounderData,
  AboutOverviewData,
  AboutPageData,
  AboutVisionData,
  WpImage,
} from "./types";
import type {
  AboutEducationSectionAcf,
  AboutFounderSectionAcf,
  AboutOverviewSectionAcf,
  AboutPageAcf,
  AboutVisionSectionAcf,
  WpAboutPageResponse,
} from "./wordpress-types";
import { mapAcfImage } from "./mappers";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function mapOverview(section: AboutOverviewSectionAcf): AboutOverviewData {
  return {
    image: mapAcfImage(section.overview_section_image, "YZA Sri Lanka overview"),
    eyebrow: asString(section.overview_section_eyebrow_text),
    title: asString(section.overview_section_title),
    content: asString(section.overview_section_content),
  };
}

function mapFounder(section: AboutFounderSectionAcf): AboutFounderData {
  const name = asString(section.founder_name);
  return {
    image: mapAcfImage(section.founder_section_image, name),
    title: asString(section.founder_section_title),
    name,
    paragraphs: splitParagraphs(asString(section.founder_section_description)),
  };
}

function mapEducation(section: AboutEducationSectionAcf): AboutEducationData {
  return {
    image: mapAcfImage(section.education_section_image, "YZA educational programs"),
    title: asString(section.education_section_title),
    content: asString(section.education_section_content),
  };
}

function mapVision(section: AboutVisionSectionAcf): AboutVisionData {
  return {
    title: asString(section.about_section_vision_title),
    statement: asString(section.about_section_vision_statement),
  };
}

export function mapAboutPage(page: WpAboutPageResponse): AboutPageData {
  const acf = asRecord(page.acf) as AboutPageAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    overview: mapOverview(
      asRecord(acf.about_section_overview) as unknown as AboutOverviewSectionAcf,
    ),
    founder: mapFounder(
      asRecord(acf.about_section_founder) as unknown as AboutFounderSectionAcf,
    ),
    education: mapEducation(
      asRecord(acf.about_section_education) as unknown as AboutEducationSectionAcf,
    ),
    vision: mapVision(
      asRecord(acf.about_section_vision) as unknown as AboutVisionSectionAcf,
    ),
  };
}

export function emptyWpImage(): WpImage {
  return { url: "", alt: "" };
}
