import type { WildlifeArtItemData, WildlifeArtPageData } from "@/lib/api/types";

export interface WildlifeArtPageContent {
  pageTitle: string;
  arts: WildlifeArtItemData[];
}

export const WILDLIFE_ART_PAGE_FALLBACK: WildlifeArtPageContent = {
  pageTitle: "Wildlife Art Gallery",
  arts: [
    {
      id: 1,
      title: "Duck Family",
      artistName: "John D",
      image: {
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop&auto=format",
        alt: "Duck Family",
      },
    },
    {
      id: 2,
      title: "Birds",
      artistName: "S.D.Bhanu",
      image: {
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format",
        alt: "Birds",
      },
    },
    {
      id: 3,
      title: "Birds Fam",
      artistName: "S Janaki",
      image: {
        url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=900&fit=crop&auto=format",
        alt: "Birds Fam",
      },
    },
    {
      id: 4,
      title: "Lioness",
      artistName: "D D Shanaka",
      image: {
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&h=600&fit=crop&auto=format",
        alt: "Lioness",
      },
    },
    {
      id: 5,
      title: "Lion Stare",
      artistName: "Lakshman Shanaka",
      image: {
        url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=700&fit=crop&auto=format",
        alt: "Lion Stare",
      },
    },
    {
      id: 6,
      title: "Bird Flying",
      artistName: "Sanka Wickramasingha",
      image: {
        url: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=650&fit=crop&auto=format",
        alt: "Bird Flying",
      },
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function normalizeArt(art: WildlifeArtItemData): WildlifeArtItemData {
  return {
    id: art.id,
    title: pickText(art.title, "Untitled"),
    artistName: pickText(art.artistName, "Unknown Artist"),
    image: art.image?.url?.trim()
      ? {
          url: art.image.url,
          alt: pickText(art.image.alt, art.title),
        }
      : { url: "", alt: art.title },
  };
}

export function resolveWildlifeArtPageContent(
  data: WildlifeArtPageData | null,
): WildlifeArtPageContent {
  if (!data?.arts?.length) return WILDLIFE_ART_PAGE_FALLBACK;

  const arts = data.arts.map(normalizeArt).filter((art) => art.title || art.image.url);

  if (!arts.length) return WILDLIFE_ART_PAGE_FALLBACK;

  return {
    pageTitle: pickText(data.pageTitle, WILDLIFE_ART_PAGE_FALLBACK.pageTitle),
    arts,
  };
}
