import type { NewsAndUpdatesPageData, NewsItemData } from "@/lib/api/types";

export interface NewsAndUpdatesPageContent {
  pageTitle: string;
  subtitle: string;
  news: NewsItemData[];
}

export const NEWS_AND_UPDATES_PAGE_FALLBACK: NewsAndUpdatesPageContent = {
  pageTitle: "News & Updates",
  subtitle: "Our News and Updates",
  news: [
    {
      id: 1,
      title: "Young zoologists on an artistic foray",
      image: { url: "", alt: "Young zoologists on an artistic foray" },
      description:
        "Operating from the National Zoological Gardens in Dehiwala, the Young Zoologists' Association (YZA) is one of Sri Lanka's leading organisations for environmental education. It promotes wildlife art and ethical wildlife photography, providing young enthusiasts an invaluable platform to exhibit their talents through an annual exhibition.",
      author: "Kamal",
    },
    {
      id: 2,
      title: "JUNIOR YZA",
      image: { url: "", alt: "JUNIOR YZA" },
      description:
        'The junior section of YZA publishes a magazine named "Kadiya". This magazine illustrates the talents of the kids going way wild. They publish their articles, arts, crafts and different fun loving puzzles of learning about the animals and plants in Sri Lanka, also giving a glimpse through internationally.',
      author: "Amal",
    },
  ],
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value : fallback;
}

function normalizeNewsItem(item: NewsItemData, index: number): NewsItemData {
  const title = pickText(item.title, "News");
  return {
    id: item.id || index + 1,
    title,
    image: item.image?.url?.trim()
      ? {
          url: item.image.url,
          alt: pickText(item.image.alt, title),
        }
      : { url: "", alt: title },
    description: pickText(item.description, ""),
    author: pickText(item.author, "YZA"),
  };
}

export function resolveNewsAndUpdatesPageContent(
  data: NewsAndUpdatesPageData | null,
): NewsAndUpdatesPageContent {
  if (!data) return NEWS_AND_UPDATES_PAGE_FALLBACK;

  const news = (data.news ?? [])
    .map(normalizeNewsItem)
    .filter((item) => item.title);

  return {
    pageTitle: pickText(data.pageTitle, NEWS_AND_UPDATES_PAGE_FALLBACK.pageTitle),
    subtitle: pickText(data.subtitle, NEWS_AND_UPDATES_PAGE_FALLBACK.subtitle),
    news: news.length > 0 ? news : NEWS_AND_UPDATES_PAGE_FALLBACK.news,
  };
}
