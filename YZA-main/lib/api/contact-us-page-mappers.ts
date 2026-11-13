import type { ContactUsPageData } from "./types";
import type { ContactUsPageAcf, WpContactUsPageResponse } from "./wordpress-types";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function mapContactUsPage(page: WpContactUsPageResponse): ContactUsPageData {
  const acf = asRecord(page.acf) as ContactUsPageAcf & AcfRecord;

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.contact_us_page_title, "Contact Us").trim(),
    subtitle: asString(acf.contact_us_page_sub_title).trim(),
  };
}
