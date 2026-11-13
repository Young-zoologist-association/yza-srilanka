import { YZA_LOGO, YZA_LOGO_ALT } from "@/lib/constants/site-assets";

interface YzaLogoProps {
  className?: string;
  variant?: "navbar" | "footer" | "default";
  /** Smaller logo for compact / scrolled navbar */
  compact?: boolean;
}

function getVariantClasses(variant: NonNullable<YzaLogoProps["variant"]>, compact: boolean): string {
  if (variant === "navbar") {
    return compact ? "h-11 w-auto" : "h-[64px] sm:h-[70px] md:h-[80px] w-auto";
  }
  if (variant === "footer") {
    return "h-28 sm:h-32 w-auto";
  }
  return "h-16 w-auto";
}

export function YzaLogo({
  className = "",
  variant = "default",
  compact = false,
}: YzaLogoProps) {
  return (
    <img
      src={YZA_LOGO}
      alt={YZA_LOGO_ALT}
      width={120}
      height={240}
      decoding="async"
      className={`object-contain object-left shrink-0 transition-all duration-500 ${getVariantClasses(variant, compact)} ${className}`.trim()}
    />
  );
}
