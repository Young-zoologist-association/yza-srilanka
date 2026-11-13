import { cache } from "react";
import { fetchPanivudayaPageRaw } from "./client";
import {
  mapPublicationArchivePage,
  PANIVUDAYA_ACF_KEYS,
} from "./publication-archive-mappers";
import type { PublicationArchivePageData } from "./types";

export const getPanivudayaPage = cache(async (): Promise<PublicationArchivePageData> => {
  const page = await fetchPanivudayaPageRaw();
  return mapPublicationArchivePage(page, PANIVUDAYA_ACF_KEYS, "පණිවුඩය");
});
