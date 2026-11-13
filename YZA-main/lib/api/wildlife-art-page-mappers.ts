import type { WildlifeArtItemData, WildlifeArtPageData } from "./types";
import type {
  WildlifeArtItemAcf,
  WildlifeArtPageAcf,
  WpWildlifeArtPageResponse,
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

function mapWildlifeArtItem(
  item: WildlifeArtItemAcf,
  index: number,
): WildlifeArtItemData | null {
  const title = asString(item.wildlife_art_title).trim();
  const artistName = asString(item.wildlife_art_artist_name).trim();
  const imageRecord = asRecord(item.wildlife_art_image);
  const imageUrl = asString(imageRecord.url).trim();

  if (!title && !artistName && !imageUrl) return null;

  const id = asNumber(imageRecord.id, index + 1);

  return {
    id,
    title: title || "Untitled",
    artistName: artistName || "Unknown Artist",
    image: mapAcfImage(item.wildlife_art_image, title),
  };
}

export function mapWildlifeArtPage(page: WpWildlifeArtPageResponse): WildlifeArtPageData {
  const acf = asRecord(page.acf) as WildlifeArtPageAcf & AcfRecord;
  const arts = asArray<WildlifeArtItemAcf>(acf.wildlife_arts)
    .map(mapWildlifeArtItem)
    .filter((item): item is WildlifeArtItemData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.wildlife_art_page_title, "Wildlife Art Gallery"),
    arts,
  };
}
