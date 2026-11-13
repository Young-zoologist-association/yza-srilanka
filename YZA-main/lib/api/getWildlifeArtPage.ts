import { cache } from "react";
import { fetchWildlifeArtPageRaw } from "./client";
import { mapWildlifeArtPage } from "./wildlife-art-page-mappers";
import type { WildlifeArtPageData } from "./types";

export const getWildlifeArtPage = cache(async (): Promise<WildlifeArtPageData> => {
  const page = await fetchWildlifeArtPageRaw();
  return mapWildlifeArtPage(page);
});
