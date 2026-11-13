import { cache } from "react";
import { fetchJuniorYzaPageRaw } from "./client";
import { mapJuniorYzaPage } from "./junior-yza-page-mappers";
import type { JuniorYzaPageData } from "./types";

export const getJuniorYzaPage = cache(async (): Promise<JuniorYzaPageData> => {
  const page = await fetchJuniorYzaPageRaw();
  return mapJuniorYzaPage(page);
});
