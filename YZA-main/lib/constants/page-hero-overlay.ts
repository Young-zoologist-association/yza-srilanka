/**
 * Sub-page hero overlays — home hero keeps its own layers.
 * Full image visibility with themed green/gold washes (home-page style).
 */
export const PAGE_HERO_OVERLAY = {
  image: "opacity-100",
  gradientVertical:
    "bg-gradient-to-b from-black/50 via-[#1a2e1f]/38 to-[#1a2e1f]/68",
  gradientAccent:
    "bg-gradient-to-r from-[#3F7A4E]/40 via-[#2a4a35]/12 to-transparent",
  gradientAccentWarm:
    "bg-gradient-to-br from-[#3F7A4E]/36 via-transparent to-[#F2A93B]/14",
} as const;

export const ABOUT_HERO_OVERLAY = {
  gradientVertical:
    "bg-gradient-to-b from-black/55 via-[#1a2e1f]/48 to-[#1a2e1f]/85",
  gradientLeft:
    "bg-gradient-to-r from-black/80 via-black/45 to-transparent",
  gradientBottom:
    "bg-gradient-to-t from-[#1a2e1f]/95 via-black/60 to-transparent",
  gradientAccent:
    "bg-gradient-to-br from-[#3F7A4E]/34 via-transparent to-[#F2A93B]/12",
} as const;
