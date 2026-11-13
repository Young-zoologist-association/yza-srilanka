import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import {
  createPublicationPageResolver,
  type PublicationPageContent,
} from "@/lib/publication-archive/createPublicationPageResolver";

export const SANRAKSHANA_PAGE_FALLBACK: PublicationPageContent = {
  pageTitle: "සංරක්ෂණ",
  subtitle: "සංරක්ෂණ",
  heroImageUrl: PAGE_HERO_IMAGES.sanrakshana,
  items: [],
};

export const resolveSanrakshanaPageContent = createPublicationPageResolver(SANRAKSHANA_PAGE_FALLBACK);

export type SanrakshanaPageContent = PublicationPageContent;
