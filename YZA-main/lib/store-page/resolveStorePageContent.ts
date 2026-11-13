import type { StorePageData, StoreProductData } from "@/lib/api/types";

export interface StorePageContent {
  pageTitle: string;
  subtitle: string;
  products: StoreProductData[];
}

const FALLBACK_PRODUCTS: StoreProductData[] = [
  {
    id: "poster",
    title: "Poster",
    description: "Beautiful poster of wild animal in yala national park",
    price: 2500,
    priceLabel: "Rs. 2,500",
    image: { url: "", alt: "Poster" },
    detailFields: [
      {
        key: "description",
        label: "Description",
        value: "Beautiful poster of wild animal in yala national park",
        prominent: true,
      },
      { key: "price", label: "Price", value: "Rs. 2,500", prominent: true },
      { key: "product", label: "Product", value: "Poster" },
    ],
  },
  {
    id: "wild-life-mug",
    title: "Wild Life Mug",
    description: "A mug printed with sri lankan elephant",
    price: 2997,
    priceLabel: "Rs. 2,997",
    image: { url: "", alt: "Wild Life Mug" },
    detailFields: [
      {
        key: "description",
        label: "Description",
        value: "A mug printed with sri lankan elephant",
        prominent: true,
      },
      { key: "price", label: "Price", value: "Rs. 2,997", prominent: true },
      { key: "product", label: "Product", value: "Wild Life Mug" },
    ],
  },
  {
    id: "mug",
    title: "Mug",
    description: "Mug with wildlife theme",
    price: 3246,
    priceLabel: "Rs. 3,246",
    image: { url: "", alt: "Mug" },
    detailFields: [
      {
        key: "description",
        label: "Description",
        value: "Mug with wildlife theme",
        prominent: true,
      },
      { key: "price", label: "Price", value: "Rs. 3,246", prominent: true },
      { key: "product", label: "Product", value: "Mug" },
    ],
  },
  {
    id: "elephant-statues",
    title: "Elephant Statues",
    description: "Elephants made with natural things",
    price: 2550,
    priceLabel: "Rs. 2,550",
    image: { url: "", alt: "Elephant Statues" },
    detailFields: [
      {
        key: "description",
        label: "Description",
        value: "Elephants made with natural things",
        prominent: true,
      },
      { key: "price", label: "Price", value: "Rs. 2,550", prominent: true },
      { key: "product", label: "Product", value: "Elephant Statues" },
    ],
  },
];

export const STORE_PAGE_FALLBACK: StorePageContent = {
  pageTitle: "Store",
  subtitle: "Buy Items You want",
  products: FALLBACK_PRODUCTS,
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeProducts(products: StoreProductData[]): StoreProductData[] {
  return products.filter((product) => product.title.trim());
}

export function resolveStorePageContent(data: StorePageData | null): StorePageContent {
  if (!data) return STORE_PAGE_FALLBACK;

  const products = normalizeProducts(data.products);

  return {
    pageTitle: pickText(data.pageTitle, STORE_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, STORE_PAGE_FALLBACK.subtitle),
    products: products.length > 0 ? products : STORE_PAGE_FALLBACK.products,
  };
}
