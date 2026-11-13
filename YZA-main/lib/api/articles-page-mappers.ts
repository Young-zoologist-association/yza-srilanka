import type { ArticlesPageData, PdfResourceItemData } from "./types";
import type {
  ArticleItemAcf,
  ArticlesPageAcf,
  WpArticlesPageResponse,
} from "./wordpress-types";
import { mapAcfFile, mapAcfImage } from "./mappers";

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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapArticle(item: ArticleItemAcf, index: number): PdfResourceItemData | null {
  const title = asString(item.article_title).trim();
  const pdf = mapAcfFile(item.article_pdf);
  if (!title || !pdf.url.trim()) return null;

  return {
    id: slugify(title) || `article-${index + 1}`,
    title,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
    date: asString(item.article_published_date).trim(),
  };
}

export function mapArticlesPage(page: WpArticlesPageResponse): ArticlesPageData {
  const acf = asRecord(page.acf) as ArticlesPageAcf & AcfRecord;

  const articles = asArray<ArticleItemAcf>(acf.articles)
    .map(mapArticle)
    .filter((article): article is PdfResourceItemData => article !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.articles_page_title, "Articles").trim(),
    subtitle: asString(acf.articles_page_subtitle).trim(),
    heroImage: mapAcfImage(acf.articles_page_hero_background_image, "Articles"),
    articles,
  };
}
