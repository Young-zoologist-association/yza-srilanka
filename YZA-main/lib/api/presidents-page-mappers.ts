import type { PresidentData, PresidentsPageData } from "./types";
import type {
  PresidentItemAcf,
  PresidentsPageAcf,
  WpPresidentsPageResponse,
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

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mapPresident(item: PresidentItemAcf): PresidentData | null {
  const name = asString(item.president_name).trim();
  const year = asString(item.president_year).trim();

  if (!name && !year) return null;

  return {
    name: name || "President",
    year,
    image: mapAcfImage(item.president_image, name),
    isCurrent: asBoolean(item.is_current_president),
  };
}

export function mapPresidentsPage(page: WpPresidentsPageResponse): PresidentsPageData {
  const acf = asRecord(page.acf) as PresidentsPageAcf & AcfRecord;
  const presidents = asArray<PresidentItemAcf>(acf.presidents)
    .map(mapPresident)
    .filter((item): item is PresidentData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.presidents_page_title, "Our Presidents"),
    presidents,
  };
}
