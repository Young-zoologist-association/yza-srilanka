import { cache } from "react";
import { fetchArticlesPageRaw } from "./client";
import { mapArticlesPage } from "./articles-page-mappers";
import type { ArticlesPageData } from "./types";

export const getArticlesPage = cache(async (): Promise<ArticlesPageData> => {
  const page = await fetchArticlesPageRaw();
  return mapArticlesPage(page);
});
