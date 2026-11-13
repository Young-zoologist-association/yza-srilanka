"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Leaf } from "lucide-react";
import type { StoreProductData } from "@/lib/api/types";
import { STORE_THEME } from "@/lib/store-page/storeTheme";

interface StoreProductCardProps {
  product: StoreProductData;
  index: number;
  onView: (product: StoreProductData) => void;
  /** Stagger delay cycles by this count (e.g. page size on store page). */
  staggerCycle?: number;
}

export function StoreProductCard({
  product,
  index,
  onView,
  staggerCycle = 8,
}: StoreProductCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasImage = Boolean(product.image.url?.trim());

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % staggerCycle) * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <button
        type="button"
        onClick={() => onView(product)}
        className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          borderColor: `${STORE_THEME.sage}22`,
          backgroundColor: "white",
          boxShadow: `0 12px 32px -20px ${STORE_THEME.forest}33`,
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: STORE_THEME.sand }}>
          {hasImage ? (
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Leaf className="h-10 w-10" style={{ color: STORE_THEME.sage }} strokeWidth={1.25} />
            </div>
          )}

          <div
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t to-transparent opacity-80"
            style={{ backgroundImage: `linear-gradient(to top, ${STORE_THEME.forest}88, transparent)` }}
          />

          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: `${STORE_THEME.terracotta}DD`,
            }}
          >
            {product.priceLabel}
          </span>

          <span
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: `${STORE_THEME.forest}CC`,
            }}
          >
            View
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3
            className="line-clamp-2 text-base font-bold leading-snug sm:text-lg"
            style={{ fontFamily: "'Playfair Display', serif", color: STORE_THEME.forest }}
          >
            {product.title}
          </h3>
          <p
            className="mt-auto pt-3 text-sm font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.terracotta }}
          >
            {product.priceLabel}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
