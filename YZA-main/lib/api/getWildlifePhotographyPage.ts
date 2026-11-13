import { cache } from "react";
import { fetchWildlifePhotographyPageRaw } from "./client";
import { mapWildlifePhotographyPage } from "./wildlife-photography-page-mappers";
import type { WildlifePhotographyPageData } from "./types";

export const getWildlifePhotographyPage = cache(
  async (): Promise<WildlifePhotographyPageData> => {
    const page = await fetchWildlifePhotographyPageRaw();
    return mapWildlifePhotographyPage(page);
  },
);
