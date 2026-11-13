import { cache } from "react";
import { fetchVideosPageRaw } from "./client";
import { mapVideosPage } from "./videos-page-mappers";
import type { VideosPageData } from "./types";

export const getVideosPage = cache(async (): Promise<VideosPageData> => {
  const page = await fetchVideosPageRaw();
  return mapVideosPage(page);
});
