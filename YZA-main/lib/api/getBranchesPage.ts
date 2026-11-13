import { cache } from "react";
import { fetchBranchesPageRaw } from "./client";
import { mapBranchesPage } from "./branches-page-mappers";
import type { BranchesPageData } from "./types";

export const getBranchesPage = cache(async (): Promise<BranchesPageData> => {
  const page = await fetchBranchesPageRaw();
  return mapBranchesPage(page);
});
