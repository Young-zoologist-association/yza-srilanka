import type { StorePageData, StoreProductData } from "@/lib/api/types";
import { resolveStorePageContent } from "@/lib/store-page/resolveStorePageContent";

export interface HomeStoreContent {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  products: StoreProductData[];
}

export const HOME_STORE_FALLBACK: HomeStoreContent = {
  eyebrow: "Support YZA",
  titlePlain: "Wildlife",
  titleHighlight: "Store",
  products: resolveStorePageContent(null).products,
};

export function resolveHomeStoreContent(storePage: StorePageData | null): HomeStoreContent {
  const store = resolveStorePageContent(storePage);

  return {
    eyebrow: HOME_STORE_FALLBACK.eyebrow,
    titlePlain: HOME_STORE_FALLBACK.titlePlain,
    titleHighlight: HOME_STORE_FALLBACK.titleHighlight,
    products: store.products,
  };
}
