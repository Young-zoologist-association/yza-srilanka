import { cache } from "react";
import { fetchThithmuwaPageRaw } from "./client";
import {
  mapPublicationArchivePage,
  THITHMUWA_ACF_KEYS,
} from "./publication-archive-mappers";
import type { PublicationArchivePageData } from "./types";

export const getThithmuwaPage = cache(async (): Promise<PublicationArchivePageData> => {
  const page = await fetchThithmuwaPageRaw();
  return mapPublicationArchivePage(page, THITHMUWA_ACF_KEYS, "තිත්මුවා");
});
