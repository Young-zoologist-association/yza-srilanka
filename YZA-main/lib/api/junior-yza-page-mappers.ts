import type { JuniorYzaPageData, JuniorYzaPageImageData } from "./types";
import type {
  JuniorYzaPageAcf,
  JuniorYzaPageImageAcf,
  WpJuniorYzaPageResponse,
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

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.trim());
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mapImageItem(item: JuniorYzaPageImageAcf, index: number): JuniorYzaPageImageData | null {
  const imageRecord = asRecord(item.junior_yza_page_image);
  const url = asString(imageRecord.url).trim();
  if (!url) return null;

  const id = asNumber(imageRecord.id, index + 1);
  const alt = asString(imageRecord.alt, asString(imageRecord.title, "Junior YZA"));

  return {
    id,
    image: mapAcfImage(item.junior_yza_page_image, alt),
  };
}

export function mapJuniorYzaPage(page: WpJuniorYzaPageResponse): JuniorYzaPageData {
  const acf = asRecord(page.acf) as JuniorYzaPageAcf & AcfRecord;
  const images = asArray<JuniorYzaPageImageAcf>(acf.junior_yza_page_images)
    .map(mapImageItem)
    .filter((item): item is JuniorYzaPageImageData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.junior_yza_page_title, "Junior YZA").trim(),
    subtitle: asString(acf.junior_yza_page_subtitle, "Future in the Making").trim(),
    description: asString(acf.junior_yza_page_description),
    images,
  };
}
