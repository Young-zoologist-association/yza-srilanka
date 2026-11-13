import type { AbstractBooksPageData, PdfResourceItemData } from "./types";
import type {
  AbstractBookItemAcf,
  AbstractBooksPageAcf,
  WpAbstractBooksPageResponse,
} from "./wordpress-types";
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

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapAbstractBook(item: AbstractBookItemAcf, index: number): PdfResourceItemData | null {
  const title = asString(item.abstract_book_title).trim();
  const pdf = mapAcfFile(item.abstract_book_pdf);
  if (!title || !pdf.url.trim()) return null;

  return {
    id: slugify(title) || `abstract-book-${index + 1}`,
    title,
    pdfUrl: pdf.url.trim(),
    filename: pdf.filename,
    filesize: pdf.filesize,
    date: asString(item.abstract_book_post_date).trim(),
  };
}

export function mapAbstractBooksPage(page: WpAbstractBooksPageResponse): AbstractBooksPageData {
  const acf = asRecord(page.acf) as AbstractBooksPageAcf & AcfRecord;

  const books = asArray<AbstractBookItemAcf>(acf.abstract_books)
    .map(mapAbstractBook)
    .filter((book): book is PdfResourceItemData => book !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle: asString(acf.abstract_books_page_title, "Abstract Books").trim(),
    subtitle: asString(acf.abstract_books_page_subtitle).trim(),
    books,
  };
}
