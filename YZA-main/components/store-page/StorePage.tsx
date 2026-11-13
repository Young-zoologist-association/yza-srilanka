"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Leaf, PawPrint, ShoppingBag, Sparkles } from "lucide-react";
import type { StoreProductData } from "@/lib/api/types";
import type { StorePageContent } from "@/lib/store-page/resolveStorePageContent";
import { STORE_PAGE_FALLBACK } from "@/lib/store-page/resolveStorePageContent";
import { STORE_THEME } from "@/lib/store-page/storeTheme";
import { PAGE_HERO_IMAGES } from "@/lib/constants/page-hero-images";
import { STORE_PAGE_SIZE, usePaginatedItems } from "@/lib/pagination";
import { StorePagination } from "@/components/store-page/StorePagination";
import { StoreProductCard } from "@/components/store-page/StoreProductCard";
import { StoreProductDetailDialog } from "@/components/store-page/StoreProductDetailDialog";

interface StorePageProps {
  content?: StorePageContent;
}

const HERO_ACCENTS = [
  { Icon: PawPrint, className: "top-[20%] left-[6%]", delay: 0 },
  { Icon: Leaf, className: "top-[30%] right-[8%]", delay: 0.6 },
  { Icon: ShoppingBag, className: "bottom-[28%] left-[10%]", delay: 1.2 },
  { Icon: Sparkles, className: "bottom-[22%] right-[6%]", delay: 0.3 },
] as const;

function StoreHero({
  pageTitle,
  subtitle,
  productCount,
}: Pick<StorePageContent, "pageTitle" | "subtitle"> & { productCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24"
      style={{ backgroundColor: STORE_THEME.forest }}
    >
      <img
        src={PAGE_HERO_IMAGES.store}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${STORE_THEME.forest}EE 0%, ${STORE_THEME.forestMid}CC 45%, ${STORE_THEME.bark}99 100%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "18px 18px",
        }}
      />

      {HERO_ACCENTS.map(({ Icon, className, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute hidden text-white/20 md:block ${className}`}
          animate={inView ? { y: [0, -10, 0], opacity: [0.15, 0.35, 0.15] } : {}}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="h-8 w-8" strokeWidth={1.25} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/90"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderColor: `${STORE_THEME.amber}55`,
                backgroundColor: `${STORE_THEME.amber}18`,
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: STORE_THEME.amberLight }} />
              Wildlife Merchandise
            </span>

            <h1
              className="mt-6 max-w-2xl leading-[1.05]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
                fontWeight: 800,
                color: STORE_THEME.cream,
              }}
            >
              {pageTitle}
            </h1>

            {subtitle ? (
              <p
                className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {subtitle}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.75rem] border p-6 backdrop-blur-md sm:p-7"
            style={{
              borderColor: `${STORE_THEME.amber}33`,
              backgroundColor: `${STORE_THEME.cream}12`,
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.amberLight }}
            >
              Curated Collection
            </p>
            <p
              className="mt-2 text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: STORE_THEME.cream }}
            >
              {productCount}
            </p>
            <p
              className="mt-1 text-sm text-white/70"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              wildlife-inspired items supporting conservation
            </p>
            <div
              className="mt-5 h-px w-full"
              style={{ background: `linear-gradient(90deg, ${STORE_THEME.amber}, transparent)` }}
            />
            <p
              className="mt-4 text-xs leading-relaxed text-white/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Posters, mugs, crafts, and more — every purchase helps celebrate Sri Lanka&apos;s
              biodiversity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function StorePage({ content = STORE_PAGE_FALLBACK }: StorePageProps) {
  const listRef = useRef<HTMLElement>(null);
  const dialogScrollYRef = useRef(0);
  const [selectedProduct, setSelectedProduct] = useState<StoreProductData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pagination = usePaginatedItems(content.products, STORE_PAGE_SIZE);

  const handleViewProduct = useCallback((product: StoreProductData) => {
    dialogScrollYRef.current = window.scrollY;
    setSelectedProduct(product);
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      dialogScrollYRef.current = window.scrollY;
      setDialogOpen(true);
      return;
    }
    setDialogOpen(false);
  }, []);

  const scrollToList = useCallback(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main style={{ backgroundColor: STORE_THEME.cream }}>
      <StoreHero
        pageTitle={content.pageTitle}
        subtitle={content.subtitle}
        productCount={content.products.length}
      />

      <section
        ref={listRef}
        className="relative overflow-hidden py-14 md:py-20"
        style={{ backgroundColor: STORE_THEME.cream }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${STORE_THEME.amber}18, transparent 35%), radial-gradient(circle at 80% 0%, ${STORE_THEME.sage}15, transparent 30%)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.amber }}
              >
                Shop the Collection
              </span>
              <h2
                className="mt-2 leading-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: STORE_THEME.forest,
                }}
              >
                Wildlife Products
              </h2>
            </div>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
            >
              Tap any item to explore full details. New products can be added anytime from WordPress.
            </p>
          </div>

          {content.products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
                {pagination.paginatedItems.map((product, index) => (
                  <StoreProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onView={handleViewProduct}
                    staggerCycle={STORE_PAGE_SIZE}
                  />
                ))}
              </div>

              <StorePagination pagination={pagination} onPageChange={scrollToList} />
            </>
          ) : (
            <div
              className="rounded-[1.75rem] border px-6 py-16 text-center"
              style={{
                borderColor: `${STORE_THEME.sage}33`,
                backgroundColor: "white",
              }}
            >
              <ShoppingBag
                className="mx-auto h-10 w-10"
                style={{ color: STORE_THEME.sage }}
                strokeWidth={1.25}
              />
              <p
                className="mt-4 text-lg font-semibold"
                style={{ fontFamily: "'Playfair Display', serif", color: STORE_THEME.forest }}
              >
                No products yet
              </p>
              <p
                className="mt-2 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: STORE_THEME.sage }}
              >
                Check back soon for new wildlife merchandise.
              </p>
            </div>
          )}
        </div>
      </section>

      <StoreProductDetailDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        scrollYRef={dialogScrollYRef}
      />
    </main>
  );
}
