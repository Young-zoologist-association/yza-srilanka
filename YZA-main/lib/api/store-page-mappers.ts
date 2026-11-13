import type { StorePageData, StoreProductData, StoreProductDetailField } from "./types";
import type { StorePageAcf, StoreProductAcf, WpStorePageResponse } from "./wordpress-types";
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

function slugifyTitle(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `product-${index + 1}`;
}

function parsePrice(value: unknown): { amount: number; label: string } {
  const raw = asString(value).replace(/,/g, "").trim();
  const amount = raw ? Number.parseFloat(raw) : 0;
  const valid = Number.isFinite(amount) && amount > 0 ? amount : 0;

  return {
    amount: valid,
    label: valid > 0 ? `Rs. ${valid.toLocaleString("en-LK")}` : "Price on request",
  };
}

function buildDetailFields(
  title: string,
  description: string,
  priceLabel: string,
): StoreProductDetailField[] {
  const fields: StoreProductDetailField[] = [];

  if (description.trim()) {
    fields.push({
      key: "description",
      label: "Description",
      value: description.trim(),
      prominent: true,
    });
  }

  if (priceLabel.trim()) {
    fields.push({
      key: "price",
      label: "Price",
      value: priceLabel.trim(),
      prominent: true,
    });
  }

  if (title.trim()) {
    fields.push({
      key: "product",
      label: "Product",
      value: title.trim(),
    });
  }

  return fields;
}

function mapStoreProduct(item: StoreProductAcf, index: number): StoreProductData | null {
  const title = asString(item.product_title).trim();
  if (!title) return null;

  const description = asString(item.product_description).trim();
  const { amount, label } = parsePrice(item.product_price);
  const image = mapAcfImage(item.product_image, title);

  return {
    id: slugifyTitle(title, index),
    title,
    description,
    price: amount,
    priceLabel: label,
    image,
    detailFields: buildDetailFields(title, description, label),
  };
}

export function mapStorePage(page: WpStorePageResponse): StorePageData {
  const acf = asRecord(page.acf) as StorePageAcf & AcfRecord;
  const pageTitle = asString(acf.store_title, "Store").trim();

  const products = asArray<StoreProductAcf>(acf.products)
    .map((item, index) => mapStoreProduct(item, index))
    .filter((product): product is StoreProductData => product !== null);

  return {
    id: page.id,
    slug: page.slug,
    pageTitle,
    subtitle: asString(acf.store_subtitle).trim(),
    products,
  };
}
