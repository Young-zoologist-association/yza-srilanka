import { cache } from "react";
import { fetchSanrakshanaPageRaw } from "./client";
import {
  mapPublicationArchivePage,
  SANRAKSHANA_ACF_KEYS,
} from "./publication-archive-mappers";
import type { PublicationArchivePageData } from "./types";

export const getSanrakshanaPage = cache(async (): Promise<PublicationArchivePageData> => {
  const page = await fetchSanrakshanaPageRaw();
  return mapPublicationArchivePage(page, SANRAKSHANA_ACF_KEYS, "සංරක්ෂණ");
});
