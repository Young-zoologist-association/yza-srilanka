import { Suspense } from "react";
import { getStorePage, isWordPressConfigured } from "@/lib/api";
import { resolveStorePageContent } from "@/lib/store-page/resolveStorePageContent";
import { StorePage } from "@/components/store-page/StorePage";
import { StorePageLoading } from "@/components/store-page/StorePageLoading";

async function StorePageFetcher() {
  const fallback = resolveStorePageContent(null);

  if (!isWordPressConfigured()) {
    return <StorePage content={fallback} />;
  }

  try {
    const page = await getStorePage();
    const content = resolveStorePageContent(page);
    return <StorePage content={content} />;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("WordPress store page fetch failed, using fallback content.", error);
    }
    return <StorePage content={fallback} />;
  }
}

export function StorePageContainer() {
  return (
    <Suspense fallback={<StorePageLoading />}>
      <StorePageFetcher />
    </Suspense>
  );
}
