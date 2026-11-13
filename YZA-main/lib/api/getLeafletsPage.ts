import { cache } from "react";
import { fetchLeafletsPageRaw } from "./client";
import { mapLeafletsPage } from "./leaflets-page-mappers";
import type { LeafletsPageData } from "./types";

export const getLeafletsPage = cache(async (): Promise<LeafletsPageData> => {
  const page = await fetchLeafletsPageRaw();
  return mapLeafletsPage(page);
});
