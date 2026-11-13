import type { BranchData, BranchesPageData } from "@/lib/api/types";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";

export interface BranchCard extends BranchData {
  accentColor: string;
  gradient: string;
}

export interface BranchesPageContent {
  pageTitle: string;
  heroImageUrl: string;
  branches: BranchCard[];
}

const BRANCH_VISUALS = [
  {
    accentColor: "#F2A93B",
    gradient: "from-[#3F7A4E] via-[#2D5A3D] to-[#1a2e1f]",
  },
  {
    accentColor: "#3F7A4E",
    gradient: "from-[#40916C] via-[#2D6A4F] to-[#1a2e1f]",
  },
  {
    accentColor: "#5C7A63",
    gradient: "from-[#5C7A63] via-[#3F7A4E] to-[#2D5A3D]",
  },
] as const;

const EMPTY_BRANCH_IMAGE = { url: "", alt: "" };

const FALLBACK_BRANCHES: BranchCard[] = [
  {
    id: "dehiwala",
    slug: "dehiwala",
    name: "Dehiwala",
    description:
      "The Dehiwala Main Branch serves as the central hub of the Young Zoologists' Association of Sri Lanka and operates in close connection with the National Zoological Gardens, Dehiwala.",
    isMain: true,
    image: EMPTY_BRANCH_IMAGE,
    accentColor: BRANCH_VISUALS[0].accentColor,
    gradient: BRANCH_VISUALS[0].gradient,
  },
  {
    id: "pinnawala",
    slug: "pinnawala",
    name: "Pinnawala",
    description:
      "The Pinnawala Branch extends the vision of the Young Zoologists' Association beyond Dehiwala by engaging members in wildlife education and conservation-related activities in the Pinnawala region.",
    isMain: false,
    image: EMPTY_BRANCH_IMAGE,
    accentColor: BRANCH_VISUALS[1].accentColor,
    gradient: BRANCH_VISUALS[1].gradient,
  },
  {
    id: "ridiyagama",
    slug: "ridiyagama",
    name: "Ridiyagama",
    description:
      "The Ridiyagama Branch represents YZA's commitment to expanding environmental education and conservation awareness to different parts of Sri Lanka.",
    isMain: false,
    image: EMPTY_BRANCH_IMAGE,
    accentColor: BRANCH_VISUALS[2].accentColor,
    gradient: BRANCH_VISUALS[2].gradient,
  },
];

export const BRANCHES_PAGE_FALLBACK: BranchesPageContent = {
  pageTitle: "Our Branches",
  heroImageUrl: PAGE_HERO_IMAGES.committees,
  branches: FALLBACK_BRANCHES,
};

function hasText(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

function pickText(value: string | undefined, fallback: string): string {
  return hasText(value) ? value.trim() : fallback;
}

function decorateBranch(branch: BranchData, index: number): BranchCard {
  const visual = BRANCH_VISUALS[index % BRANCH_VISUALS.length];
  return {
    ...branch,
    accentColor: branch.isMain ? BRANCH_VISUALS[0].accentColor : visual.accentColor,
    gradient: branch.isMain ? BRANCH_VISUALS[0].gradient : visual.gradient,
  };
}

function pickBranches(branches: BranchData[], fallback: BranchCard[]): BranchCard[] {
  if (!branches.length) return fallback;
  return branches.map(decorateBranch);
}

export function resolveBranchesPageContent(data: BranchesPageData | null): BranchesPageContent {
  if (!data) return BRANCHES_PAGE_FALLBACK;

  const heroFromWp = data.heroImage?.url?.trim();

  return {
    pageTitle: pickText(data.pageTitle, BRANCHES_PAGE_FALLBACK.pageTitle),
    heroImageUrl: heroFromWp || BRANCHES_PAGE_FALLBACK.heroImageUrl,
    branches: pickBranches(data.branches, BRANCHES_PAGE_FALLBACK.branches),
  };
}
