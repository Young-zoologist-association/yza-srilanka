import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import {
  createPublicationPageResolver,
  type PublicationPageContent,
} from "@/lib/publication-archive/createPublicationPageResolver";

export const THITHMUWA_PAGE_FALLBACK: PublicationPageContent = {
  pageTitle: "තිත්මුවා",
  subtitle: "තිත්මුවා",
  heroImageUrl: PAGE_HERO_IMAGES.thithmuwa,
  items: [],
};

export const resolveThithmuwaPageContent = createPublicationPageResolver(THITHMUWA_PAGE_FALLBACK);

export type ThithmuwaPageContent = PublicationPageContent;
