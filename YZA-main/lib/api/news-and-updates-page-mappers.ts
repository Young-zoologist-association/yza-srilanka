import type { NewsAndUpdatesPageData, NewsItemData } from "./types";
import type {
  NewsAndUpdatesPageAcf,
  NewsItemAcf,
  WpNewsAndUpdatesPageResponse,
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

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mapNewsItem(item: NewsItemAcf, index: number): NewsItemData | null {
  const title = asString(item.news_title).trim();
  if (!title) return null;

  return {
    id: index + 1,
    title,
    image: mapAcfImage(item.news_image, title),
    description: asString(item.news_description).trim(),
    author: asString(item.news_author).trim(),
  };
}

export function mapNewsAndUpdatesPage(
  page: WpNewsAndUpdatesPageResponse,
): NewsAndUpdatesPageData {
  const acf = asRecord(page.acf) as NewsAndUpdatesPageAcf & AcfRecord;
  const news = asArray<NewsItemAcf>(acf.news)
    .map(mapNewsItem)
    .filter((item): item is NewsItemData => item !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.news_and_updates_page_title, "News & Updates"),
    subtitle: asString(acf.news_and_updates_page_subtitle, "Our News and Updates"),
    news,
  };
}
